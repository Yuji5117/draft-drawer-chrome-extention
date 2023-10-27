export type Template = {
  id: string;
  title: string;
  content: string;
};

export type TemplateFormValues = Pick<Template, "title" | "content">;

export type Status = "READ" | "ADD" | "EDIT";
