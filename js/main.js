/* ============================================
   Three.js — Full-Page 3D Background
   Refined particle network + ambient glow orbs
   x.ai-inspired corporate aesthetic
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

  // ─── Particle Network (refined, subtle) ───
  var PARTICLE_COUNT = 80;
  var CONNECT_DISTANCE = 2.2;
  var positions = new Float32Array(PARTICLE_COUNT * 3);
  var velocities = [];

  for (var i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    velocities.push({
      x: (Math.random() - 0.5) * 0.002,
      y: (Math.random() - 0.5) * 0.0015,
      z: (Math.random() - 0.5) * 0.001
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
      '  pos.x += sin(pos.y * 0.8 + uTime * 0.2) * 0.08;',
      '  pos.y += cos(pos.x * 0.8 + uTime * 0.15) * 0.08;',
      '  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);',
      '  gl_PointSize = (2.5 * uPixelRatio) * (1.0 / -mvPosition.z);',
      '  gl_PointSize = max(gl_PointSize, 1.0);',
      '  gl_Position = projectionMatrix * mvPosition;',
      '}'
    ].join('\n'),
    fragmentShader: [
      'void main() {',
      '  float dist = length(gl_PointCoord - vec2(0.5));',
      '  if (dist > 0.5) discard;',
      '  float alpha = 1.0 - smoothstep(0.0, 0.5, dist);',
      '  gl_FragColor = vec4(0.7, 0.72, 0.78, alpha * 0.35);',
      '}'
    ].join('\n'),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  var particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // ─── Line Connections (subtle silver) ───
  var MAX_LINES = PARTICLE_COUNT * 6;
  var linePositions = new Float32Array(MAX_LINES * 6);

  var lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  lineGeometry.setDrawRange(0, 0);

  var lineMaterial = new THREE.LineBasicMaterial({
    color: 0x4a4a5a,
    transparent: true,
    opacity: 0.06,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  var lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lines);

  // ─── Ambient Glow Orbs (x.ai colossus style) ───
  // Top glow — cool blue-white light from above
  var topGlowTex = createGlowTexture(180, 200, 240, 0.5);
  var topGlowSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: topGlowTex,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  }));
  topGlowSprite.scale.set(18, 18, 1);
  topGlowSprite.position.set(0, 5, -10);
  scene.add(topGlowSprite);

  // Bottom glow — warm amber accent
  var bottomGlowTex = createGlowTexture(200, 160, 100, 0.25);
  var bottomGlowSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: bottomGlowTex,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  }));
  bottomGlowSprite.scale.set(14, 14, 1);
  bottomGlowSprite.position.set(3, -8, -8);
  scene.add(bottomGlowSprite);

  // ─── Subtle grid plane ───
  var gridHelper = new THREE.GridHelper(40, 40, 0x1a1a1a, 0x1a1a1a);
  gridHelper.position.y = -5;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.08;
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
    var w = window.innerWidth;
    var h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
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

      if (posArray[ix] > 9) posArray[ix] = -9;
      if (posArray[ix] < -9) posArray[ix] = 9;
      if (posArray[ix + 1] > 7) posArray[ix + 1] = -7;
      if (posArray[ix + 1] < -7) posArray[ix + 1] = 7;
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

    // Mouse parallax (subtle)
    targetRotation.y = mouse.x * 0.08;
    targetRotation.x = -mouse.y * 0.05;
    scene.rotation.y += (targetRotation.y - scene.rotation.y) * 0.02;
    scene.rotation.x += (targetRotation.x - scene.rotation.x) * 0.02;

    // Subtle glow orb movement
    topGlowSprite.position.x = Math.sin(elapsed * 0.08) * 0.8;
    topGlowSprite.position.y = 5 + Math.sin(elapsed * 0.12) * 0.4;
    bottomGlowSprite.position.x = 3 + Math.cos(elapsed * 0.1) * 0.5;

    // Grid subtle animation
    gridHelper.position.y = -5 + Math.sin(elapsed * 0.15) * 0.2;

    renderer.render(scene, camera);
  }

  animate();
})();
