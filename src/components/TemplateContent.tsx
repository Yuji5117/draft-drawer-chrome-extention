import { SubmitHandler } from "react-hook-form";

import { TemplateContentDisplay } from "./TemplateContentDisplay";
import { TemplateCreateContent } from "./TemplateCreateContent";

import { Status, Template, TemplateFormValues } from "@/types";

type TemplateContentProps = {
  status: Status;
  template: Template;
  onAddNewTemplateSubmit: SubmitHandler<TemplateFormValues>;
  deleteTemplate: (id: string) => void;
};

export const TemplateContent = ({
  status,
  template,
  onAddNewTemplateSubmit,
  deleteTemplate,
}: TemplateContentProps) => {
  return (
    <div>
      {status === "ADD" ? (
        <TemplateCreateContent
          onAddNewTemplateSubmit={onAddNewTemplateSubmit}
        />
      ) : (
        <TemplateContentDisplay
          template={template}
          deleteTemplate={deleteTemplate}
        />
      )}
    </div>
  );
};
