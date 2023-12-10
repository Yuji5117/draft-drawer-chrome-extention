import { useEffect, useRef, useState } from "react";

import { Template } from "@/types";

export const TemplateList = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [activeInput, setActiveInput] = useState<Element | null>(null);

  useEffect(() => {
    const getTemplates = async () => {
      await new Promise<void>((resolve) => {
        chrome.runtime.sendMessage({ type: "get-templates" }, (response) => {
          setTemplates(response.templates as Template[]);
          resolve();
        });
      });
    };
    getTemplates();

    const activeInput = document.activeElement ?? null;
    setActiveInput(activeInput);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (
        ref.current &&
        event.target instanceof Node &&
        !ref.current.contains(event.target)
      ) {
        const extensionElement = document.getElementById("myExtensionRoot");
        extensionElement?.remove();
      }
    };

    document.addEventListener("click", handleClickOutside);
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    templateContent: string
  ) => {
    e.stopPropagation();

    if (
      activeInput instanceof HTMLInputElement ||
      activeInput instanceof HTMLTextAreaElement
    ) {
      activeInput.focus();

      const startPos = activeInput.selectionStart;
      const endPos = activeInput.selectionEnd;

      if (startPos !== null && endPos !== null) {
        activeInput.value =
          activeInput.value.substring(0, startPos) +
          templateContent +
          activeInput.value.substring(endPos);

        activeInput.selectionStart = activeInput.selectionEnd =
          startPos + templateContent.length;
      }
      const extensionElement = document.getElementById("myExtensionRoot");
      extensionElement?.remove();
    }
  };

  return (
    <div ref={ref}>
      <ul className="bg-white space-y-5 p-2 w-12">
        {templates.map((template) => (
          <li
            key={template.id}
            className="text-sm p-2 "
            onClick={(e) => handleClick(e, template.content)}
          >
            {template.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
