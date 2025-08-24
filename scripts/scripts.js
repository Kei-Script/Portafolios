let savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
const track = document.querySelector(".carrusel-track");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
let currentindex = 0;

nextBtn.addEventListener("click", () => {
  const cards = document.querySelectorAll(".project-card");
  if (currentindex < cards.length - 1) {
    currentindex++;
    track.style.transform = `translateX(-${
      currentindex * (cards[0].offsetWidth + 32)
    }px)`;
  }
});

prevBtn.addEventListener("click", () => {
  if (currentindex > 0) {
    currentindex--;
    track.style.transform = `translateX(-${
      currentindex * (document.querySelector(".project-card").offsetWidth + 32)
    }px)`;
  }
});

fetch("/htmlelements/menu.html")
  .then((response) => response.text())
  .then((data) => {
    const placeholder = document.getElementById("navigation_placeholder");
    placeholder.innerHTML = data;
    placeholder.classList.add("div-menu-loaded");

    // Ahora que el HTML está insertado, los elementos sí existen
    const togglemenu = document.getElementById("togglemenu");
    const navbar = document.getElementById("menu");
    const color = document.getElementById("color");
    const darkmode = document.getElementById("darkmode");
    const darkmodelight = document.getElementById("darkmode-light");
    const darkmodedark = document.getElementById("darkmode-dark");

    function icon() {
      if (savedTheme == "light") {
        darkmodelight.classList.remove("darkmode__switch--active");
        darkmodedark.classList.add("darkmode__switch--active");
      } else {
        darkmodedark.classList.remove("darkmode__switch--active");
        darkmodelight.classList.add("darkmode__switch--active");
      }
    }
    icon();
    darkmode.addEventListener("click", () => {
      let theme = savedTheme;
      theme = theme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", theme);
      savedTheme = theme;
      localStorage.setItem("theme", savedTheme);
      icon();
    });

    if (togglemenu && navbar) {
      togglemenu.addEventListener("click", () => {
        navbar.classList.toggle("navigation--active");
      });
    }
  });
