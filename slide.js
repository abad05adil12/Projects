const imageContainer = document.getElementById("imageContainer");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const visibleImagesSpan = document.getElementById("visibleImages");
const totalImagesSpan = document.getElementById("totalImages");
const images = document.querySelectorAll(".images img");

totalImagesSpan.textContent = images.length;

const scrollAmount = 315; 

prevBtn.addEventListener("click", () => {
  imageContainer.scrollBy({
    left: -scrollAmount,
    behavior: "smooth",
  });
});

// Next button functionality
nextBtn.addEventListener("click", () => {
  imageContainer.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
});

function updateCounter() {
  const scrollLeft = imageContainer.scrollLeft;
  const containerWidth = imageContainer.clientWidth;
  const imageWidth = 315;

  const firstVisible = Math.floor(scrollLeft / imageWidth) + 1;
  const imagesInView = Math.floor(containerWidth / imageWidth);
  const lastVisible = Math.min(firstVisible + imagesInView - 1, images.length);

  if (imagesInView >= images.length) {
    visibleImagesSpan.textContent = `1-${images.length}`;
  } else {
    visibleImagesSpan.textContent = `${firstVisible}-${lastVisible}`;
  }
}

imageContainer.addEventListener("scroll", updateCounter);

updateCounter();

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevBtn.click();
  } else if (e.key === "ArrowRight") {
    nextBtn.click();
  }
});

let startX = 0;
let scrollStart = 0;

imageContainer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  scrollStart = imageContainer.scrollLeft;
});

imageContainer.addEventListener("touchmove", (e) => {
  if (!startX) return;

  const currentX = e.touches[0].clientX;
  const diff = startX - currentX;
  imageContainer.scrollLeft = scrollStart + diff;
});

imageContainer.addEventListener("touchend", () => {
  startX = 0;
});

window.addEventListener("load", () => {
  imageContainer.scrollTo({
    left: 0,
    behavior: "smooth",
  });
});

images.forEach((img, index) => {
  img.addEventListener("error", () => {
    img.style.backgroundColor = img.style.background || "#ddd";
    img.style.color = "white";
    img.style.fontSize = "18px";
    img.style.fontWeight = "bold";
    img.innerHTML = `Shoe ${index + 1}`;
  });
});

const searchBtn = document.querySelector(".search-button");
const searchInput = document.querySelector(".search");

if (searchBtn) {
    searchBtn.addEventListener("click", () => {
        searchInput.classList.toggle("active");
    });
}