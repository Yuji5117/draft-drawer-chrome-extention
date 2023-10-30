import { SubmitHandler } from "react-hook-form";

import { TemplateContentDisplay } from "./TemplateContentDisplay";
import { TemplateCreateContent } from "./TemplateCreateContent";
import { TemplateUpdateContent } from "./TemplateUpdateContent";

import { Status, Template, TemplateFormValues } from "@/types";

type TemplateContentProps = {
  status: Status;
  template: Template;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  onAddNewTemplateSubmit: SubmitHandler<TemplateFormValues>;
  editTemplate: (id: string, data: TemplateFormValues) => void;
  deleteTemplate: (id: string) => void;
};

export const TemplateContent = ({
  status,
  setStatus,
  template,
  onAddNewTemplateSubmit,
  editTemplate,
  deleteTemplate,
}: TemplateContentProps) => {
  const templateContentView = {
    ADD: (
      <TemplateCreateContent onAddNewTemplateSubmit={onAddNewTemplateSubmit} />
    ),
    EDIT: (
      <TemplateUpdateContent template={template} editTemplate={editTemplate} />
    ),
    READ: (
      <TemplateContentDisplay
        template={template}
        setStatus={setStatus}
        deleteTemplate={deleteTemplate}
      />
    ),
  };

  return <div>{templateContentView[status]}</div>;
};
