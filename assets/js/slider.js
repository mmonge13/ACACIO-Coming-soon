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