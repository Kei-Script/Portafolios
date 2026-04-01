const toggleMenu = document.getElementById("toggleMenu");
const blurBg = document.getElementById("blurBg");
const MobileMenuModal = document.getElementById("MobileMenuModal");
toggleMenu.addEventListener("click", () => {
  blurBg.classList.toggle("MobileMenuBg--active");
  MobileMenuModal.classList.toggle("MobileMenu__Modal--active");
});
