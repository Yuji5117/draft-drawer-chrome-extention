import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Template, TemplateFormValues } from "@/types";

const initalTemplates: Template[] = [
  { id: "1", title: "test", content: "testしました。" },
  { id: "2", title: "hello", content: "今日もこんにちは" },
  { id: "3", title: "why", content: "なぜですか？" },
  { id: "4", title: "testtesttesttest", content: "テストいっぱいします。" },
  { id: "5", title: "mean", content: "意味は何ですか？" },
  { id: "6", title: "sorry", content: "すみません。" },
];

export const useTemplates = () => {
  const [state, setStates] = useState(initalTemplates);
  const [keyword, setKeyword] = useState("");

  const filterTemplates = (templates: Template[]): Template[] =>
    templates.filter((template) => template.title.includes(keyword));

  const templates: Template[] = keyword ? filterTemplates(state) : state;

  const updateTemplateKeyword = (query: string) => {
    setKeyword(query);
  };

  const addNewTemplate = ({ title, content }: TemplateFormValues) => {
    const id = uuidv4();
    const newTemplate = { id, title, content };
    setStates([...state, newTemplate]);
    return newTemplate;
  };

  const updateTemplate = (id: string, title: string, content: string) => {
    const template: Template = { id, title, content };
    setStates((prev) => prev.map((item) => (item.id === id ? template : item)));
    return template;
  };

  const deleteTemplate = (id: string) => {
    const deletedTemplates = state.filter((item) => item.id !== id);
    setStates(deletedTemplates);
  };

  return {
    templates,
    addNewTemplate,
    updateTemplate,
    deleteTemplate,
    updateTemplateKeyword,
  };
};
