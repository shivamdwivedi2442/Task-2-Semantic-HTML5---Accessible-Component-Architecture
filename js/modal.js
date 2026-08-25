(function () {
  "use strict";

  var FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  var lastFocusedTrigger = null;

  function getFocusable(modal) {
    return Array.prototype.slice.call(modal.querySelectorAll(FOCUSABLE_SELECTOR));
  }

  function openModal(modalId, triggerEl) {
    var overlay = document.getElementById(modalId);
    if (!overlay) return;

    lastFocusedTrigger = triggerEl || document.activeElement;
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";

    var modal = overlay.querySelector(".modal");
    var focusable = getFocusable(modal);
    (focusable[0] || modal).focus();

    overlay.setAttribute("data-open", "true");
  }

  function closeModal(overlay) {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    overlay.removeAttribute("data-open");
    document.body.style.overflow = "";

    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === "function") {
      lastFocusedTrigger.focus();
    }
  }

  function handleKeydown(e) {
    var openOverlay = document.querySelector(".modal-overlay.is-open");
    if (!openOverlay) return;

    if (e.key === "Escape") {
      closeModal(openOverlay);
      return;
    }

    if (e.key === "Tab") {
      var modal = openOverlay.querySelector(".modal");
      var focusable = getFocusable(modal);
      if (focusable.length === 0) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  document.addEventListener("click", function (e) {
    var opener = e.target.closest("[data-modal-open]");
    if (opener) {
      openModal(opener.getAttribute("data-modal-open"), opener);
      return;
    }

    var closer = e.target.closest("[data-modal-close]");
    if (closer) {
      closeModal(closer.closest(".modal-overlay"));
      return;
    }

    if (e.target.classList.contains("modal-overlay")) {
      closeModal(e.target);
    }
  });

  document.addEventListener("keydown", handleKeydown);
})();
