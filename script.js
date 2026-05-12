const revealEls = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

const mobileToggle = document.querySelector('.mobile-toggle');
if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
    mobileToggle.textContent = isOpen ? 'Close' : 'Menu';
  });
}

document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach((faq) => {
      faq.classList.remove('active');
      faq.querySelector('.faq-plus').textContent = '+';
      const q = faq.querySelector('.faq-question');
      q?.setAttribute('aria-expanded', 'false');
    });

    if (!isActive) {
      item.classList.add('active');
      item.querySelector('.faq-plus').textContent = '−';
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

const stickyLabel = document.querySelector('[data-cta-label]');
const stickyLink = document.querySelector('[data-cta-dynamic]');
const prof = document.querySelector('#professionals');
const consumer = document.querySelector('#find');
if (stickyLabel && stickyLink && prof && consumer) {
  const setCta = (mode) => {
    if (mode === 'consumer') {
      stickyLabel.textContent = 'Consumer path active';
      stickyLink.href = '#find';
      stickyLink.dataset.cta = 'find_practitioner';
      stickyLink.innerHTML = 'Find Practitioner <span class="arrow">→</span>';
    } else {
      stickyLabel.textContent = 'Professional path active';
      stickyLink.href = '#apply';
      stickyLink.dataset.cta = 'apply_matpro';
      stickyLink.innerHTML = 'Apply for MATPro <span class="arrow">→</span>';
    }
  };
  const secObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setCta(entry.target.id === 'find' ? 'consumer' : 'professional');
    });
  }, { threshold: 0.6 });
  secObs.observe(prof);
  secObs.observe(consumer);
}

document.querySelectorAll('[data-cta]').forEach((el) => {
  el.addEventListener('click', () => {
    console.log('cta_click', { cta: el.dataset.cta, text: el.textContent.trim() });
  });
});
