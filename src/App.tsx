import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { useCreateTemplate } from "./api/createTemplate";
import { useTemplates } from "./api/getTemplates";
import { useUpdateTemplate } from "./api/updateTemplate";
import { Signin } from "./components/auth/Signin";
import { Header } from "./components/Header";
import { TemplateContent } from "./components/templates/TemplateContent";
import { Templates } from "./components/templates/Templates";
import { Status, Template, TemplateFormValues } from "./types";

const filterTemplates = (templates: Template[], keyword: string): Template[] =>
  templates.filter((template) => template.title.includes(keyword));

function App() {
  const templatesQuery = useTemplates();
  const createTemplateMutation = useCreateTemplate();
  const updateTemplateMutation = useUpdateTemplate();
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSectedId] = useState("");
  const [status, setStatus] = useState<Status>("READ");

  const templates = templatesQuery.data ?? [];

  const filteredTemplates: Template[] = keyword
    ? filterTemplates(templates, keyword)
    : templates;

  const displayTemplate = filteredTemplates.find(
    (template) => template.id === selectedId
  ) as Template;

  const onAddNewTemplateSubmit: SubmitHandler<TemplateFormValues> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    const { title, content } = data;

    if (!data.title) return;

    const res = await createTemplateMutation.mutateAsync({ title, content });

    setStatus("READ");
    setSectedId(res.id);
  };

  const editTemplate = async (id: string, data: TemplateFormValues) => {
    await updateTemplateMutation.mutateAsync({ templateId: id, data });
    setStatus("READ");
  };

  if (templatesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (templatesQuery.isError) {
    <div>Error occure</div>;
  }

  if (!templatesQuery.data) return null;

  return (
    <div className="w-[700px] h-[400px] bg-white">
      <Signin />
      <Header
        onChangeKeyword={setKeyword}
        setStatus={setStatus}
        setSectedId={setSectedId}
      />
      <main className="w-full">
        <div className="flex mx-6 py-3">
          <div className="w-[45%] h-[315px] overflow-scroll">
            <Templates
              templates={filteredTemplates}
              selectedId={selectedId}
              setStatus={setStatus}
              setSectedId={setSectedId}
            />
          </div>

          <div className="w-[55%] h-[315px] border rounded-md">
            <TemplateContent
              status={status}
              setStatus={setStatus}
              template={displayTemplate}
              onAddNewTemplateSubmit={onAddNewTemplateSubmit}
              editTemplate={editTemplate}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
