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
};

export const TemplateContent = ({
  status,
  setStatus,
  template,
  onAddNewTemplateSubmit,
  editTemplate,
}: TemplateContentProps) => {
  const renderTemplateContent = () => {
    if (status === "ADD") {
      return (
        <TemplateCreateContent
          onAddNewTemplateSubmit={onAddNewTemplateSubmit}
        />
      );
    }

    if (status === "EDIT") {
      return (
        <TemplateUpdateContent
          template={template}
          editTemplate={editTemplate}
        />
      );
    }

    return <TemplateContentDisplay template={template} setStatus={setStatus} />;
  };

  return <div>{renderTemplateContent()}</div>;
};
