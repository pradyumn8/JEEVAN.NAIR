const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const openIcon = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>';
const closeIcon = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';

if (hamburger) {
  hamburger.innerHTML = openIcon;
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    document.body.classList.toggle('nav-locked', isOpen);
    hamburger.innerHTML = isOpen ? closeIcon : openIcon;
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      document.body.classList.remove('nav-locked');
      hamburger.innerHTML = openIcon;
    });
  });
}

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"], .btn');
    if (!btn) return;
    const original = btn.innerHTML;
    btn.innerHTML = 'Thanks! We\'ll be in touch.';
    btn.disabled = true;
    setTimeout(() => { btn.innerHTML = original; btn.disabled = false; form.reset(); }, 2800);
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.service-card, .testimonial, .pricing-card, .blog-card, .tl-item, .stat, .method-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 600ms ease-out, transform 600ms ease-out';
  observer.observe(el);
});

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = `${prefix}${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = `${prefix}${target}${suffix}`;
    };
    requestAnimationFrame(tick);
    statObserver.unobserve(el);
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => statObserver.observe(el));
