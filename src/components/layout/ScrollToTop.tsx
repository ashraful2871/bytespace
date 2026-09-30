"use client";

import { useLayoutEffect } from "react";

// Back and Forward fire popstate before the new route renders, so the browser's own scroll restoration is kept.
let fromHistory = false;
if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    fromHistory = true;
  });
}

/**
 * Opens a nested layout at the top of the page. Next only scrolls when the new page segment's top edge is off screen,
 * and on the course detail the tab content sits ~1100px down, so a click from partway down /courses left the visitor
 * mid-page. It runs on mount only, so switching tabs inside the layout doesn't move the page.
 */
export default function ScrollToTop() {
  useLayoutEffect(() => {
    if (fromHistory) {
      fromHistory = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return null;
}
