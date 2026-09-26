import "./index.css";

// The production HTML is prerendered, so the page is readable before any JavaScript runs.
// React loads once the page has loaded and painted, so it never competes with first paint.
const boot = () => requestAnimationFrame(() => setTimeout(() => void import("./boot")));

if (document.readyState === "complete") boot();
else window.addEventListener("load", boot, { once: true });
