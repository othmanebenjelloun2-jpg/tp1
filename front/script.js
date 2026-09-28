// Année du pied de page
document.getElementById('year').textContent = new Date().getFullYear();

// Menu mobile
const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menu-btn');
menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); }
});

// Thème clair / sombre
const root = document.documentElement;
document.getElementById('theme-btn').addEventListener('click', () => {
  const dark = root.getAttribute('data-theme') === 'dark' ||
    (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
  root.setAttribute('data-theme', dark ? 'light' : 'dark');
});

// Filtre des projets
const buttons = document.querySelectorAll('.filters button');
const cards = document.querySelectorAll('.card');
buttons.forEach(btn => btn.addEventListener('click', () => {
  buttons.forEach(b => b.setAttribute('aria-pressed', b === btn));
  const f = btn.dataset.filter;
  cards.forEach(c => { c.hidden = !(f === 'all' || c.dataset.tech === f); });
}));

// Lien actif dans la navigation
const links = document.querySelectorAll('#menu a');
const obs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('main section').forEach(s => obs.observe(s));
