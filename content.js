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
    }
  }
]


document.addEventListener("click", () => {
  const menus = document.querySelectorAll(".apps-menu-hide-mnemonics");

  menus.forEach(menu => {
    if (!menu.querySelector(".custom-menu-item")) {

      options.forEach(({id, name, icon, action}) => {
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

        customItem.addEventListener("click", () => {
          action();
          menu.style.display = "none";
        });

        customItem.addEventListener("mouseover", () => {
          customItem.classList.add("goog-menuitem-highlight");
        });

        customItem.addEventListener("mouseout", () => {
          customItem.classList.remove("goog-menuitem-highlight");
        })

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
