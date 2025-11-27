const navToggle = document.querySelector('#navToggle');
const mainNav = document.querySelector('#mainNav');
const currentYearSpan = document.querySelector('#currentYear');

// Año dinámico en el footer
const setCurrentYear = () => {
  const year = new Date().getFullYear();
  if (currentYearSpan) {
    currentYearSpan.textContent = year;
  }
};

// Toggle del menú en móvil
const setupNavToggle = () => {
  if (!navToggle || !mainNav) return;

  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  // Cerrar menú cuando se hace clic en un enlace
  mainNav.addEventListener('click', event => {
    if (event.target.tagName.toLowerCase() === 'a') {
      mainNav.classList.remove('open');
    }
  });
};

// Scroll suave entre secciones
const setupSmoothScroll = () => {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  setCurrentYear();
  setupNavToggle();
  setupSmoothScroll();
});
