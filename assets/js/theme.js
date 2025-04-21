// ================================================
// DETECCIÓN Y APLICACIÓN DEL TEMA
// ================================================
const toggleBtn = document.getElementById("toggle-dark-mode");
const icon = toggleBtn?.querySelector(".icon");

// Función para aplicar el tema
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    if (icon) icon.src = "/assets/images/icons8-light-mode-linear-outline-icons-32.png";
  } else {
    document.body.classList.remove("dark-mode");
    if (icon) icon.src = "/assets/images/icons8-night-mode-linear-outline-icons-32.png";
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