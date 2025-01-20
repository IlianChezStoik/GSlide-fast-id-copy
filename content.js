// General URL = https://docs.google.com/presentation/d/15t24M-o_PGMFdkZ-Q6xbPucWJMXKGHyVrUYWkTCnyEI/edit#slide=id.g2ebc14ed5c9_0_221
const options = [
  {
    id: "copy-document-id",
    name: "Copy document id",
    icon: "docs-icon-editors-ia-content-copy",
    action: () => {
      const url = window.location.href;
      const id = url.match(/d\/(.*)\/edit/)[1];
      navigator.clipboard.writeText(id);
      console.log(`Document ID copied: ${id}`);
      createAlert(`Document ID copied: ${id}`);
    }
  },
  {
    id: "copy-slide-id",
    name: "Copy slide id",
    icon: "docs-icon-editors-ia-content-copy",
    action: () => {
      const url = window.location.href;
      const id = url.match(/slide=id\.(.*)/)[1];
      navigator.clipboard.writeText(id);
      console.log(`Slide ID copied: ${id}`);
      createAlert(`Slide ID copied: ${id}`);
    }
  },
  {
    id: "goto-slide-id",
    name: "Go to copied slide id",
    icon: "docs-icon-editors-ia-view-show",
    action: () => {
      const copied = navigator.clipboard.readText();
      copied.then(id => {
        const url = window.location.href;
        const newUrl = url.replace(/slide=id\..*/, `slide=id.${id}`);
        window.location.href = newUrl;

        // Check if the slide id is valid
        const escapedId = CSS.escape(id);
        const slide = document.querySelector(`[id$="${escapedId}"]`);
        if (slide) {
          console.log(`Navigating to slide id: ${id}`);
          createAlert(`Navigating to slide id: ${id}`);
        } else {
          console.log(`Invalid slide id: ${id}`);
          createAlert(`Invalid slide id: ${id}`, false);
        }
      })
    }
  }
]

/**
 * 
 * @param {string} message Message to display
 * @param {boolean} success If the alert is a success or error, default is success
 */

const createAlert = (message, success = true) => {
  const alert = document.createElement("div");
  alert.style.position = "fixed";
  alert.style.top = "10px";
  alert.style.left = "10px";
  alert.style.padding = "10px";
  alert.style.borderRadius = "5px";
  alert.style.backgroundColor = "#333";
  alert.style.color = "#fff";
  alert.style.transition = "opacity 0.5s";
  alert.style.zIndex = "99999";
  alert.className = "custom-alert";

  alert.innerHTML = `
    <span>${success ? "✅" : "❌"} ${message}</span>
  `;

  document.body.appendChild(alert);

  setTimeout(() => {
    alert.style.opacity = 0;
    setTimeout(() => {
      alert.remove();
    }, 500);
  }, 2000);
}

document.addEventListener("click", () => {
  const menus = document.querySelectorAll(".apps-menu-hide-mnemonics");

  menus.forEach(menu => {
    if (!menu.querySelector(".custom-menu-item")) {

      options.forEach(({id, name, icon, action, disabled}) => {
        const customItem = document.createElement("div");
        customItem.className = `goog-menuitem apps-menuitem custom-menu-item custom-menu-item-${id}`;
        customItem.role = "menuitem";
        customItem.style.userSelect = "none";

        customItem.innerHTML = `
          <div class="goog-menuitem-content">
              <div
                  class="docs-icon goog-inline-block goog-menuitem-icon"
                  aria-hidden="true">
                  <div class="docs-icon-img-container docs-icon-img ${icon}"></div>
              </div>
              <span class="goog-menuitem-label">${name}</span>
          </div>
        `;

        if (disabled) {
          customItem.classList.add("goog-menuitem-disabled");
          customItem.tooltip = "Disabled";
        } else {
          customItem.addEventListener("click", () => {
            action();
            menu.style.display = "none";
          });


          customItem.addEventListener("mouseover", () => {
            customItem.classList.add("goog-menuitem-highlight");
          });

          customItem.addEventListener("mouseout", () => {
            customItem.classList.remove("goog-menuitem-highlight");
          });
        }

        menu.appendChild(customItem);

      });

      const separator = document.createElement("div");
      separator.className = "goog-menuseparator";
      separator.ariaDisabled = "true";
      separator.role = "separator";
      separator.id = "4wn7q5:1c0";
      separator.style.userSelect = "none";

      menu.appendChild(separator);
    }
  });
})
