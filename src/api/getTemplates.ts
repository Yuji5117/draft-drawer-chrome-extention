import { useQuery } from "@tanstack/react-query";

import { getAllDocs } from "@/libs/firebase";
import { Template } from "@/types";

export const getTemplates = async (): Promise<Template[]> => {
  return getAllDocs("templates");
};

export const useTemplates = () => {
  return useQuery({
    queryKey: ["templates"],
    queryFn: () => getTemplates(),
  });
};
