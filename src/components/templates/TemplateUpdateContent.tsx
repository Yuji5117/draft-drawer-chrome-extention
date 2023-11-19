import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../ui/Button";
import { InputField } from "../ui/InputField";

import { Template, TemplateFormValues } from "@/types";

type TemplateUpdateContentProps = {
  template: Template;
  editTemplate: (id: string, data: TemplateFormValues) => void;
};

export const TemplateUpdateContent = ({
  template,
  editTemplate,
}: TemplateUpdateContentProps) => {
  const { register, watch, handleSubmit } = useForm<TemplateFormValues>();
  const watchTitle = watch("title", template.title);

  const onUpdateSubmit: SubmitHandler<TemplateFormValues> = (data, event) => {
    event?.preventDefault();
    if (!data.title) return;

    editTemplate(template.id, data);
  };
  return (
    <form
      onSubmit={handleSubmit(onUpdateSubmit)}
      className="flex flex-col mx-5"
    >
      <div className="h-16 flex items-center justify-end space-x-3">
        <InputField
          defaultValue={template.title}
          registration={{ ...register("title") }}
        />
        <Button variant="primary" size="sm" isDisabled={!watchTitle}>
          Update
        </Button>
      </div>

      <div className="w-full h-60 overflow-y-scroll">
        <textarea
          defaultValue={template.content}
          {...register("content")}
          className="w-full h-full p-2 text-sm border"
        />
      </div>
    </form>
  );
};
