/* ============================================
   Kumar Raju Bejawada — Portfolio Script
   Vanilla JS: particles, typing, reveal, nav,
   theme toggle, back-to-top, contact form
   ============================================ */

/* ---------- PARTICLES BACKGROUND ---------- */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const count = Math.min(80, Math.floor(window.innerWidth / 18));
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.8,
      o: Math.random() * 0.5 + 0.2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const color = document.documentElement.getAttribute('data-theme') === 'light'
      ? '0, 168, 118' : '0, 212, 160';

    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${p.o})`;
      ctx.fill();
    });

    // connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${color}, ${(1 - dist / 120) * 0.15})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ---------- TYPING ANIMATION ---------- */
(function typing() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const roles = [
    'Computer Science Engineering Graduate',
    'AI & Data Science Enthusiast',
    'Python Developer',
    'Machine Learning Enthusiast',
    'Web Developer'
  ];
  let roleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = roles[roleIdx];
    if (deleting) {
      charIdx--;
    } else {
      charIdx++;
    }
    el.textContent = current.substring(0, charIdx);

    let delay = deleting ? 40 : 80;
    if (!deleting && charIdx === current.length) {
      delay = 2000;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  type();
})();

/* ---------- NAVBAR ---------- */
(function navbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const links = document.querySelectorAll('.nav-link');

  // scrolled state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  // mobile menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // close on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  // active link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  });
})();

/* ---------- SCROLL PROGRESS BAR ---------- */
(function scrollProgress() {
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = (scrollTop / height) * 100 + '%';
  });
})();

/* ---------- SCROLL REVEAL ---------- */
(function reveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // animate skill bars
        entry.target.querySelectorAll('.skill-bar').forEach(bar => {
          const span = bar.querySelector('span');
          const level = span.getAttribute('data-level');
          if (level && !bar.querySelector('.bar-fill')) {
            const fill = document.createElement('div');
            fill.className = 'bar-fill';
            fill.style.width = '0';
            bar.appendChild(fill);
            setTimeout(() => { fill.style.width = level + '%'; }, 150);
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  items.forEach(item => observer.observe(item));
})();

/* ---------- THEME TOGGLE ---------- */
(function theme() {
  const toggle = document.getElementById('themeToggle');
  const icon = toggle.querySelector('i');
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    icon.className = saved === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    icon.className = next === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  });
})();

/* ---------- BACK TO TOP ---------- */
(function backToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) btn.classList.add('visible');
    else btn.classList.remove('visible');
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ---------- CONTACT FORM ---------- */
(function contactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill in all fields.';
      status.className = 'form-status error';
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      status.textContent = 'Please enter a valid email address.';
      status.className = 'form-status error';
      return;
    }

    // Open user's mail client with prefilled message
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:kumarrajubejawad46@gmail.com?subject=${subject}&body=${body}`;

    status.textContent = 'Thank you! Your email client is opening...';
    status.className = 'form-status success';
    form.reset();
    setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 5000);
  });
})();

/* ---------- PROFILE IMAGE FALLBACK ---------- */
(function profileImage() {
  const img = document.getElementById('profileImg');
  const placeholder = document.querySelector('.profile-placeholder');
  if (!img || !placeholder) return;
  img.addEventListener('error', () => { img.style.display = 'none'; });
  img.addEventListener('load', () => { placeholder.style.display = 'none'; });
  // trigger load check in case already cached
  if (img.complete && img.naturalWidth > 0) placeholder.style.display = 'none';
})();

/* ---------- SMOOTH SCROLL FALLBACK ---------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
