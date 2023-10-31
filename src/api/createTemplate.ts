import { createDoc } from "@/libs/firebase";

type CreateTemplateDTO = {
  title: string;
  content: string;
};

export const createTemplate = (data: CreateTemplateDTO) => {
  return createDoc("templates", data);
};
