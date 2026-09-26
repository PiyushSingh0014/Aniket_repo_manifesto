import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Prerendered HTML is hydrated. The dev server starts with an empty root.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);

// Turn on the on-enter reveals only now. Anything already on screen (or scrolled past)
// stays visible, so nothing the reader can see ever disappears.
for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
  if (el.getBoundingClientRect().top < window.innerHeight) el.dataset.revealed = "";
}
document.documentElement.classList.add("js");
