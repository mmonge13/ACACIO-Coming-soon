document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  
    // Captura los valores de los campos del formulario
    const name = document.querySelector('input[name="name"]').value.trim();
    const company = document.querySelector('input[name="company"]').value.trim();
    const message = document.querySelector('textarea[name="message"]').value.trim();
  
    // Validación de campos
    if (!name || !company || !message) {
      alert("Todos los campos son obligatorios.");
      return;
    }
  
    // Sanitización de datos
    const sanitizeInput = (input) => input.replace(/[<>]/g, "");
    const sanitizedName = sanitizeInput(name);
    const sanitizedCompany = sanitizeInput(company);
    const sanitizedMessage = sanitizeInput(message);
  
    // Construye el mensaje para WhatsApp
    const whatsappMessage = `Hola, mi nombre es ${sanitizedName}. Represento a la empresa ${sanitizedCompany}. Quiero decir: ${sanitizedMessage}`;
  
    // Codifica el mensaje para que sea seguro en la URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
  
    // Detecta si el dispositivo es móvil o PC
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
    // Genera la URL de WhatsApp según el dispositivo
    const whatsappBaseURL = isMobile ? "https://api.whatsapp.com" : "https://web.whatsapp.com";
    const whatsappURL = `${whatsappBaseURL}/send?phone=5491154580587&text=${encodedMessage}`;
  
    // Abre la URL en una nueva pestaña
    window.open(whatsappURL, "_blank");
  });