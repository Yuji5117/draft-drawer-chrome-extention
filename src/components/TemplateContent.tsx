import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "./ui/Button";
import { Text } from "./ui/Text";

import { Status, Template, TemplateFormValues } from "@/types";

type TemplateContentProps = {
  displayTemplate?: Template;
  status: Status;
  onAddNewTemplateSubmit: SubmitHandler<TemplateFormValues>;
};

export const TemplateContent = ({
  status,
  displayTemplate,
  onAddNewTemplateSubmit,
}: TemplateContentProps) => {
  const { register, handleSubmit } = useForm<TemplateFormValues>();

  if (status === "ADD") {
    return (
      <form
        onSubmit={handleSubmit(onAddNewTemplateSubmit)}
        className="flex flex-col mx-5"
      >
        <div className="h-16 flex items-center justify-end space-x-3">
          <input {...register("title")} type="text" className="border w-full" />
          <Button variant="primary" size="sm">
            Add
          </Button>
        </div>

        <div className="w-full h-60 overflow-y-scroll">
          <textarea
            {...register("content")}
            className="w-full h-full p-2 text-sm border"
          />
        </div>
      </form>
    );
  }

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
