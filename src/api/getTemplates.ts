import { getAllDocs } from "@/libs/firebase";
import { Template } from "@/types";

export const getTemplates = async (): Promise<Template[]> => {
  return getAllDocs("templates");
};
