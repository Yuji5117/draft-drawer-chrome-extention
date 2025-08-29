import { useQuery } from "@tanstack/react-query";

import { getAllDocs } from "@/libs/firebase";
import { Template } from "@/types";
import { storage } from "@/libs/storage";

export const getTemplates = async (): Promise<Template[]> => {
  const cachedTemplates = await storage.get<Template[]>("templates");
  if (cachedTemplates) return cachedTemplates;

  const templatesFromDB = await getAllDocs<Template>("templates");
  await storage.set("templates", templatesFromDB);

  return templatesFromDB;
};

export const useTemplates = () => {
  return useQuery({
    queryKey: ["templates"],
    queryFn: () => getTemplates(),
  });
};
