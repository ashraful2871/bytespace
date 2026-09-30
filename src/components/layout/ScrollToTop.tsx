"use client";

import { useLayoutEffect } from "react";

let fromHistory = false;
if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    fromHistory = true;
  });
}

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
