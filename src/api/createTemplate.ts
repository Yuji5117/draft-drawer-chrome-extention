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

  const templatesCache = await storage.get("templatesCache");
  if (templatesCache?.data) {
    await storage.set("templatesCache", {
      data: [...templatesCache.data, newTemplate],
      lastUpdated: Date.now(),
    });
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
