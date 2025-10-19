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
// 📰 DYNAMIC NEWS FEED
async function loadNews() {
  try {
    const response = await fetch("news.json");
    const headlines = await response.json();
    const container = document.getElementById("news-container");

    container.innerHTML = `<marquee behavior="scroll" direction="left" scrollamount="6">
      ${headlines.join(" • ")}
    </marquee>`;
  } catch (error) {
    console.error("Failed to load news feed:", error);
    document.getElementById("news-container").innerText = "Unable to load latest rumors.";
  }
}

loadNews();
// ⚡ BREAKING NEWS ALERT
async function checkBreakingNews() {
  try {
    const response = await fetch("news.json");
    const latestNews = await response.json();
    const storedNews = JSON.parse(localStorage.getItem("lastNews") || "[]");

    // Compare current and stored news
    const newHeadlines = latestNews.filter(h => !storedNews.includes(h));

    if (newHeadlines.length > 0) {
      localStorage.setItem("lastNews", JSON.stringify(latestNews));

      const breakingBar = document.getElementById("breaking-news");
      const breakingText = document.getElementById("breaking-text");

      breakingText.textContent = "BREAKING NEWS: " + newHeadlines[0];
      breakingBar.classList.remove("hidden");

      setTimeout(() => {
        breakingBar.classList.add("hidden");
      }, 8000);
    }
  } catch (err) {
    console.error("Error checking breaking news:", err);
  }
}

// Check once on load, then every 60 seconds
checkBreakingNews();
setInterval(checkBreakingNews, 60000);
