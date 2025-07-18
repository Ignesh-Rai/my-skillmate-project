// Toggle dark mode with localStorage support
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark); // save preference

  const icon = document.querySelector(".slider .icon");
  icon.textContent = isDark ? "🌙" : "🌞";
}

// Apply mode on page load
window.addEventListener("DOMContentLoaded", () => {
  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    document.body.classList.add("dark-mode");
    document.querySelector(".slider .icon").textContent = "🌙";
  }
});
