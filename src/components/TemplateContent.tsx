import { Button } from "./Button";

export const TemplateContent = () => {
  return (
    <div className="flex flex-col">
      <div className="h-16 flex items-center justify-end space-x-3">
        <div>
          <Button variant="primary" size="sm">
            Edit
          </Button>
        </div>
        <div className="pr-5">
          <Button variant="danger" size="sm">
            Delete
          </Button>
        </div>
      </div>

      <div></div>
    </div>
  );
};
