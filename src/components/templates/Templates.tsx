import { TemplateItem } from "./TemplateItem";

import { Status, Template } from "@/types";
import { useRovingTabIndex } from "@/hooks/useRovingTabIndex";

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
  const { active, setActive, itemRefs, handleKeyDown } = useRovingTabIndex({
    itemCount: templates.length,
  });

  return (
    <div>
      <ul className="flex flex-col space-y-1.5" onKeyDown={handleKeyDown}>
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
              copyButtonRef={(el) => (itemRefs.current[index] = el)}
              onCopyButtonFocus={() => setActive(index)}
              copyTabIndex={index === active ? 0 : -1}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
