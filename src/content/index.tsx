import { createRoot } from "react-dom/client";

import { TemplateList } from "@/components/TemplateList";

document.addEventListener(
  "focus",
  (event) => {
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    ) {
      const container = document.createElement("my-extension-root");
      document.body.appendChild(container);

      const rect = event.target.getBoundingClientRect();
      container.style.position = "absolute";
      container.style.left = rect.left + window.scrollX + 10 + "px"; // カーソルの少し右側に配置
      container.style.top = rect.top + window.scrollY + 10 + "px";

      createRoot(container).render(<TemplateList />);
      event.target?.addEventListener("blur", function () {
        container.remove();
      });
    }
  },
  true
);
