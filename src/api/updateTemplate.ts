import { useMutation } from "@tanstack/react-query";

import { updateDocFn } from "@/libs/firebase";
import { queryClient } from "@/libs/react-query";
import { Template } from "@/types";

type UpdateTemplateDTO = {
  data: { title?: string; content?: string };
  templateId: string;
};

type UpdateTemplateData = Pick<UpdateTemplateDTO, "data">["data"];

export const updateTemplate = async ({
  data,
  templateId,
}: UpdateTemplateDTO): Promise<Template> => {
  return updateDocFn<UpdateTemplateData>("templates", templateId, data);
};

export const useUpdateTemplate = () => {
  return useMutation({
    onSuccess: (result) => {
      queryClient.setQueryData(["templates"], (prev: Template[]) =>
        prev.map((item) => (item.id === result.id ? result : item))
      );
    },
    mutationFn: updateTemplate,
  });
};
