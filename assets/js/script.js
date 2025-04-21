document.addEventListener("DOMContentLoaded", function () {
  // ================================================
  // ANIMACIÓN DE SECCIONES AL ENTRAR EN PANTALLA
  // ================================================
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );
  sections.forEach((section) => observer.observe(section));

  // ================================================
  // DETECCIÓN Y APLICACIÓN DEL TEMA
  // ================================================
  const toggleBtn = document.getElementById("toggle-dark-mode");
  const icon = toggleBtn?.querySelector(".icon");

  // Función para aplicar el tema
  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      if (icon) icon.textContent = "☀️";
    } else {
      document.body.classList.remove("dark-mode");
      if (icon) icon.textContent = "🌙";
    }
  }

  // Detectar preferencia inicial
  function detectInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme; // Priorizar preferencia guardada
    }
    // Detectar preferencia del sistema
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  }

  // Aplicar el tema inicial
  const initialTheme = detectInitialTheme();
  applyTheme(initialTheme);

  // ================================================
  // CAMBIO DE TEMA Y GUARDADO EN LOCALSTORAGE
  // ================================================
  toggleBtn?.addEventListener("click", () => {
    const currentTheme = document.body.classList.contains("dark-mode")
      ? "dark"
      : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Guardar preferencia
  });

  // ================================================
  // SLIDER DE SERVICIOS
  // ================================================
  const serviceItems = document.querySelectorAll(".service-item");
  const dotsContainer = document.getElementById("slider-dots");
  let current = 0;
  let autoplayInterval;

  function updateSlider() {
    serviceItems.forEach((item, index) => {
      item.classList.toggle("active", index === current);
      dotsContainer.children[index].classList.toggle(
        "active",
        index === current
      );
    });
  }

  function goToSlide(index) {
    current = index;
    updateSlider();
  }

  serviceItems.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot", index === 0 && "active");
    dot.addEventListener("click", () => {
      goToSlide(index);
      clearInterval(autoplayInterval);
      startAutoplay();
    });
    dotsContainer.appendChild(dot);
  });

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      current = (current + 1) % serviceItems.length;
      updateSlider();
    }, 4000);
  }

  updateSlider();
  startAutoplay();

  // ================================================
  // EFECTO DE NIEVE
  // ================================================
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Snowflake {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * -canvas.height;
      this.radius = Math.random() * 3 + 1;
      this.speedY = Math.random() * 1 + 0.5;
      this.wind = Math.random() * 0.5 - 0.25;
    }

    update() {
      this.y += this.speedY;
      this.x += this.wind;
      if (this.y > canvas.height) this.reset();
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.fill();
    }
  }

  const snowflakes = Array.from({ length: 200 }, () => new Snowflake());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snowflakes.forEach((flake) => {
      flake.update();
      flake.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
});
