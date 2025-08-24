export type BaseEntity = {
  id: string;
};

export type User = BaseEntity & {
  email: string;
};

export type Template = BaseEntity & {
  title: string;
  content: string;
};

export type TemplateFormValues = Pick<Template, "title" | "content">;

export type Status = "READ" | "ADD" | "EDIT";

export type AuthResponse =
  | { status: "SUCCESS"; user: User }
  | { status: "ERROR"; error: string };

export type TemplatesResponse =
  | { status: "SUCCESS"; templates: Template[] }
  | { status: "ERROR"; error: string };

export type ChromeMessage = {
  type: "sign-in" | "get-templates";
};
