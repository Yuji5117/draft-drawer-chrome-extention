import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { Header } from "./components/Header";
import { TemplateContent } from "./components/TemplateContent";
import { TemplateItem } from "./components/TemplateItem";
import { Status, Template, TemplateFormValues } from "./types";

const initalTemplates: Template[] = [
  { id: "1", title: "test", content: "testしました。" },
  { id: "2", title: "hello", content: "今日もこんにちは" },
  { id: "3", title: "why", content: "なぜですか？" },
  { id: "4", title: "testtesttesttest", content: "テストいっぱいします。" },
  { id: "5", title: "mean", content: "意味は何ですか？" },
  { id: "6", title: "sorry", content: "すみません。" },
];

function App() {
  const [templates, setTemplates] = useState(initalTemplates);
  const [selectedId, setSectedId] = useState("");
  const [status, setStatus] = useState<Status>("READ");

  const displayTemplate = templates.find(
    (template) => template.id === selectedId
  );

  const handleSelectTemplateClick = (id: string) => {
    setSectedId(id);
    setStatus("READ");
  };

  const handleChangeStatusClick = (status: Status) => {
    setStatus(status);
    setSectedId("");
  };

  const onAddNewTemplateSubmit: SubmitHandler<TemplateFormValues> = (
    data,
    event
  ) => {
    event?.preventDefault();

    const { title, content } = data;
    const id = (templates.length + 1).toString();
    setTemplates([...templates, { id, title, content }]);
    setStatus("READ");
    setSectedId(id);
  };

  return (
    <div className="w-[700px] h-[400px] bg-white">
      {/* Header */}
      <Header handleChangeStatusClick={handleChangeStatusClick} />
      {/* Dashboard */}
      <main className="w-full">
        <div className="flex mx-6 py-3">
          <div className="w-[45%] h-[315px] overflow-scroll">
            <ul className="mr-2">
              {templates.map((template) => (
                <li
                  className={`h-10 ${
                    template.id === selectedId
                      ? "opacity-60 bg-green-200 rounded-lg"
                      : ""
                  }`}
                  key={template.id}
                >
                  <TemplateItem
                    id={template.id}
                    title={template.title}
                    handleSelectTemplateClick={handleSelectTemplateClick}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[55%] h-[315px] border rounded-md">
            <TemplateContent
              onAddNewTemplateSubmit={onAddNewTemplateSubmit}
              status={status}
              displayTemplate={displayTemplate}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
