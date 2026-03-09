/* ============================================
   Three.js — Full-Page 3D Background
   AI Eye / Camera Lens + Neural Network
   + Ambient Glow Orbs (scroll-reactive)
   Monochrome silver/white palette
   ============================================ */

(function() {
  'use strict';

  var canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  // Scene
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 6;

  var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x080808, 1);

  // ─── Create glow texture from canvas ───
  function createGlowTexture(r, g, b, intensity) {
    var size = 256;
    var c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    var ctx = c.getContext('2d');
    var gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(' + r + ',' + g + ',' + b + ',' + (intensity * 0.6) + ')');
    gradient.addColorStop(0.25, 'rgba(' + r + ',' + g + ',' + b + ',' + (intensity * 0.35) + ')');
    gradient.addColorStop(0.5, 'rgba(' + r + ',' + g + ',' + b + ',' + (intensity * 0.1) + ')');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }

  // ─── Particle Network (monochrome) ───
  var PARTICLE_COUNT = 100;
  var CONNECT_DISTANCE = 2.0;
  var positions = new Float32Array(PARTICLE_COUNT * 3);
  var velocities = [];

  for (var i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

    velocities.push({
      x: (Math.random() - 0.5) * 0.003,
      y: (Math.random() - 0.5) * 0.002,
      z: (Math.random() - 0.5) * 0.0015
    });
  }

  var particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  var particleMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
    },
    vertexShader: [
      'uniform float uTime;',
      'uniform float uPixelRatio;',
      'void main() {',
      '  vec3 pos = position;',
      '  pos.x += sin(pos.y * 1.2 + uTime * 0.3) * 0.06;',
      '  pos.y += cos(pos.x * 1.2 + uTime * 0.25) * 0.06;',
      '  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);',
      '  gl_PointSize = (3.0 * uPixelRatio) * (1.0 / -mvPosition.z);',
      '  gl_PointSize = max(gl_PointSize, 1.0);',
      '  gl_Position = projectionMatrix * mvPosition;',
      '}'
    ].join('\n'),
    fragmentShader: [
      'void main() {',
      '  float dist = length(gl_PointCoord - vec2(0.5));',
      '  if (dist > 0.5) discard;',
      '  float alpha = 1.0 - smoothstep(0.1, 0.5, dist);',
      '  gl_FragColor = vec4(0.7, 0.7, 0.7, alpha * 0.5);',
      '}'
    ].join('\n'),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  var particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // ─── Line Connections (silver) ───
  var MAX_LINES = PARTICLE_COUNT * 6;
  var linePositions = new Float32Array(MAX_LINES * 6);

  var lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  lineGeometry.setDrawRange(0, 0);

  var lineMaterial = new THREE.LineBasicMaterial({
    color: 0x444444,
    transparent: true,
    opacity: 0.08,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  var lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lines);

  // ─── AI Eye / Camera Lens Aperture ───
  var eyeGroup = new THREE.Group();

  // Outer ring (camera lens body)
  var outerRing = new THREE.TorusGeometry(1.8, 0.02, 16, 64);
  var ringMat = new THREE.MeshBasicMaterial({
    color: 0x333333,
    transparent: true,
    opacity: 0.4
  });
  var outerMesh = new THREE.Mesh(outerRing, ringMat);
  eyeGroup.add(outerMesh);

  // Middle ring
  var midRing = new THREE.TorusGeometry(1.3, 0.015, 16, 64);
  var midMat = new THREE.MeshBasicMaterial({
    color: 0x555555,
    transparent: true,
    opacity: 0.3
  });
  var midMesh = new THREE.Mesh(midRing, midMat);
  eyeGroup.add(midMesh);

  // Inner ring (iris)
  var innerRing = new THREE.TorusGeometry(0.8, 0.02, 16, 48);
  var innerMat = new THREE.MeshBasicMaterial({
    color: 0x666666,
    transparent: true,
    opacity: 0.35
  });
  var innerMesh = new THREE.Mesh(innerRing, innerMat);
  eyeGroup.add(innerMesh);

  // Center pupil (small sphere)
  var pupilGeo = new THREE.SphereGeometry(0.15, 16, 16);
  var pupilMat = new THREE.MeshBasicMaterial({
    color: 0x888888,
    transparent: true,
    opacity: 0.3
  });
  var pupil = new THREE.Mesh(pupilGeo, pupilMat);
  eyeGroup.add(pupil);

  // Aperture blades (6 lines radiating from center)
  for (var b = 0; b < 6; b++) {
    var angle = (b / 6) * Math.PI * 2;
    var bladeGeo = new THREE.BufferGeometry();
    var bladeVerts = new Float32Array([
      Math.cos(angle) * 0.3, Math.sin(angle) * 0.3, 0,
      Math.cos(angle) * 1.6, Math.sin(angle) * 1.6, 0
    ]);
    bladeGeo.setAttribute('position', new THREE.BufferAttribute(bladeVerts, 3));
    var bladeMat = new THREE.LineBasicMaterial({
      color: 0x444444,
      transparent: true,
      opacity: 0.2
    });
    var blade = new THREE.LineSegments(bladeGeo, bladeMat);
    eyeGroup.add(blade);
  }

  // Crosshair lines
  var crossData = [
    [-2.2, 0, 0, -1.9, 0, 0],
    [1.9, 0, 0, 2.2, 0, 0],
    [0, -2.2, 0, 0, -1.9, 0],
    [0, 1.9, 0, 0, 2.2, 0]
  ];

  for (var c = 0; c < crossData.length; c++) {
    var cGeo = new THREE.BufferGeometry();
    cGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(crossData[c]), 3));
    var cMat = new THREE.LineBasicMaterial({ color: 0x555555, transparent: true, opacity: 0.25 });
    eyeGroup.add(new THREE.LineSegments(cGeo, cMat));
  }

  eyeGroup.position.set(0, 0, -3);
  scene.add(eyeGroup);

  // ─── Orbiting data nodes (representing AI processing) ───
  var orbitNodes = [];
  var NODE_COUNT = 12;
  var nodeLabels = [
    'AI Safety', 'Vision AI', 'Privacy ML', 'Deep Learning',
    'Nanophotonics', 'Full-Stack', '3D Pose', 'Encryption',
    'GAN Design', 'Biomedical', 'Segmentation', 'Edge AI'
  ];

  // Create HTML label container
  var labelContainer = document.getElementById('nodeLabels');
  var labelElements = [];

  for (var n = 0; n < NODE_COUNT; n++) {
    var nodeGeo = new THREE.SphereGeometry(0.05, 8, 8);
    var nodeMat = new THREE.MeshBasicMaterial({
      color: 0xaaaaaa,
      transparent: true,
      opacity: 0.6
    });
    var node = new THREE.Mesh(nodeGeo, nodeMat);
    var orbitRadius = 2.0 + Math.random() * 0.5;
    var orbitAngle = (n / NODE_COUNT) * Math.PI * 2;
    var orbitSpeed = 0.15 + Math.random() * 0.15;
    var orbitTilt = (Math.random() - 0.5) * 0.4;
    node.userData = {
      radius: orbitRadius,
      angle: orbitAngle,
      speed: orbitSpeed,
      tilt: orbitTilt
    };
    eyeGroup.add(node);
    orbitNodes.push(node);

    // Create corresponding HTML label
    if (labelContainer) {
      var lbl = document.createElement('span');
      lbl.className = 'node-label';
      lbl.textContent = nodeLabels[n];
      labelContainer.appendChild(lbl);
      labelElements.push(lbl);
    }
  }

  // Vectors for world position projection (reused each frame)
  var projVector = new THREE.Vector3();
  var centerVector = new THREE.Vector3();
  var LABEL_OFFSET = 20;
  var cachedW = window.innerWidth;
  var cachedH = window.innerHeight;

  // ─── Ambient Glow Orbs (scroll-reactive) — strong enough to show through sections ───
  // Top glow — cool blue-white
  var topGlowTex = createGlowTexture(180, 200, 255, 0.55);
  var topGlowSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: topGlowTex,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  }));
  topGlowSprite.scale.set(21, 21, 1);
  topGlowSprite.position.set(0, 4, -5);
  scene.add(topGlowSprite);

  // Bottom glow — warm amber accent
  var bottomGlowTex = createGlowTexture(220, 170, 100, 0.35);
  var bottomGlowSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: bottomGlowTex,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  }));
  bottomGlowSprite.scale.set(15, 15, 1);
  bottomGlowSprite.position.set(3, -6, -4);
  scene.add(bottomGlowSprite);

  // ─── Subtle grid plane ───
  var gridHelper = new THREE.GridHelper(40, 40, 0x1a1a1a, 0x1a1a1a);
  gridHelper.position.y = -5;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.12;
  scene.add(gridHelper);

  // ─── Mouse tracking ───
  var mouse = { x: 0, y: 0 };
  var targetRotation = { x: 0, y: 0 };

  document.addEventListener('mousemove', function(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  });

  // ─── Scroll tracking ───
  var scrollY = 0;
  var docHeight = 1;

  function updateScroll() {
    scrollY = window.scrollY || window.pageYOffset;
    docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  // ─── Resize ───
  function onResize() {
    cachedW = window.innerWidth;
    cachedH = window.innerHeight;
    camera.aspect = cachedW / cachedH;
    camera.updateProjectionMatrix();
    renderer.setSize(cachedW, cachedH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    particleMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
  }

  window.addEventListener('resize', onResize);

  // ─── Animation Loop ───
  var clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    var elapsed = clock.getElapsedTime();
    var scrollProgress = scrollY / docHeight;

    particleMaterial.uniforms.uTime.value = elapsed;

    // Camera parallax with scroll
    camera.position.y = -scrollProgress * 3;
    camera.position.z = 6 + scrollProgress * 1.5;

    // Update particle positions
    var posArray = particleGeometry.attributes.position.array;
    for (var i = 0; i < PARTICLE_COUNT; i++) {
      var ix = i * 3;
      posArray[ix] += velocities[i].x;
      posArray[ix + 1] += velocities[i].y;
      posArray[ix + 2] += velocities[i].z;

      if (posArray[ix] > 8) posArray[ix] = -8;
      if (posArray[ix] < -8) posArray[ix] = 8;
      if (posArray[ix + 1] > 6) posArray[ix + 1] = -6;
      if (posArray[ix + 1] < -6) posArray[ix + 1] = 6;
      if (posArray[ix + 2] > 5) posArray[ix + 2] = -5;
      if (posArray[ix + 2] < -5) posArray[ix + 2] = 5;
    }
    particleGeometry.attributes.position.needsUpdate = true;

    // Update connections
    var lineIndex = 0;
    var lp = lineGeometry.attributes.position.array;

    for (var i = 0; i < PARTICLE_COUNT; i++) {
      for (var j = i + 1; j < PARTICLE_COUNT; j++) {
        if (lineIndex >= MAX_LINES) break;

        var ix2 = i * 3;
        var jx = j * 3;
        var dx = posArray[ix2] - posArray[jx];
        var dy = posArray[ix2 + 1] - posArray[jx + 1];
        var dz = posArray[ix2 + 2] - posArray[jx + 2];
        var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECT_DISTANCE) {
          var li = lineIndex * 6;
          lp[li] = posArray[ix2];
          lp[li + 1] = posArray[ix2 + 1];
          lp[li + 2] = posArray[ix2 + 2];
          lp[li + 3] = posArray[jx];
          lp[li + 4] = posArray[jx + 1];
          lp[li + 5] = posArray[jx + 2];
          lineIndex++;
        }
      }
      if (lineIndex >= MAX_LINES) break;
    }

    lineGeometry.setDrawRange(0, lineIndex * 2);
    lineGeometry.attributes.position.needsUpdate = true;

    // Mouse parallax
    targetRotation.y = mouse.x * 0.12;
    targetRotation.x = -mouse.y * 0.08;
    scene.rotation.y += (targetRotation.y - scene.rotation.y) * 0.02;
    scene.rotation.x += (targetRotation.x - scene.rotation.x) * 0.02;

    // Animate eye/lens
    eyeGroup.rotation.z = elapsed * 0.05;
    outerMesh.rotation.z = -elapsed * 0.08;
    midMesh.rotation.z = elapsed * 0.12;
    innerMesh.rotation.z = -elapsed * 0.15;

    // Pulse the pupil
    var pulseScale = 1 + Math.sin(elapsed * 0.8) * 0.15;
    pupil.scale.setScalar(pulseScale);

    // Orbit data nodes + project labels to screen
    var halfW = cachedW * 0.5;
    var halfH = cachedH * 0.5;
    var labelsVisible = scrollProgress > 0.02 && scrollProgress < 0.85;
    var hasLabels = labelElements.length > 0;

    // Only compute center projection once per frame
    if (hasLabels) {
      eyeGroup.getWorldPosition(centerVector);
      centerVector.project(camera);
    }
    var cx = (centerVector.x * halfW) + halfW;
    var cy = -(centerVector.y * halfH) + halfH;

    for (var on = 0; on < orbitNodes.length; on++) {
      var nd = orbitNodes[on];
      var ud = nd.userData;
      ud.angle += ud.speed * 0.01;
      nd.position.x = Math.cos(ud.angle) * ud.radius;
      nd.position.y = Math.sin(ud.angle) * ud.radius + ud.tilt;
      nd.position.z = Math.sin(ud.angle * 0.5) * 0.3;

      // Project label to screen
      if (hasLabels) {
        var lbl = labelElements[on];
        var shouldShow = labelsVisible;

        if (shouldShow) {
          nd.getWorldPosition(projVector);
          projVector.project(camera);
          if (projVector.z >= 1) { shouldShow = false; }
          else {
            var sx = (projVector.x * halfW) + halfW;
            var sy = -(projVector.y * halfH) + halfH;
            var dx = sx - cx;
            var dy = sy - cy;
            var invDist = 1 / (Math.sqrt(dx * dx + dy * dy) || 1);
            lbl.style.left = (sx + dx * invDist * LABEL_OFFSET) + 'px';
            lbl.style.top = (sy + dy * invDist * LABEL_OFFSET) + 'px';
          }
        }

        if (shouldShow) {
          if (!lbl.classList.contains('visible')) lbl.classList.add('visible');
        } else {
          if (lbl.classList.contains('visible')) lbl.classList.remove('visible');
        }
      }
    }

    // ─── Scroll-reactive glow orb positioning ───
    // Glow orbs follow the viewport as user scrolls through sections
    var glowBaseY = 4 - scrollProgress * 16;
    topGlowSprite.position.x = Math.sin(elapsed * 0.08) * 1.2 + Math.sin(scrollProgress * Math.PI * 2) * 3;
    topGlowSprite.position.y = glowBaseY + Math.sin(elapsed * 0.12) * 0.5;
    topGlowSprite.position.z = -5 + scrollProgress * 2;

    var bottomGlowBaseY = -6 - scrollProgress * 12;
    bottomGlowSprite.position.x = 3 + Math.cos(elapsed * 0.1) * 0.8 - Math.cos(scrollProgress * Math.PI) * 2.5;
    bottomGlowSprite.position.y = bottomGlowBaseY + Math.cos(elapsed * 0.15) * 0.4;
    bottomGlowSprite.position.z = -4 + scrollProgress * 1.5;

    // Glow intensity — fixed strong values
    topGlowSprite.material.opacity = 0.7;
    bottomGlowSprite.material.opacity = 0.55;

    // Grid subtle animation
    gridHelper.position.y = -5 + Math.sin(elapsed * 0.15) * 0.2;

    renderer.render(scene, camera);
  }

  animate();
})();
