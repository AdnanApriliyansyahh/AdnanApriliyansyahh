/* ============================================================
   Adnan Apriliyansyah — Portfolio JS
   Matrix boot, typewriter, custom cursor, particle bg,
   nav, scroll reveal, stat counters, work filters, form.
   ============================================================ */

(function () {
  'use strict';

  /* --- Boot Screen --- */
  function bootScreen() {
    var boot = document.getElementById('boot-screen');
    if (!boot) return;

    var canvas = document.getElementById('boot-canvas');
    var fillEl = document.getElementById('boot-progress-fill');
    var pctEl = document.getElementById('boot-percent');
    var stageEl = document.getElementById('boot-stage');

    var stages = [
      'initializing...',
      'loading modules...',
      'mounting /dev/exploit...',
      'crypto primitives...',
      'bypassing WAF...',
      'handshake C2...',
      'system ready.'
    ];

    /* Matrix rain on boot canvas */
    var ctx = canvas ? canvas.getContext('2d') : null;
    var cols = 0, drops = [];
    var fontSize = 14;
    var chars = 'XTROVERT0123456789@#$%&*(){}[]<>=+-/\\|!?.,;:ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var rainActive = false;

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols = Math.floor(canvas.width / fontSize);
      drops = [];
      for (var i = 0; i < cols; i++) {
        drops.push(Math.random() * -canvas.height);
      }
    }

    function drawRain() {
      if (!ctx || !rainActive) return;
      ctx.fillStyle = 'rgba(10, 14, 10, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + 'px monospace';
      for (var i = 0; i < drops.length; i++) {
        var ch = chars[Math.floor(Math.random() * chars.length)];
        var y = drops[i] * fontSize;
        if (y > 0 && y < canvas.height) {
          ctx.fillStyle = Math.random() > 0.95 ? '#e0e8e0' : '#00ff88';
          ctx.fillText(ch, i * fontSize, y);
        }
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = Math.random() * -20;
        }
      }
      requestAnimationFrame(drawRain);
    }

    if (canvas && ctx) {
      resizeCanvas();
      rainActive = true;
      drawRain();
      window.addEventListener('resize', resizeCanvas);
    }

    /* Progress bar animation */
    var progress = 0;
    var stageIdx = 0;
    var totalDuration = 2800;
    var steps = 100;
    var intervalMs = totalDuration / steps;

    var progressInterval = setInterval(function () {
      progress++;
      if (fillEl) fillEl.style.width = progress + '%';
      if (pctEl) pctEl.textContent = progress + '%';
      var newStage = Math.min(Math.floor(progress / (100 / stages.length)), stages.length - 1);
      if (newStage !== stageIdx) {
        stageIdx = newStage;
        if (stageEl) stageEl.textContent = stages[stageIdx];
      }
      if (progress >= 100) {
        clearInterval(progressInterval);
        if (stageEl) stageEl.textContent = stages[stages.length - 1];
        setTimeout(function () {
          boot.classList.add('boot-done');
          rainActive = false;
          setTimeout(function () {
            boot.style.display = 'none';
          }, 600);
        }, 300);
      }
    }, intervalMs);
  }

  /* --- Custom Cursor --- */
  function customCursor() {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    var dot = document.querySelector('.cursor-dot');
    var ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    var mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
    });

    function animateRing() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, [data-hover], input, textarea, select, .work-card, .skill-card, .writeup-card, tr[data-hover]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        ring.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', function () {
        ring.classList.remove('cursor-hover');
      });
    });
  }

  /* --- Typewriter --- */
  function typewriter() {
    var typed = document.getElementById('typed');
    if (!typed) return;

    var phrases = [
      'offensive security researcher',
      'penetration tester',
      'bug bounty hunter',
      'CVE contributor',
      'red team operator',
      'exploit developer',
      'sometimes the bug, always the fix'
    ];

    var pi = 0, ci = 0, deleting = false;

    function type() {
      var phrase = phrases[pi];
      if (!deleting) {
        ci++;
        typed.textContent = phrase.substring(0, ci);
        if (ci === phrase.length) {
          deleting = true;
          setTimeout(type, 2200);
          return;
        }
        setTimeout(type, 45 + Math.random() * 60);
      } else {
        ci--;
        typed.textContent = phrase.substring(0, ci);
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
          setTimeout(type, 400);
          return;
        }
        setTimeout(type, 25);
      }
    }
    setTimeout(type, 2800);
  }

  /* --- Glitch Effect on Title --- */
  function titleGlitch() {
    var nameEl = document.querySelector('.title-name');
    if (!nameEl) return;

    function trigger() {
      nameEl.classList.add('glitch');
      setTimeout(function () {
        nameEl.classList.remove('glitch');
      }, 300);
    }

    setTimeout(trigger, 3000);
    setInterval(trigger, 8000 + Math.random() * 4000);
  }

  /* --- Hero Canvas (Particles) --- */
  function heroCanvas() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var w, h, particles = [];
    var PARTICLE_COUNT = 80;
    var MAX_SPEED = 0.3;
    var MAX_DIST = 120;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }

    function initParticles() {
      particles = [];
      for (var i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * MAX_SPEED,
          vy: (Math.random() - 0.5) * MAX_SPEED,
          r: Math.random() * 1.5 + 0.5
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 136, 0.5)';
        ctx.fill();
      }

      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dx = particles[a].x - particles[b].x;
          var dy = particles[a].y - particles[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            var alpha = (1 - dist / MAX_DIST) * 0.15;
            ctx.strokeStyle = 'rgba(0, 255, 136, ' + alpha + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    function start() {
      resize();
      initParticles();
      draw();
    }

    start();
    window.addEventListener('resize', function () {
      resize();
      initParticles();
    });
  }

  /* --- Sticky Nav with Hide on Scroll Down --- */
  function stickyNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;

    var lastScroll = 0;

    window.addEventListener('scroll', function () {
      var current = window.pageYOffset;

      if (current > lastScroll && current > 200) {
        nav.classList.add('nav-hidden');
      } else {
        nav.classList.remove('nav-hidden');
      }

      lastScroll = current;
    });

    // Active link tracking
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a');

    function updateActive() {
      var current = window.pageYOffset + 100;
      var activeId = '';
      sections.forEach(function (sec) {
        if (current >= sec.offsetTop) {
          activeId = sec.id;
        }
      });
      navLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === '#' + activeId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', updateActive);
    updateActive();
  }

  /* --- Mobile Nav Toggle --- */
  function mobileNav() {
    var toggle = document.getElementById('nav-toggle');
    var links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', toggle.classList.contains('active'));
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('active');
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- Scroll Reveal --- */
  function scrollReveal() {
    var elements = document.querySelectorAll(
      '.skill-card, .work-card, .writeup-card, .cve-table tbody tr, .about-card, .about-text .lead, .about-text p, .about-list, .contact-info, .contact-form'
    );

    elements.forEach(function (el) {
      el.classList.add('reveal');
    });

    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.classList.add('revealed');
          }, index * 60);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- Stat Counter Animation --- */
  function statCounter() {
    var stats = document.querySelectorAll('.stat-value');
    if (!stats.length) return;

    if (!('IntersectionObserver' in window)) {
      stats.forEach(function (s) {
        s.textContent = formatCount(s.getAttribute('data-count'), s.getAttribute('data-prefix'));
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(function (s) { observer.observe(s); });
  }

  function formatCount(target, prefix) {
    var n = parseInt(target, 10);
    if (n >= 1000000) {
      return (prefix || '') + (n / 1000000).toFixed(1).replace('.0', '') + 'M+';
    }
    if (n >= 1000) {
      return (prefix || '') + (n / 1000).toFixed(0) + 'K+';
    }
    return (prefix || '') + String(n) + '+';
  }

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var duration = 2000;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);

      if (current >= 1000000) {
        el.textContent = prefix + (current / 1000000).toFixed(1).replace('.0', '') + 'M';
      } else if (current >= 1000) {
        el.textContent = prefix + Math.floor(current / 1000) + 'K';
      } else {
        el.textContent = prefix + current;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatCount(String(target), prefix);
      }
    }

    requestAnimationFrame(step);
  }

  /* --- Skill Meter Animation --- */
  function skillMeters() {
    var fills = document.querySelectorAll('.meter-fill');
    if (!fills.length) return;

    if (!('IntersectionObserver' in window)) {
      fills.forEach(function (f) {
        f.style.width = f.getAttribute('data-fill') + '%';
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var fill = entry.target;
          setTimeout(function () {
            fill.style.width = fill.getAttribute('data-fill') + '%';
          }, 200);
          observer.unobserve(fill);
        }
      });
    }, { threshold: 0.5 });

    fills.forEach(function (f) { observer.observe(f); });
  }

  /* --- Work Filters --- */
  function workFilters() {
    var buttons = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('.work-card');
    if (!buttons.length || !cards.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');

        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        cards.forEach(function (card) {
          var cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.classList.remove('hidden');
            card.style.animation = 'none';
            void card.offsetWidth;
            card.style.animation = 'bootLine 0.4s ease forwards';
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* --- Copy Button --- */
  function copyButtons() {
    var buttons = document.querySelectorAll('.copy-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var text = btn.getAttribute('data-copy');
        if (text && navigator.clipboard) {
          navigator.clipboard.writeText(text).then(function () {
            btn.classList.add('copied');
            btn.textContent = 'copied';
            setTimeout(function () {
              btn.classList.remove('copied');
              btn.textContent = 'copy';
            }, 2000);
          });
        }
      });
    });
  }

  /* --- Contact Form --- */
  function contactForm() {
    var form = document.getElementById('contact-form');
    var status = document.getElementById('form-status');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#f-name').value.trim();
      var email = form.querySelector('#f-email').value.trim();
      var engage = form.querySelector('#f-engage').value;
      var msg = form.querySelector('#f-msg').value.trim();

      if (!name || !email || !engage || !msg) {
        status.className = 'form-status error';
        status.textContent = 'err: missing required fields';
        return;
      }

      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) {
        status.className = 'form-status error';
        status.textContent = 'err: invalid email format';
        return;
      }

      status.className = 'form-status';
      status.textContent = 'transmitting...';

      setTimeout(function () {
        status.className = 'form-status success';
        status.textContent = 'message queued. response < 24h on business days.';
        form.reset();
      }, 1500);
    });
  }

  /* --- Smooth Scroll for Anchor Links --- */
  function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* --- Footer Year --- */
  function footerYear() {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* --- Konami Easter Egg --- */
  function konami() {
    var sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    var pos = 0;

    document.addEventListener('keydown', function (e) {
      if (e.key === sequence[pos]) {
        pos++;
        if (pos === sequence.length) {
          pos = 0;
          triggerMatrix();
        }
      } else {
        pos = (e.key === sequence[0]) ? 1 : 0;
      }
    });

    function triggerMatrix() {
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;z-index:10001;background:#0a0e0a;overflow:hidden;pointer-events:none;';
      document.body.appendChild(overlay);

      var canvas = document.createElement('canvas');
      canvas.style.cssText = 'position:fixed;inset:0;z-index:10001;';
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      overlay.appendChild(canvas);

      var ctx = canvas.getContext('2d');
      var fontSize = 14;
      var cols = Math.floor(canvas.width / fontSize);
      var drops = [];
      for (var i = 0; i < cols; i++) drops[i] = Math.random() * -100;
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*(){}[]<>=+-/\\|!?.,;:';

      function draw() {
        ctx.fillStyle = 'rgba(10, 14, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px monospace';
        for (var i = 0; i < drops.length; i++) {
          var ch = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
      }

      var interval = setInterval(draw, 50);
      setTimeout(function () {
        clearInterval(interval);
        overlay.remove();
      }, 5000);
    }
  }

  /* --- Init --- */
  function init() {
    bootScreen();
    customCursor();
    typewriter();
    titleGlitch();
    heroCanvas();
    stickyNav();
    mobileNav();
    scrollReveal();
    statCounter();
    skillMeters();
    workFilters();
    copyButtons();
    contactForm();
    smoothScroll();
    footerYear();
    konami();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();