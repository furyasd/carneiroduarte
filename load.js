// load.js

// CUSTOM SMOOTH SCROLL FUNCTION
function customSmoothScroll(targetId, duration = 800) { // Default duration 800ms, can be adjusted
  const targetElement = document.querySelector(targetId);
  if (!targetElement) {
    console.warn(`Custom smooth scroll target not found: ${targetId}`);
    // If target not found, you might want to fallback or just do nothing
    // window.location.hash = targetId; // Fallback to browser's default jump
    return;
  }

  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  // Easing function: easeInOutCubic (provides a gentle acceleration and deceleration)
  // t: current time, b: start value, c: change in value, d: duration
  function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }

  function animationLoop(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const nextScrollPosition = easeInOutCubic(timeElapsed, startPosition, distance, duration);

    window.scrollTo(0, nextScrollPosition);

    if (timeElapsed < duration) {
      requestAnimationFrame(animationLoop);
    } else {
      // Ensure it ends exactly at the target
      window.scrollTo(0, targetPosition);

      // Optional: Set focus to the target element for accessibility,
      // similar to how browsers handle hash navigation.
      // This helps screen reader users and keyboard navigators.
      targetElement.setAttribute('tabindex', '-1'); // Make non-interactive elements focusable
      targetElement.focus({ preventScroll: true }); // Focus without triggering another scroll
      // You might want to remove the tabindex again after blur if it's not naturally focusable
      // targetElement.addEventListener('blur', () => targetElement.removeAttribute('tabindex'), { once: true });
    }
  }
  requestAnimationFrame(animationLoop);
}


document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('nav ul');

  // Toggle fullscreen mobile menu
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      const iconElement = toggle.querySelector('.icon');
      if (iconElement) {
        iconElement.textContent = navList.classList.contains('active') ? '✖' : '☰';
      }
    });
  }

  // Handle navigation link clicks
  document.querySelectorAll('nav ul a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default jump

      // Mobile-specific menu closing logic:
      if (navList && navList.classList.contains('active')) {
        navList.classList.remove('active');
        if (toggle) {
          const iconElement = toggle.querySelector('.icon');
          if (iconElement) {
            iconElement.textContent = '☰';
          }
        }
      }

      // Scrolling logic using the custom function
      const href = this.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        customSmoothScroll(href, 1000); // Call custom function, 1000ms duration (like carneiroduarte.pt)
      } else {
        console.warn(`Invalid href for smooth scroll: ${href}. Must be like #elementId.`);
      }
    });
  });
});

// Section loader (remains the same)
async function loadSections(sections) {
  const container = document.getElementById('content');
  container.innerHTML = '';

  for (const section of sections) {
    try {
      const res = await fetch(`${section}.html`);
      if (!res.ok) throw new Error(`Failed to fetch ${section}.html: ${res.status}`);
      const html = await res.text();
      container.innerHTML += html;
    } catch (e) {
      console.error(`Error loading section ${section}:`, e);
      container.innerHTML += `<p>Erro ao carregar ${section}. Detalhes no console.</p>`;
    }
  }
}

// On window load, load sections and then trigger animations (remains the same)
window.addEventListener('load', async () => {
  await loadSections(['home', 'quem-somos', 'precos', 'contactos']);

  if (typeof ScrollReveal === 'function') {
    import('./scrollreveal-init.js').then(module => {
      if (module.initScrollAnimations) {
        module.initScrollAnimations();
      }
    }).catch(err => console.error("Failed to load or init scrollreveal-init.js", err));
  } else {
    console.warn('ScrollReveal library not found.');
  }
});