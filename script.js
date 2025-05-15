document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-contacto');
    const botonCotizacionHeader = document.querySelector('header a.cta-principal');

    // Validar formulario y enviar datos
    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar el envío predeterminado del formulario
            let errores = [];
            const origen = document.getElementById('origen');
            const destino = document.getElementById('destino');
            const peso = document.getElementById('peso');

            if (origen.value.trim() === '') {
                errores.push('Por favor, ingresa la ciudad de origen.');
            }

            if (destino.value.trim() === '') {
                errores.push('Por favor, ingresa la ciudad de destino.');
            }

            if (peso.value.trim() === '' || isNaN(parseFloat(peso.value)) || parseFloat(peso.value) <= 0) {
                errores.push('Por favor, ingresa un peso válido.');
            }

            if (errores.length > 0) {
                alert(errores.join('\n')); // Mostrar los errores
            } else {
                // Enviar los datos a Formspree usando fetch
                const formData = new FormData(formulario);
                // Reemplaza 'TU_FORM_ID_DE_FORMSPREE' con tu ID real de Formspree
                fetch('https://formspree.io/f/TU_FORM_ID_DE_FORMSPREE', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        alert('¡Cotización enviada exitosamente!');
                        formulario.reset(); // Limpiar el formulario
                    } else {
                        alert('Hubo un error al enviar la cotización. Por favor, intenta nuevamente.');
                        console.error('Error de Formspree:', data);
                    }
                })
                .catch(error => {
                    alert('Hubo un error de red al enviar la cotización. Por favor, intenta nuevamente.');
                    console.error('Error de red:', error);
                });
            }
        });
    }

    // Desplazamiento suave al hacer clic en el botón de cotización del header
    if (botonCotizacionHeader) {
        botonCotizacionHeader.addEventListener('click', function(event) {
            event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
            const destino = document.getElementById('cotizacion');
            destino.scrollIntoView({ behavior: 'smooth' });
        });
    }
});