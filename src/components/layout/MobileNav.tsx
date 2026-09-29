"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import NavLink from "@/components/layout/NavLink";
import { authNav, mainNav } from "@/data/navigation";

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary-400";

/**
 * The menu below 768px. A modal <dialog> gives the focus trap (the page behind is inert), Esc to close
 * and focus return to the hamburger, with no dependency. `html:has(dialog:modal)` in globals.css locks
 * the page scroll while it is open.
 */
export default function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const id = useId();

  const show = () => {
    dialogRef.current?.showModal();
    closeRef.current?.focus();
    setOpen(true);
  };
  const close = () => dialogRef.current?.close();

  // A modal dialog lets Tab leave for the browser chrome; wrap it at both ends to keep focus in the panel.
  const trapTab = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const focusable = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  // Close on route change.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  // Close when the viewport grows past the breakpoint, where the dialog is hidden but would stay modal.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 48rem)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) dialogRef.current?.close();
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={show}
        className={`flex tap-target transition-colors hover:text-secondary-400 md:hidden ${focusRing}`}
      >
        <MenuIcon />
      </button>

      <dialog
        ref={dialogRef}
        id={id}
        aria-label="Menu"
        onClose={() => setOpen(false)}
        onKeyDown={trapTab}
        className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-primary-800 p-0 text-neutral-50 backdrop:bg-transparent open:flex open:flex-col md:hidden"
      >
        <div className="container-page flex h-[120px] shrink-0 items-start justify-between">
          <Logo className={`mt-[35px] ml-0.5 ${focusRing}`} onClick={close} />
          <button
            ref={closeRef}
            type="button"
            aria-label="Close menu"
            onClick={close}
            className={`mt-12 flex tap-target transition-colors hover:text-secondary-400 ${focusRing}`}
          >
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="Mobile" className="container-page flex flex-1 flex-col pb-10">
          <ul className="flex flex-col">
            {mainNav.map((link) => (
              <li key={link.label} className="border-b border-white/12">
                <NavLink
                  link={link}
                  onClick={close}
                  className={`block py-4 type-label-xl transition-colors hover:text-secondary-400 ${focusRing}`}
                  activeClassName="text-secondary-400"
                />
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-4 pt-10">
            <ButtonLink href={authNav[0].href} onClick={close} variant="outline-light" fullWidth>
              {authNav[0].label}
            </ButtonLink>
            <ButtonLink href={authNav[1].href} onClick={close} fullWidth>
              {authNav[1].label}
            </ButtonLink>
          </div>
        </nav>
      </dialog>
    </>
  );
}
