(function () {
  "use strict";

  /* Scroll-reveal is opt-in: content is visible by default in CSS so it
     never depends on JS. Only add this class once we know JS is running,
     an IntersectionObserver exists, and the user hasn't asked for reduced motion. */
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    document.documentElement.classList.add("js-reveal");
  }

  /* Sticky header shadow on scroll */
  var header = document.querySelector(".site-header");
  if (header) {
    var setScrolled = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });
  }

  /* Mobile navigation toggle */
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.getElementById("site-nav-panel");

  if (toggle && panel) {
    var closeMenu = function () {
      toggle.setAttribute("aria-expanded", "false");
      panel.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    };

    var openMenu = function () {
      toggle.setAttribute("aria-expanded", "true");
      panel.classList.add("is-open");
      document.body.classList.add("nav-open");
    };

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* Scroll reveal (only runs when .js-reveal was added above) */
  if (document.documentElement.classList.contains("js-reveal")) {
    var revealEls = document.querySelectorAll(".reveal");
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* Only one problem-list accordion item open at a time (progressive enhancement) */
  var problems = document.querySelectorAll(".problem");
  problems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        problems.forEach(function (other) {
          if (other !== item) {
            other.open = false;
          }
        });
      }
    });
  });

  /* Notes from H (Kit signup) — Kit renders its own default button label
     and placeholder into the form once its embed script loads. This only
     ever edits visible text nodes, never field names or the form's action/
     method, so it can't affect what Kit collects. Kept watching via
     MutationObserver since Kit mounts asynchronously and may re-render the
     form (e.g. after a validation error). */
  var notesForm = document.querySelector(".notes-signup__form");
  if (notesForm) {
    var relabelNotesForm = function () {
      var submit = notesForm.querySelector('button[data-element="submit"], .formkit-submit');
      if (submit) {
        var label = submit.querySelector("span") || submit;
        if (label.textContent.trim() && label.textContent.trim() !== "Send me the notes") {
          label.textContent = "Send me the notes";
        }
      }

      var input = notesForm.querySelector('input[type="email"]');
      if (input) {
        input.setAttribute("placeholder", "Email address");
        input.setAttribute("aria-label", "Email address");
      }
    };

    relabelNotesForm();
    new MutationObserver(relabelNotesForm).observe(notesForm, { childList: true, subtree: true });
  }

  /* Footer year */
  var yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
