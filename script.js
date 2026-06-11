const header = document.querySelector('#header');
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

toggle.addEventListener('click', () => {
  const open = toggle.classList.toggle('active');
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('menu-open', open);
});

menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  toggle.classList.remove('active');
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
