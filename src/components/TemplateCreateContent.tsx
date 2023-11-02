import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "./ui/Button";

import { TemplateFormValues } from "@/types";

type TemplateContentProps = {
  onAddNewTemplateSubmit: SubmitHandler<TemplateFormValues>;
};

export const TemplateCreateContent = ({
  onAddNewTemplateSubmit,
}: TemplateContentProps) => {
  const { register, watch, handleSubmit } = useForm<TemplateFormValues>();
  const watchTitle = watch("title");

  return (
    <form
      onSubmit={handleSubmit(onAddNewTemplateSubmit)}
      className="flex flex-col mx-5"
    >
      <div className="h-16 flex items-center justify-end space-x-3">
        <input {...register("title")} type="text" className="border w-full" />
        <Button variant="primary" size="sm" isDisabled={!watchTitle}>
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
};
