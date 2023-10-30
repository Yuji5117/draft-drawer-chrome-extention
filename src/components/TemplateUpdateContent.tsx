import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "./ui/Button";

import { Template, TemplateFormValues } from "@/types";

type TemplateUpdateContentProps = {
  template: Template;
  editTemplate: (id: string, data: TemplateFormValues) => void;
};

export const TemplateUpdateContent = ({
  template,
  editTemplate,
}: TemplateUpdateContentProps) => {
  console.log(template);
  const { register, handleSubmit } = useForm<TemplateFormValues>();

  const onUpdateSubmit: SubmitHandler<TemplateFormValues> = (data, event) => {
    event?.preventDefault();
    console.log({ data });

    if (!data.title) return;

    editTemplate(template.id, data);
  };
  return (
    <form
      onSubmit={handleSubmit(onUpdateSubmit)}
      className="flex flex-col mx-5"
    >
      <div className="h-16 flex items-center justify-end space-x-3">
        <input
          defaultValue={template.title}
          {...register("title")}
          type="text"
          className="border w-full"
        />
        <Button variant="primary" size="sm">
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
