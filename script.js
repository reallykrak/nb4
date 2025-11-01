let currentNameIndex = 0;
const names = ["Zypheris", "Yusuf"];
let isDeleting = false;
let currentText = "";
let charIndex = 0;
const GITHUB_USERNAME = "zypheriss";
const DISCORD_USER_ID = "773582512647569409";

// DOM Elements
const animatedName = document.getElementById("animated-name");
const scrollTopBtn = document.getElementById("scrollTop");
const projectsGrid = document.getElementById("projectsGrid");
const allProjectsGrid = document.getElementById("allProjectsGrid");
const projectsLoading = document.getElementById("projectsLoading");
const allProjectsLoading = document.getElementById("allProjectsLoading");
const visitorCount = document.getElementById("visitorCount");
const discordStatus = document.getElementById("discordStatus");
const discordStatusText = document.getElementById("discordStatusText");

// Anti-Copy Protection
(function () {
  "use strict";

  // Disable right-click
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    return false;
  });

  // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
  document.addEventListener("keydown", function (e) {
    if (
      e.keyCode === 123 || // F12
      (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
      (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
      (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
      (e.ctrlKey && e.keyCode === 83) || // Ctrl+S
      (e.ctrlKey && e.keyCode === 65) || // Ctrl+A
      (e.ctrlKey && e.keyCode === 80) || // Ctrl+P
      (e.ctrlKey && e.keyCode === 67) || // Ctrl+C
      (e.ctrlKey && e.keyCode === 86) || // Ctrl+V
      (e.ctrlKey && e.keyCode === 88)
    ) {
      // Ctrl+X
      e.preventDefault();
      return false;
    }
  });

  // Disable drag and drop
  document.addEventListener("dragstart", function (e) {
    e.preventDefault();
    return false;
  });

  // Disable text selection
  document.addEventListener("selectstart", function (e) {
    e.preventDefault();
    return false;
  });

  // Detect developer tools
  let devtools = {
    open: false,
    orientation: null,
  };

  const threshold = 160;

  setInterval(function () {
    if (
      window.outerHeight - window.innerHeight > threshold ||
      window.outerWidth - window.innerWidth > threshold
    ) {
      if (!devtools.open) {
        devtools.open = true;
        window.location.href = "index.html";
      }
    } else {
      devtools.open = false;
    }
  }, 500);
  Object.defineProperty(window, "console", {
    value: console,
    writable: false,
    configurable: false,
  });

  // Clear console periodically
  setInterval(function () {
    console.clear();
  }, 1000);

  // Detect HTTrack and similar tools
  const userAgent = navigator.userAgent.toLowerCase();
  const suspiciousAgents = [
    "httrack",
    "wget",
    "curl",
    "webcopier",
    "offline explorer",
    "teleport",
    "webzip",
    "flashget",
    "mass downloader",
  ];

  for (let agent of suspiciousAgents) {
    if (userAgent.includes(agent)) {
      window.location.href = "about:blank";
      return;
    }
  }

  // Detect automated requests
  if (
    navigator.webdriver ||
    window.phantom ||
    window._phantom ||
    window.callPhantom
  ) {
    window.location.href = "about:blank";
    return;
  }

  // Obfuscate source code
  document.addEventListener("DOMContentLoaded", function () {
    // Add random comments to confuse scrapers
    const randomComments = [
      "<!-- Security Layer Active -->",
      "<!-- Anti-Copy Protection Enabled -->",
      "<!-- Unauthorized Access Detected -->",
      "<!-- Content Protection System -->",
      "<!-- Digital Rights Management -->",
    ];

    const randomComment =
      randomComments[Math.floor(Math.random() * randomComments.length)];
    document.head.insertAdjacentHTML("beforeend", randomComment);
  });
})();

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  initTypewriter();
  initScrollToTop();
  initSmoothScrolling();
  initAnimations();
  loadProjects();
  loadDiscordStatus();
  updateVisitorCount();
  initAboutMeTyping();
});

// About Me Typing Animation
function initAboutMeTyping() {
  const texts = [
    "Hi, I'm Yusuf, 23 years old, and I've been an active software developer for five years. I mostly work on Discord projects.",
    " I also sometimes create websites like store demos and Discord bot demos",
    " which I share on my GitHub account. I live in Bursa.",
  ];

  const textElements = [
    document.getElementById("text1"),
    document.getElementById("text2"),
    document.getElementById("text3"),
  ];

  function typeText(element, text, delay = 0) {
    setTimeout(() => {
      element.classList.add("typing");
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";

      let i = 0;
      const typeInterval = setInterval(() => {
        element.textContent = text.substring(0, i + 1);
        i++;

        if (i >= text.length) {
          clearInterval(typeInterval);
          element.classList.remove("typing");
          element.classList.add("completed");
        }
      }, 50);
    }, delay);
  }
  setTimeout(() => {
    typeText(textElements[0], texts[0], 0);
    typeText(textElements[1], texts[1], 2000);
    typeText(textElements[2], texts[2], 4000);
  }, 1500);
}
async function updateVisitorCount() {
  try {
    let count = localStorage.getItem("visitorCount") || 0;
    count = parseInt(count) + 1;
    localStorage.setItem("visitorCount", count);
    animateCounter(0, count, 2000);
  } catch (error) {
    console.error("Visitor count update failed:", error);
    if (visitorCount) {
      visitorCount.textContent = "---";
    }
  }
}

