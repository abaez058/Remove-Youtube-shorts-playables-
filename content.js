// 1) Redirect Shorts URLs (/shorts/VIDEO_ID) to the regular watch page,
//    and send the Playables hub/games (/playables...) back to the homepage.
function redirectBlocked() {
  const shorts = location.pathname.match(/^\/shorts\/([\w-]+)/);
  if (shorts) {
    location.replace(`/watch?v=${shorts[1]}`);
    return;
  }
  if (/^\/playables(\/|$)/.test(location.pathname)) {
    location.replace("/");
  }
}
redirectBlocked();
window.addEventListener("yt-navigate-start", redirectBlocked);
window.addEventListener("yt-navigate-finish", redirectBlocked);

// 2) Fallback remover: catches Shorts/Playables elements the CSS misses if
//    YouTube renames things. Looks for text/links instead of exact tag structure.
const SIDEBAR = "ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer";
const SHELVES =
  "ytd-rich-section-renderer, ytd-rich-shelf-renderer, ytd-reel-shelf-renderer, grid-shelf-view-model, ytd-shelf-renderer";
const BLOCKED_LABELS = new Set(["Shorts", "Playables", "YouTube Playables"]);
const BLOCKED_LINKS = 'a[href^="/shorts"], a[href^="/playables"]';
const BLOCKED_LINKS_DEEP = 'a[href*="/shorts/"], a[href*="/playables"]';

function sweep() {
  document.querySelectorAll(SIDEBAR).forEach((el) => {
    const label = (el.getAttribute("aria-label") || el.textContent || "").trim();
    if (BLOCKED_LABELS.has(label) || el.querySelector(BLOCKED_LINKS)) {
      el.style.display = "none";
    }
  });

  document.querySelectorAll(SHELVES).forEach((el) => {
    if (el.style.display === "none") return;
    const title = el.querySelector("#title, h2, #rich-shelf-header");
    const isBlockedTitle = title && BLOCKED_LABELS.has(title.textContent.trim());
    if (isBlockedTitle || el.querySelector(BLOCKED_LINKS_DEEP)) {
      el.style.display = "none";
    }
  });
}

let timer;
new MutationObserver(() => {
  clearTimeout(timer);
  timer = setTimeout(sweep, 150);
}).observe(document.documentElement, { childList: true, subtree: true });

document.addEventListener("DOMContentLoaded", sweep);
