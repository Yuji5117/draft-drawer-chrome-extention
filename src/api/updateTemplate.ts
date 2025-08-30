import { useMutation } from "@tanstack/react-query";

import { updateDocFn } from "@/libs/firebase";
import { queryClient } from "@/libs/react-query";
import { Template } from "@/types";
import { storage } from "@/libs/storage";

type UpdateTemplateDTO = {
  data: { title?: string; content?: string };
  templateId: string;
};

type UpdateTemplateData = Pick<UpdateTemplateDTO, "data">["data"];

export const updateTemplate = async ({
  data,
  templateId,
}: UpdateTemplateDTO): Promise<Template> => {
  const updatedTemplate = await updateDocFn<UpdateTemplateData>(
    "templates",
    templateId,
    data
  );

  const currentCachedTemplates = await storage.get("templates");
  if (currentCachedTemplates) {
    const updatedTemplates = currentCachedTemplates.map(template =>
      template.id === templateId ? updatedTemplate : template
    );
    await storage.set("templates", updatedTemplates);
  }

  return updatedTemplate;
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
