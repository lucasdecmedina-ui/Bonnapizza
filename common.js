const whatsappNumber = '5513981378996';
const makeWhatsAppUrl = text => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
document.querySelectorAll('[data-whatsapp]').forEach(a => {
  a.href = makeWhatsAppUrl('Olá, Bonna Pizza! Vim pelo site e gostaria de falar sobre um pedido.');
  a.target = '_blank'; a.rel = 'noopener noreferrer';
});
document.querySelector('#year').textContent = new Date().getFullYear();
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeNavigation() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('open');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNavigation));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNavigation(); });
window.addEventListener('scroll', () => document.querySelector('#header').classList.toggle('scrolled', window.scrollY > 15), {passive: true});
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('motion');
  const observer = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) {e.target.classList.add('visible'); observer.unobserve(e.target);}
  }), {threshold: .12});
  document.querySelectorAll('.reveal').forEach(e => observer.observe(e));
}
