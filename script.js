// 🎵 AUTO-PLAY BACKGROUND MUSIC
document.addEventListener("DOMContentLoaded", function() {
  const bgMusic = document.getElementById("bg-music");
  bgMusic.volume = 0.5;

  // Autoplay after short delay
  setTimeout(() => {
    bgMusic.play().catch(() => {
      console.log("Autoplay blocked — user must tap the screen first.");
    });
  }, 1000);
});

// 🌙 THEME TOGGLE
const themeButtons = document.querySelectorAll(".theme-bar button");

themeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const theme = button.dataset.theme;
    document.body.setAttribute("data-theme", theme);
    applyTheme(theme);
  });
});

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.style.background = "radial-gradient(circle at center, #1a001a, #000)";
    document.body.style.color = "#e0d6ff";
  } else if (theme === "purple") {
    document.body.style.background = "radial-gradient(circle at center, #2a003a, #100015)";
    document.body.style.color = "#f0d0ff";
  } else if (theme === "light") {
    document.body.style.background = "#f8f8ff";
    document.body.style.color = "#2a003a";
  }
}

// Set default
applyTheme("dark");

// 🎬 INTRO CLEANUP
setTimeout(() => {
  const intro = document.getElementById("intro");
  if (intro) intro.remove();
}, 5500);
