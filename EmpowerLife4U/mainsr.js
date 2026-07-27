let slideIndex = 1;
let autoSlideInterval = null;

document.addEventListener("DOMContentLoaded", function() {
  showSlides(slideIndex);
  setupDots();
  startAutoSlide();
});

function startAutoSlide() {
  stopAutoSlide();
  autoSlideInterval = setInterval(() => { moveSlide(1); }, 3000);
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

function moveSlide(n) {
  showSlides(slideIndex += n);
  resetAutoSlide();
}

function currentSlide(n) {
  showSlides(slideIndex = n);
  resetAutoSlide();
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("ts-slide");
  let dots = document.getElementsByClassName("ts-dot");
  if (!slides || slides.length === 0) return;

  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  if (dots.length > 0) {
    dots[slideIndex - 1].className += " active";
  }
}

function setupDots() {
  let slides = document.getElementsByClassName("ts-slide");
  let dotsContainer = document.getElementById("tsDots");
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";

  for (let i = 0; i < slides.length; i++) {
    let dot = document.createElement("span");
    dot.className = "ts-dot";
    dot.onclick = function() { currentSlide(i + 1); };
    dotsContainer.appendChild(dot);
  }

  if (dotsContainer.children.length > 0) {
    dotsContainer.children[0].className += " active";
  }
}