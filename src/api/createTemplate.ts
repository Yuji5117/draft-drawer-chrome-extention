import { useMutation } from "@tanstack/react-query";

import { createDoc } from "@/libs/firebase";
import { queryClient } from "@/libs/react-query";
import { Template } from "@/types";

type CreateTemplateDTO = {
  title: string;
  content: string;
};

export const createTemplate = (data: CreateTemplateDTO): Promise<Template> => {
  return createDoc<CreateTemplateDTO>("templates", data);
};

export const useCreateTemplate = () => {
  return useMutation({
    onSuccess: (result) => {
      queryClient.setQueryData(["templates"], (prev: Template[]) => [
        ...prev,
        result,
      ]);
    },
    mutationFn: createTemplate,
  });
};
