// Validación formulario de contacto
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('#contactForm');
  if (!contactForm) return;

  const feedbackEl = document.querySelector('#formFeedback');

  const showError = (input, message) => {
    const errorSpan = contactForm.querySelector(
      `.error-message[data-for="${input.id}"]`
    );
    if (errorSpan) {
      errorSpan.textContent = message;
    }
    input.classList.add('input-error');
  };

  const clearError = (input) => {
    const errorSpan = contactForm.querySelector(
      `.error-message[data-for="${input.id}"]`
    );
    if (errorSpan) {
      errorSpan.textContent = '';
    }
    input.classList.remove('input-error');
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const validateForm = () => {
    let isValid = true;
    const nameInput = document.querySelector('#contactName');
    const emailInput = document.querySelector('#contactEmail');
    const messageInput = document.querySelector('#contactMessage');

    clearError(nameInput);
    clearError(emailInput);
    clearError(messageInput);

    if (!nameInput.value.trim()) {
      showError(nameInput, 'Por favor, introduce tu nombre.');
      isValid = false;
    }

    if (!emailInput.value.trim()) {
      showError(emailInput, 'Por favor, introduce tu correo electrónico.');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'Introduce un correo electrónico válido.');
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      showError(messageInput, 'Por favor, escribe tu mensaje.');
      isValid = false;
    }

    return isValid;
  };

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validateForm()) {
      if (feedbackEl) {
        feedbackEl.textContent =
          'Revisa los campos marcados para continuar.';
        feedbackEl.classList.remove('form-feedback--success');
        feedbackEl.classList.add('form-feedback--error');
      }
      return;
    }

    // Aquí iría la lógica real de envío (fetch/AJAX).
    // Por ahora simulamos un envío correcto.
    contactForm.reset();
    if (feedbackEl) {
      feedbackEl.textContent =
        'Gracias, hemos recibido tu mensaje y te contactaremos pronto.';
      feedbackEl.classList.remove('form-feedback--error');
      feedbackEl.classList.add('form-feedback--success');
    }
  });

  // Validación en tiempo real básica
  ['input', 'blur'].forEach((eventName) => {
    contactForm.addEventListener(eventName, (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
        return;
      }

      if (target.id === 'contactEmail') {
        if (!target.value.trim()) {
          showError(target, 'Por favor, introduce tu correo electrónico.');
        } else if (!validateEmail(target.value.trim())) {
          showError(target, 'Introduce un correo electrónico válido.');
        } else {
          clearError(target);
        }
      }

      if (target.id === 'contactName' || target.id === 'contactMessage') {
        if (!target.value.trim()) {
          showError(
            target,
            target.id === 'contactName'
              ? 'Por favor, introduce tu nombre.'
              : 'Por favor, escribe tu mensaje.'
          );
        } else {
          clearError(target);
        }
      }
    });
  });
});
