(function () {
  "use strict";

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("[data-menu-trigger]");
    var openMenu = document.querySelector('.user-menu-list[data-open="true"]');

    if (trigger) {
      var menu = document.getElementById(trigger.getAttribute("aria-controls"));
      var isOpen = trigger.getAttribute("aria-expanded") === "true";

      if (openMenu && openMenu !== menu) {
        closeMenu(openMenu);
      }

      if (isOpen) {
        closeMenu(menu, trigger);
      } else {
        openMenuList(menu, trigger);
      }
      return;
    }

    if (openMenu && !openMenu.contains(e.target)) {
      closeMenu(openMenu);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var openMenu = document.querySelector('.user-menu-list[data-open="true"]');
    if (openMenu) {
      var trigger = document.querySelector(
        '[aria-controls="' + openMenu.id + '"]'
      );
      closeMenu(openMenu, trigger);
    }
  });

  function openMenuList(menu, trigger) {
    if (!menu) return;
    menu.hidden = false;
    menu.setAttribute("data-open", "true");
    trigger.setAttribute("aria-expanded", "true");
    var firstItem = menu.querySelector("a, button");
    if (firstItem) firstItem.focus();
  }

  function closeMenu(menu, trigger) {
    if (!menu) return;
    menu.hidden = true;
    menu.removeAttribute("data-open");
    var t =
      trigger ||
      document.querySelector('[aria-controls="' + menu.id + '"]');
    if (t) {
      t.setAttribute("aria-expanded", "false");
    }
  }
})();
