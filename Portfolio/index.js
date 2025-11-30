const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
hamburger.addEventListener("click", function () {
  menu.classList.toggle("show");
  hamburger.classList.toggle("active");
});
const text = document.getElementById("txt");
setTimeout(() => {
  text.classList.add("show");
}, 1000);

const containers = document.querySelectorAll(".main-container");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.2 }
);

containers.forEach((container) => {
  observer.observe(container);
});
const texts = document.querySelectorAll(".p1");

const observer3 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.2 }
);

texts.forEach((texts) => {
  observer3.observe(texts);
});

const tex = document.querySelectorAll(".text");

const observer4 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show"); // remove if you want animation again
      }
    });
  },
  { threshold: 0.2 }
);

tex.forEach((texts) => {
  observer4.observe(tex);
});
