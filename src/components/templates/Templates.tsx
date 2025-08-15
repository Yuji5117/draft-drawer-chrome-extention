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
  return (
    <div>
      <ul className="flex flex-col space-y-1.5">
        {templates.map((template) => (
          <li
            className={`py-1 rounded-lg ${
              template.id === selectedId
                ? "opacity-60 bg-green-200"
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
      </ul>
    </div>
  );
};
