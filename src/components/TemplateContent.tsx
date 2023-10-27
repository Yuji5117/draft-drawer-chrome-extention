import { Button } from "./Button";

export const TemplateContent = () => {
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

      <div></div>
    </div>
  );
};
