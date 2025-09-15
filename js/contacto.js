document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (validarFormulario()) {
                alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
                contactForm.reset();
            }
        });
    }

    function validarFormulario() {
        const nombre = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('message').value.trim();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        let isValid = true;

        clearErrors();

        if (nombre === '') {
            showError('name', 'Por favor, ingresa tu nombre.');
            isValid = false;
        }

        if (email === '') {
            showError('email', 'Por favor, ingresa tu correo electrónico.');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('email', 'Por favor, ingresa un correo electrónico válido.');
            isValid = false;
        }

        if (mensaje === '') {
            showError('message', 'Por favor, escribe tu mensaje.');
            isValid = false;
        }

        return isValid;
    }

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
        field.classList.add('input-error');
    }
    
    function clearErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(err => err.remove());
        
        const errorInputs = document.querySelectorAll('.input-error');
        errorInputs.forEach(input => input.classList.remove('input-error'));
    }
});