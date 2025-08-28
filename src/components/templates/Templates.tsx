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

  const handleUlOnFocus = () => {
    copyButtonRefs.current[active]?.focus();
  };

  return (
    <div>
      <ul
        className="flex flex-col space-y-1.5"
        tabIndex={0}
        onFocus={handleUlOnFocus}
      >
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
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
