// CÓDIGO PARA EL DESPLAZAMIENTO SUAVE
// Este código maneja el desplazamiento suave cuando haces clic en los enlaces de la barra de navegación.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Evita el salto brusco a la sección
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth' // Hace que el desplazamiento sea suave
        });
    });
});

// CÓDIGO PARA EL FORMULARIO DE CONTACTO (CONEXIÓN A BACKEND PYTHON/FLASK)
// Este código maneja el envío del formulario a tu servidor local de Python.
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// URL del servidor Flask.
// Esta URL solo funciona cuando el servidor Python está corriendo en tu computadora.
const formEndpoint = "https://contacto-flask-api.onrender.com";

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Convierte los datos del formulario a un objeto JSON

    try {
        const response = await fetch(formEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // Indica que los datos que enviamos son JSON
            },
            body: JSON.stringify(data) // Convierte el objeto a una cadena JSON
        });

        if (response.ok) {
            // Si el envío es exitoso, muestra un mensaje de éxito y limpia el formulario.
            formStatus.textContent = "¡Mensaje enviado con éxito! Te responderé pronto.";
            formStatus.classList.remove('error');
            formStatus.classList.add('success');
            form.reset();
        } else {
            // Si hay un error, lee la respuesta del servidor y muestra un mensaje.
            const errorData = await response.json();
            formStatus.textContent = `Hubo un problema: ${errorData.message}`;
            formStatus.classList.remove('success');
            formStatus.classList.add('error');
        }
    } catch (error) {
        // Maneja errores de red o del servidor
        formStatus.textContent = "No se pudo conectar con el servidor. Asegúrate de que tu servidor Python esté corriendo.";
        formStatus.classList.remove('success');
        formStatus.classList.add('error');
    }
});