function animateCounter(start, end, duration) {
  if (!visitorCount) return;

  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const current = Math.floor(start + (end - start) * progress);
    visitorCount.textContent = current.toLocaleString("tr-TR");

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}
async function loadDiscordStatus() {
  try {
    const response = await fetch(
      `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`
    );
    const data = await response.json();

    if (data.success && discordStatus && discordStatusText) {
      const status = data.data.discord_status;
      const statusTexts = {
        online: "Çevrimiçi",
        idle: "Boşta",
        dnd: "zypheris Şuanda discord'ta aktif",
        offline: "Çevrimdışı",
      };

      discordStatus.className = `status-indicator ${status}`;
      discordStatusText.textContent = statusTexts[status] || "Bilinmiyor";
    }
  } catch (error) {
    console.error("Discord status load failed:", error);
    if (discordStatus && discordStatusText) {
      discordStatus.className = "status-indicator offline";
      discordStatusText.textContent = "Çevrimdışı";
    }
  }
}
function initTypewriter() {
  if (!animatedName) return;

  const typeSpeed = 150;
  const deleteSpeed = 100;
  const pauseTime = 2000;

  function type() {
    const currentName = names[currentNameIndex];

    if (isDeleting) {
      currentText = currentName.substring(0, charIndex - 1);
      charIndex--;
    } else {
      currentText = currentName.substring(0, charIndex + 1);
      charIndex++;
    }

    animatedName.textContent = currentText;

    let typeSpeedCurrent = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentName.length) {
      typeSpeedCurrent = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentNameIndex = (currentNameIndex + 1) % names.length;
      typeSpeedCurrent = typeSpeed;
    }

    setTimeout(type, typeSpeedCurrent);
  }

  type();
}
async function loadProjects() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    const filteredRepos = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
    if (projectsGrid && projectsLoading) {
      const featuredProjects = filteredRepos.slice(0, 5);
      projectsLoading.style.display = "none";
      projectsGrid.style.display = "grid";
      let projectsHTML = "";
      featuredProjects.forEach((project, index) => {
        projectsHTML += createProjectCard(project, index === 0);
      });
      if (filteredRepos.length > 5) {
        projectsHTML += `
                    <div class="more-projects-card">
                        <h3>+${filteredRepos.length - 5} Daha Fazla Proje</h3>
                        <p>Tüm projelerimi görmek için tıklayın</p>
                        <a href="projects.html" class="btn-primary">
                            <span>Tümünü Gör</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                `;
      }

      projectsGrid.innerHTML = projectsHTML;
    }
    if (allProjectsGrid && allProjectsLoading) {
      allProjectsLoading.style.display = "none";
      allProjectsGrid.style.display = "grid";
      allProjectsGrid.innerHTML = filteredRepos
        .map((project, index) => createProjectCard(project, index === 0))
        .join("");
    }
  } catch (error) {
    console.error("GitHub API error:", error);
    const errorMessage = `
            <div style="text-align: center; padding: 40px; color: rgba(255, 255, 255, 0.7);">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 20px; color: #ed4245;"></i>
                <h3>Projeler yüklenemedi</h3>
                <p>GitHub API'sine bağlanırken bir hata oluştu.</p>
                <p style="font-size: 0.9rem; margin-top: 10px;">Lütfen GitHub kullanıcı adınızı kontrol edin.</p>
            </div>
        `;

    if (projectsLoading) {
      projectsLoading.innerHTML = errorMessage;
    }
    if (allProjectsLoading) {
      allProjectsLoading.innerHTML = errorMessage;
    }
  }
}
function createProjectCard(project, isNew = false) {
  const language = project.language || "yazılım dili yok";
  const description = project.description || "Açıklama bulunmuyor.";
  const stars = project.stargazers_count || 0;
  const forks = project.forks_count || 0;
  const lastUpdate = new Date(project.updated_at).toLocaleDateString("tr-TR");

  return `
        <div class="project-card">
            <div class="project-header">
                <h3 class="project-name">${project.name}</h3>
                ${isNew ? '<span class="new-badge">YENİ</span>' : ""}
            </div>
            <p class="project-description">${description}</p>
            <div class="project-tech">
                <span class="tech-badge">${language}</span>
                <span class="tech-badge">Son güncelleme: ${lastUpdate}</span>
            </div>
            <div class="project-stats">
                <span><i class="fas fa-star"></i> ${stars}</span>
                <span><i class="fas fa-code-branch"></i> ${forks}</span>
            </div>
            <div class="project-links">
                <a href="${
                  project.html_url
                }" target="_blank" class="project-link">
                    <i class="fab fa-github"></i>
                    Kodu Görüntüle
                </a>
                ${
                  project.homepage
                    ? `
                    <a href="${project.homepage}" target="_blank" class="project-link">
                        <i class="fas fa-external-link-alt"></i>
                        Canlı Demo
                    </a>
                `
                    : ""
                }
            </div>
        </div>
    `;
}
function initScrollToTop() {
  if (!scrollTopBtn) return;

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
}
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);
  const animatedElements = document.querySelectorAll(
    ".project-card, .tech-card, .social-card, .more-projects-card"
  );
  animatedElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(el);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) rotate(5deg)";
    });

    logo.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)";
    });
  }
  const aboutMe = document.querySelector(".about-me");
  if (aboutMe) {
    aboutMe.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
    });

    aboutMe.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  }
});
function logPerformance() {
  if (window.performance) {
    const loadTime =
      window.performance.timing.loadEventEnd -
      window.performance.timing.navigationStart;
    console.log(`Sayfa yükleme süresi: ${loadTime}ms`);
  }
}

window.addEventListener("load", logPerformance);
