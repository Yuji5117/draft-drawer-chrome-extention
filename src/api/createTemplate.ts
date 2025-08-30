import { useMutation } from "@tanstack/react-query";

import { createDoc } from "@/libs/firebase";
import { queryClient } from "@/libs/react-query";
import { storage } from "@/libs/storage";
import { Template } from "@/types";

type CreateTemplateDTO = {
  title: string;
  content: string;
};

export const createTemplate = async (
  data: CreateTemplateDTO
): Promise<Template> => {
  const newTemplate = await createDoc<CreateTemplateDTO>("templates", data);

  const currentCachedTemplates = await storage.get("templates");
  if (currentCachedTemplates) {
    await storage.set("templates", [...currentCachedTemplates, newTemplate]);
  }

  return newTemplate;
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
