import { useMutation } from "@tanstack/react-query";

import { deleteDocFn } from "@/libs/firebase";
import { queryClient } from "@/libs/react-query";
import { Template } from "@/types";

export const deleteTemplate = async (id: string): Promise<Template> => {
  return await deleteDocFn("templates", id);
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
