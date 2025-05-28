export function initScrollAnimations() {
  const sr = ScrollReveal();

  // Hero section
  sr.reveal('.hero h1', { delay: 100, origin: 'bottom', distance: '30px' });
  sr.reveal('.hero p', { delay: 300, origin: 'bottom', distance: '30px' });

  // Quem Somos
  sr.reveal('.perfil:first-of-type', { origin: 'left', distance: '50px', delay: 200 });
  sr.reveal('.perfil:last-of-type', { origin: 'right', distance: '50px', delay: 300 });

  // Preçário cards
  sr.reveal('.card', {
    interval: 100,
    origin: 'bottom',
    distance: '40px',
    duration: 600
  });

  // Contactos section
  sr.reveal('.contactos h2', { delay: 100, origin: 'bottom', distance: '20px' });
  sr.reveal('.contactos-info', { delay: 200, origin: 'left', distance: '40px' });
  sr.reveal('.contactos-form', { delay: 200, origin: 'right', distance: '40px' });
}
