import { Button } from "./ui/Button";
import { Text } from "./ui/Text";

import { Status, Template } from "@/types";

type TemplateContentProps = {
  template: Template;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  deleteTemplate: (id: string) => void;
};

export const TemplateContentDisplay = ({
  template,
  setStatus,
  deleteTemplate,
}: TemplateContentProps) => {
  const onDeleteClick = (id: string) => {
    deleteTemplate(id);
  };

  return (
    <div className="flex flex-col mx-5">
      <div className="h-16 flex items-center justify-end space-x-3">
        <Button onClick={() => setStatus("EDIT")} variant="primary" size="sm">
          Edit
        </Button>
        <Button
          onClick={() => onDeleteClick(template.id)}
          variant="danger"
          size="sm"
        >
          Delete
        </Button>
      </div>

      <div className="w-full h-60 overflow-y-scroll">
        <Text size="sm" className="break-words">
          {template?.content ?? "テンプレートが選択されていません"}
        </Text>
      </div>
    </div>
  );
};
