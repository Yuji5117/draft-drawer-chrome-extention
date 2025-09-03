import { Button } from "../ui/Button/Button";
import { Text } from "../ui/Text/Text";

import { useDeleteTemplate } from "@/api/deleteTemplate";
import { Status, Template } from "@/types";

type TemplateContentProps = {
  template: Template;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
};

export const TemplateContentDisplay = ({
  template,
  setStatus,
}: TemplateContentProps) => {
  const deleteTemplateMutation = useDeleteTemplate();
  const onDeleteClick = (id: string) => {
    deleteTemplateMutation.mutate(id);
  };

  return (
    <div className="flex flex-col mx-5">
      <div className="h-16 flex items-center justify-end space-x-3">
        <Button
          onClick={() => setStatus("EDIT")}
          variant="primary"
          size="sm"
          isDisabled={!template}
        >
          Edit
        </Button>
        <Button
          onClick={() => onDeleteClick(template.id)}
          variant="danger"
          size="sm"
          isDisabled={!template}
        >
          Delete
        </Button>
      </div>

      <div className="w-full h-60 overflow-y-scroll">
        <Text size="sm" className="break-words whitespace-pre-wrap">
          {template?.content ?? "テンプレートが選択されていません"}
        </Text>
      </div>
    </div>
  );
};
