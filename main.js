/* ======================
   AGRIVATE — MAIN.JS v2
   ====================== */

// ── NAVBAR ──
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  setActiveNav();
});

hamburger && hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    navMenu.classList.remove('open');
  });
});

function setActiveNav() {
  const sections = document.querySelectorAll('section[id],header[id],.hero[id]');
  const y = window.scrollY + 100;
  sections.forEach(s => {
    const link = document.querySelector(`.navbar-nav a[href="#${s.id}"]`);
    if (!link) return;
    if (s.offsetTop <= y && s.offsetTop + s.offsetHeight > y) {
      document.querySelectorAll('.navbar-nav a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

// ── REVEAL ON SCROLL ──
const revealEls = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: 0.1 });
revealEls.forEach(el => ro.observe(el));

// ── COUNTER ANIMATION ──
const counters = document.querySelectorAll('[data-count]');
const co = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animCount(e.target);
      co.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => co.observe(c));

function animCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const dur = 1800;
  const step = target / (dur / 16);
  let cur = 0;
  const t = setInterval(() => {
    cur += step;
    if (cur >= target) { el.textContent = target; clearInterval(t); }
    else el.textContent = Math.floor(cur);
  }, 16);
}

// ── CONTACT FORM ──
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit-btn');
    const ok  = document.getElementById('formOk');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    await new Promise(r => setTimeout(r, 1100));
    btn.textContent = '✓ Message Sent';
    ok && ok.classList.add('show');
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      ok && ok.classList.remove('show');
    }, 5000);
  });
}
