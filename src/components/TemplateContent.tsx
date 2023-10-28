import { SubmitHandler } from "react-hook-form";

import { TemplateContentDisplay } from "./TemplateContentDisplay";
import { TemplateCreateContent } from "./TemplateCreateContent";

import { Status, TemplateFormValues } from "@/types";

type TemplateContentProps = {
  status: Status;
  content: string;
  onAddNewTemplateSubmit: SubmitHandler<TemplateFormValues>;
};

export const TemplateContent = ({
  status,
  content,
  onAddNewTemplateSubmit,
}: TemplateContentProps) => {
  return (
    <div>
      {status === "ADD" ? (
        <TemplateCreateContent
          onAddNewTemplateSubmit={onAddNewTemplateSubmit}
        />
      ) : (
        <TemplateContentDisplay content={content} />
      )}
    </div>
  );
};
