export type BaseEntity = {
  id: string;
};

export type Template = BaseEntity & {
  title: string;
  content: string;
};

export type TemplateFormValues = Pick<Template, "title" | "content">;

export type Status = "READ" | "ADD" | "EDIT";
