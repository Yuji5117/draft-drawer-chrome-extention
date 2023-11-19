import { TemplateItem } from "./TemplateItem";
import { TemplateItemList } from "./TemplateItemList";

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
              setStatus={setStatus}
              setSectedId={setSectedId}
            />
          </li>
        ))}
      </TemplateItemList>
    </div>
  );
};
