import { TemplateItem } from "./TemplateItem";
import { TemplateItemList } from "./TemplateItemList";

import { Template } from "@/types";

type TemplatesProps = {
  templates: Template[];
  selectedId: string;
  handleSelectTemplateClick: (id: string) => void;
};

export const Templates = ({
  templates,
  selectedId,
  handleSelectTemplateClick,
}: TemplatesProps) => {
  return (
    <div>
      <TemplateItemList>
        {templates.map((template) => (
          <li
            className={`h-10 ${
              template.id === selectedId
                ? "opacity-60 bg-green-200 rounded-lg"
                : ""
            }`}
            key={template.id}
          >
            <TemplateItem
              template={template}
              handleSelectTemplateClick={handleSelectTemplateClick}
            />
          </li>
        ))}
      </TemplateItemList>
    </div>
  );
};
