/* Toggle dark mode */
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  const icon = document.querySelector(".slider .icon");
  if (document.body.classList.contains("dark-mode")) {
    icon.textContent = "🌙";
  } else {
    icon.textContent = "🌞";
  }
}
/*Darkmode Toggling Changes !!*/ 