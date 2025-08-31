import { useQuery } from "@tanstack/react-query";

import { getAllDocs } from "@/libs/firebase";
import { Template } from "@/types";
import { storage } from "@/libs/storage";

export const getTemplates = async (): Promise<Template[]> => {
  const templatesCache = await storage.get("templatesCache");
  if (templatesCache?.data) return templatesCache.data;

  const templatesFromDB = await getAllDocs<Template>("templates");
  await storage.set("templatesCache", {
    data: templatesFromDB,
    lastUpdated: Date.now(),
  });

  return templatesFromDB;
};

export const useTemplates = () => {
  return useQuery({
    queryKey: ["templates"],
    queryFn: () => getTemplates(),
  });
};
