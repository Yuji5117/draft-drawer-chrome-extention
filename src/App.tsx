import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { Header } from "./components/Header";
import { TemplateContent } from "./components/TemplateContent";
import { Templates } from "./components/Templates";
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
  const [keyword, setKeyword] = useState("");

  const displayTemplateContent = selectedId
    ? templates.find((template) => template.id === selectedId)?.content ?? ""
    : "テンプレートが選択されていません";

  const handleSelectTemplateClick = (id: string) => {
    setSectedId(id);
    setStatus("READ");
  };

  const handleChangeStatusClick = (status: Status) => {
    setStatus(status);
    setSectedId("");
  };

  const onChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const filteredTemplates: Template[] = templates.filter((template) =>
    template.title.includes(keyword)
  );

  const displayTemplates: Template[] = keyword ? filteredTemplates : templates;

  const onAddNewTemplateSubmit: SubmitHandler<TemplateFormValues> = (
    data,
    event
  ) => {
    event?.preventDefault();

    const { title, content } = data;

    if (!data.title) return;

    const id = (templates.length + 1).toString();
    setTemplates([...templates, { id, title, content }]);
    setStatus("READ");
    setSectedId(id);
  };

  return (
    <div className="w-[700px] h-[400px] bg-white">
      <Header
        onChangeKeyword={onChangeKeyword}
        handleChangeStatusClick={handleChangeStatusClick}
      />
      <main className="w-full">
        <div className="flex mx-6 py-3">
          <div className="w-[45%] h-[315px] overflow-scroll">
            <Templates
              templates={displayTemplates}
              selectedId={selectedId}
              handleSelectTemplateClick={handleSelectTemplateClick}
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
