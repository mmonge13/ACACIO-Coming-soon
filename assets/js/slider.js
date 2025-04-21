// ================================================
// SLIDER DE SERVICIOS
// ================================================
const serviceItems = document.querySelectorAll(".service-item");
const dotsContainer = document.getElementById("slider-dots");
const sliderContainer = document.querySelector(".services-slider");
let current = 0;
let autoplayInterval;

function updateSlider() {
  serviceItems.forEach((item, index) => {
    item.classList.toggle("active", index === current);
    dotsContainer.children[index].classList.toggle(
      "active",
      index === current
    );
    dotsContainer.children[index].setAttribute("aria-selected", index === current);
  });
}

function goToSlide(index) {
  current = index;
  updateSlider();
}

serviceItems.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot", index === 0 && "active");
  dot.setAttribute("role", "button");
  dot.setAttribute("aria-label", `Slide ${index + 1}`);
  dot.setAttribute("aria-selected", index === 0);
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

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    current = (current + 1) % serviceItems.length;
    updateSlider();
    clearInterval(autoplayInterval);
    startAutoplay();
  } else if (event.key === "ArrowLeft") {
    current = (current - 1 + serviceItems.length) % serviceItems.length;
    updateSlider();
    clearInterval(autoplayInterval);
    startAutoplay();
  }
});

sliderContainer.addEventListener("mouseenter", () => {
  clearInterval(autoplayInterval);
});

sliderContainer.addEventListener("mouseleave", () => {
  startAutoplay();
});

updateSlider();
startAutoplay();