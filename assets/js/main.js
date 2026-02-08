const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");
const yearSpan = document.getElementById("year");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    alert("Thanks for reaching out! I will respond within 48 hours.");
  });
}
