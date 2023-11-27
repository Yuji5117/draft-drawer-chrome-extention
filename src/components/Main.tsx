import { useMemo, useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { Header } from "./Header";
import { TemplateContent } from "./templates/TemplateContent";
import { Templates } from "./templates/Templates";

import { useCreateTemplate } from "@/api/createTemplate";
import { useTemplates } from "@/api/getTemplates";
import { useUpdateTemplate } from "@/api/updateTemplate";
import { Status, Template, TemplateFormValues } from "@/types";

const filterTemplates = (templates: Template[], keyword: string): Template[] =>
  templates.filter((template) => template.title.includes(keyword));

function Main() {
  const templatesQuery = useTemplates();
  const createTemplateMutation = useCreateTemplate();
  const updateTemplateMutation = useUpdateTemplate();
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSectedId] = useState("");
  const [status, setStatus] = useState<Status>("READ");

  const filteredTemplates: Template[] = useMemo(() => {
    const templates = templatesQuery.data ?? [];
    return keyword ? filterTemplates(templates, keyword) : templates;
  }, [templatesQuery, keyword]);

  const displayTemplate = useMemo(
    () =>
      filteredTemplates.find(
        (template) => template.id === selectedId
      ) as Template,
    [filteredTemplates, selectedId]
  );

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

export default Main;
