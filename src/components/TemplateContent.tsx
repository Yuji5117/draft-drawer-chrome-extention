import { Button } from "./Button";
import { Text } from "./Text";

import { Template } from "@/types";

type TemplateContentProps = {
  displayTemplate?: Template;
};

export const TemplateContent = ({ displayTemplate }: TemplateContentProps) => {
  return (
    <div className="flex flex-col mx-5">
      <div className="h-16 flex items-center justify-end space-x-3">
        <Button variant="primary" size="sm">
          Edit
        </Button>
        <Button variant="danger" size="sm">
          Delete
        </Button>
      </div>

      <div className="w-full h-60 overflow-y-scroll">
        <Text size="sm" className="break-words">
          {displayTemplate
            ? displayTemplate.content
            : "テンプレートが選択されていません"}
        </Text>
      </div>
    </div>
  );
};
