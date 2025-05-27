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

window.addEventListener('load', () =>
  loadSections(['home', 'quem-somos', 'precos', 'contactos'])
);
