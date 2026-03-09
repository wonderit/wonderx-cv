/* ============================================
   GSAP Animations — ScrollTrigger + Hero
   ============================================ */

(function() {
  'use strict';

  function init() {
    gsap.registerPlugin(ScrollTrigger);

    // ─── Hero Text Animation (staggered reveal) ───
    var heroEls = ['.hero-greeting', '.hero-name', '.hero-title-bar', '.hero-tagline', '.hero-actions'];
    var delays = [0.3, 0.6, 1.0, 1.3, 1.6];
    var durations = [0.6, 0.8, 0.5, 0.6, 0.6];

    heroEls.forEach(function(sel, i) {
      var el = document.querySelector(sel);
      if (el) {
        // Start hidden immediately
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        // Animate in with staggered delay
        gsap.to(sel, {
          opacity: 1,
          y: 0,
          duration: durations[i],
          delay: delays[i],
          ease: 'power3.out',
          clearProps: 'transform'
        });
      }
    });

    // ─── Section Titles ───
    gsap.utils.toArray('.section-title').forEach(function(el) {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, duration: 0.8
      });
    });

    // ─── Subsection Titles ───
    gsap.utils.toArray('.subsection-title').forEach(function(el) {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, duration: 0.6
      });
    });

    // ─── About Section ───
    var photoFrame = document.querySelector('.photo-frame');
    if (photoFrame) {
      gsap.from(photoFrame, {
        scrollTrigger: { trigger: '.about-grid', start: 'top 80%', toggleActions: 'play none none none' },
        scale: 0.7, opacity: 0, duration: 0.9, ease: 'back.out(1.5)'
      });
    }

    var aboutBio = document.querySelector('.about-bio');
    if (aboutBio) {
      gsap.from(aboutBio, {
        scrollTrigger: { trigger: aboutBio, start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, duration: 0.7
      });
    }

    gsap.utils.toArray('.fact-item').forEach(function(item, i) {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' },
        x: -20, opacity: 0, duration: 0.5, delay: i * 0.08
      });
    });

    // ─── Timeline Cards ───
    gsap.utils.toArray('.timeline-item').forEach(function(item) {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' },
        x: -40, opacity: 0, duration: 0.6
      });
    });

    // ─── Publication Cards ───
    gsap.utils.toArray('.pub-card').forEach(function(card, i) {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
        scale: 0.92, opacity: 0, duration: 0.6, delay: i * 0.06
      });
    });

    // ─── Seminar Cards ───
    gsap.utils.toArray('.seminar-card').forEach(function(card, i) {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, duration: 0.6, delay: i * 0.1
      });
    });

    // ─── Project Cards ───
    gsap.utils.toArray('.project-card').forEach(function(card, i) {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, duration: 0.6, delay: i * 0.1
      });
    });

    // ─── Education ───
    gsap.utils.toArray('.edu-item').forEach(function(item, i) {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' },
        x: -30, opacity: 0, duration: 0.6, delay: i * 0.1
      });
    });

    // ─── Contact ───
    var contactSub = document.querySelector('.contact-subtitle');
    if (contactSub) {
      gsap.from(contactSub, {
        scrollTrigger: { trigger: contactSub, start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, duration: 0.7
      });
    }

    gsap.utils.toArray('.contact-btn').forEach(function(btn, i) {
      gsap.from(btn, {
        scrollTrigger: { trigger: btn, start: 'top 90%', toggleActions: 'play none none none' },
        y: 20, opacity: 0, duration: 0.5, delay: i * 0.15
      });
    });
  }

  // Run on load or immediately if already loaded
  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }
})();