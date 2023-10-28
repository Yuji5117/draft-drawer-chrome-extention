import { Button } from "./ui/Button";
import { Text } from "./ui/Text";

type TemplateContentProps = {
  content: string;
};

export const TemplateContentDisplay = ({ content }: TemplateContentProps) => {
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
          {content}
        </Text>
      </div>
    </div>
  );
};
