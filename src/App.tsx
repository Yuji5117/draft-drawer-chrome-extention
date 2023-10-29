import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { Header } from "./components/Header";
import { TemplateContent } from "./components/TemplateContent";
import { Templates } from "./components/Templates";
import { useTemplates } from "./hooks/useTemplates";
import { Status, TemplateFormValues } from "./types";

function App() {
  const { templates, addNewTemplate, updateTemplateKeyword } = useTemplates();
  const [selectedId, setSectedId] = useState("");
  const [status, setStatus] = useState<Status>("READ");

  const displayTemplateContent = selectedId
    ? templates.find((template) => template.id === selectedId)?.content ?? ""
    : "テンプレートが選択されていません";

  const onAddNewTemplateSubmit: SubmitHandler<TemplateFormValues> = (
    data,
    event
  ) => {
    event?.preventDefault();

    const { title, content } = data;

    if (!data.title) return;

    const { id } = addNewTemplate({ title, content });
    setStatus("READ");
    setSectedId(id);
  };

  return (
    <div className="w-[700px] h-[400px] bg-white">
      <Header
        onChangeKeyword={updateTemplateKeyword}
        setStatus={setStatus}
        setSectedId={setSectedId}
      />
      <main className="w-full">
        <div className="flex mx-6 py-3">
          <div className="w-[45%] h-[315px] overflow-scroll">
            <Templates
              templates={templates}
              selectedId={selectedId}
              setStatus={setStatus}
              setSectedId={setSectedId}
            />
          </div>

          <div className="w-[55%] h-[315px] border rounded-md">
            <TemplateContent
              status={status}
              content={displayTemplateContent}
              onAddNewTemplateSubmit={onAddNewTemplateSubmit}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
