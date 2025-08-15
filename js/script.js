// CÓDIGO PARA EL DESPLAZAMIENTO SUAVE
// Este código maneja el desplazamiento suave cuando haces clic en los enlaces de la barra de navegación.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Evita el salto brusco a la sección

        // Obtiene el destino del enlace (ej. '#about')
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth' // Hace que el desplazamiento sea suave
        });
    });
});

// CÓDIGO PARA EL FORMULARIO DE CONTACTO
// Este código maneja el envío del formulario a través de Formspree.
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Reemplaza 'TU_ID_DE_FORMULARIO_AQUI' con el ID único que obtuviste de Formspree.
// Ejemplo: "https://formspree.io/f/xvoldjn"
const formEndpoint = "https://formspree.io/f/xkgzeapj";

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    const formData = new FormData(form);
    
    // Envía los datos del formulario a la URL de Formspree
    const response = await fetch(formEndpoint, {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        // Si el envío es exitoso, muestra un mensaje de éxito y limpia el formulario.
        formStatus.textContent = "¡Mensaje enviado con éxito! Te responderé pronto.";
        formStatus.classList.remove('error');
        formStatus.classList.add('success');
        form.reset(); 
    } else {
        // Si hay un error, muestra un mensaje de error detallado.
        const data = await response.json();
        if (data.errors) {
            formStatus.textContent = data.errors.map(error => error.message).join(", ");
        } else {
            formStatus.textContent = "Hubo un problema al enviar tu mensaje. Intenta de nuevo más tarde.";
        }
        formStatus.classList.remove('success');
        formStatus.classList.add('error');
    }
});