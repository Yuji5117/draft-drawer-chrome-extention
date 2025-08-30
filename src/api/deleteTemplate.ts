import { useMutation } from "@tanstack/react-query";

import { deleteDocFn } from "@/libs/firebase";
import { queryClient } from "@/libs/react-query";
import { storage } from "@/libs/storage";
import { Template } from "@/types";

export const deleteTemplate = async (id: string): Promise<void> => {
  await deleteDocFn("templates", id);

  const currentCachedTemplates = await storage.get("templates");
  if (currentCachedTemplates) {
    const updatedTemplates = currentCachedTemplates.filter(
      (template) => template.id !== id
    );
    await storage.set("templates", updatedTemplates);
  }
};

export const useDeleteTemplate = () => {
  return useMutation({
    onMutate: (deletedTemplateId) => {
      queryClient.setQueryData(["templates"], (prev: Template[]) =>
        prev.filter((template) => template.id !== deletedTemplateId)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
    },
    mutationFn: deleteTemplate,
  });
};
