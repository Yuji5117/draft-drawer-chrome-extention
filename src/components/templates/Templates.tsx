import { useEffect, useRef, useState } from "react";
import { TemplateItem } from "./TemplateItem";

import { Status, Template } from "@/types";

type TemplatesProps = {
  templates: Template[];
  selectedId: string;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  setSectedId: (value: React.SetStateAction<string>) => void;
};

export const Templates = ({
  templates,
  selectedId,
  setStatus,
  setSectedId,
}: TemplatesProps) => {
  const copyButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    const el = copyButtonRefs.current[active];
    if (el && document.activeElement !== el) {
      el.focus({ preventScroll: true });
    }
  }, [active]);

  const handleUlOnKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        setActive((prev) => Math.min(prev + 1, templates.length - 1));
        break;
      case "ArrowUp":
      case "ArrowLeft":
        setActive((prev) => Math.max(prev - 1, 0));
        break;
      case "Home":
        setActive(0);
        break;
      case "End":
        setActive(templates.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <ul className="flex flex-col space-y-1.5" onKeyDown={handleUlOnKeyDown}>
        {templates.map((template, index) => (
          <li
            className={`py-1 rounded-lg ${
              template.id === selectedId ? "opacity-60 bg-green-200" : ""
            }`}
            key={template.id}
          >
            <TemplateItem
              template={template}
              setStatus={setStatus}
              setSectedId={setSectedId}
              copyButtonRef={(el) => (copyButtonRefs.current[index] = el)}
              onCopyButtonFocus={() => setActive(index)}
              copyTabIndex={index === active ? 0 : -1}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
