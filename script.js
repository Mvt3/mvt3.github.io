// Función para manejar la barra de navegación al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const welcomeSection = document.getElementById('welcome');
    const navLinks = document.querySelectorAll('.nav-links a');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    const EMAIL_CONFIG = {
        SERVICE_ID: "service_b22t0i2",
        TEMPLATE_ID: "template_02chnxs",
        USER_ID: "kEUTnW0CLE_tKVNb_"
    };
    
    // emailJS
    if (window.emailjs) {
        emailjs.init(EMAIL_CONFIG.USER_ID);
    }
    
    // Altura a la que la barra de navegación aparece 
    const navbarThreshold = welcomeSection.offsetHeight * 0.8;
    
    // Función para mostrar/ocultar la barra de navegación
    function toggleNavbar() {
        if (window.scrollY >= navbarThreshold) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
    }
    
    toggleNavbar();
    
    // Evento de scroll
    window.addEventListener('scroll', toggleNavbar);
    
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Ajuste para la altura de la barra de navegación
                behavior: 'smooth'
            });
        });
    });
    
    //función para mostrar mensaje de estado
    function showFormStatus(message, isSuccess) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + (isSuccess ? 'success' : 'error');
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
    
    // Manejo del formulario de contacto
    if (contactForm && window.emailjs) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            //desactivar el botón durante el envío
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            const formData = new FormData(contactForm);
            const templateParams = {};
            
            formData.forEach((value, key) => {
                templateParams[key] = value;
            });
            
            // Enviar email
            emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATE_ID, templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showFormStatus('Mensaje enviado correctamente. ¡Gracias por contactarme!', true);
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    showFormStatus('Error al enviar el mensaje. Por favor, inténtalo de nuevo.', false);
                })
                .finally(function() {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar Mensaje';
                });
        });
    } else if (contactForm) {
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            console.log('EmailJS no está configurado correctamente. Simulando envío...');
            
            const formData = new FormData(contactForm);
            const formValues = {};
            
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
            
            console.log('Datos del formulario:', formValues);
            
            
            setTimeout(() => {
                showFormStatus('Mensaje enviado correctamente. ¡Gracias por contactarme! (demo)', true);
                contactForm.reset();
            }, 1000);
        });
    }
    
    //Animación de entrada para los elementos cuando son visibles en viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    //Elementos a observar para animación
    document.querySelectorAll('.section-header, .portfolio-item, .about-content, .contact-content').forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });
});



// ----------------------------------------------------------------------------------------------------------------------------------//
//Dashboard logic
const dashboardFilePath = 'Dashboard ventas.pbix';
const dashboardFileName = 'Dashboard ventas.pbix'; 

// Elementos del DOM
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadBtn');
    
    // Configurar evento de descarga para el botón
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadDashboard);
    }
    
    // Configurar lightbox para las imágenes (opcional)
    setupImageLightbox();
});

/**
 * Maneja la descarga del archivo de dashboard
 */
function downloadDashboard() {
    // Crear un elemento <a> temporal para la descarga
    const downloadLink = document.createElement('a');
    downloadLink.href = dashboardFilePath;
    downloadLink.download = dashboardFileName;
    
    // Añadir al DOM, activar y eliminar
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

/**
 * configurar lightbox simple para ver las imágenes ampliadas 
 */
function setupImageLightbox() {
    const images = document.querySelectorAll('.dashboard-image');
    
    images.forEach(img => {
        img.addEventListener('click', function() {
            
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.zIndex = '1000';
            lightbox.style.cursor = 'pointer';
            
            //imagen ampliada
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.style.maxWidth = '90%';
            enlargedImg.style.maxHeight = '90%';
            enlargedImg.style.objectFit = 'contain';
            
            //Agregaral lightbox
            lightbox.appendChild(enlargedImg);
            
            //Agregar lightbox al body
            document.body.appendChild(lightbox);
            
            //Cerrar al hacer clic
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
        });
        
        
        img.style.cursor = 'pointer';
    });
}

//-----------------------------------------------------------------------------------------------------------------------------------//


//clase CSS adicional para los elementos con animación de entrada
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

