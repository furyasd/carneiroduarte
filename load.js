// Hamburger menu toggle and smooth close on nav link click

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('nav ul');

  // Toggle fullscreen mobile menu
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      toggle.querySelector('.icon').textContent = navList.classList.contains('active') ? '✖' : '☰';
    });
  }

  // Close menu and reset icon when clicking any nav link
  document.querySelectorAll('nav ul a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      navList.classList.remove('active');
      toggle.querySelector('.icon').textContent = '☰'; // revert to hamburger
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// Section loader
async function loadSections(sections) {
  const container = document.getElementById('content');
  container.innerHTML = '';

  for (const section of sections) {
    try {
      const res = await fetch(`${section}.html`);
      if (!res.ok) throw new Error('404');
      const html = await res.text();
      container.innerHTML += html;
    } catch (e) {
      container.innerHTML += `<p>Erro ao carregar ${section}.</p>`;
    }
  }
}

// On window load, load sections and then trigger animations
window.addEventListener('load', async () => {
  await loadSections(['home', 'quem-somos', 'precos', 'contactos']);

  // ScrollReveal animations after DOM is ready
  import('./scrollreveal-init.js').then(module => {
    if (module.initScrollAnimations) {
      module.initScrollAnimations();
    }
  });
});
