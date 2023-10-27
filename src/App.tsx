import { useState } from "react";

import { Header } from "./components/Header";
import { TemplateContent } from "./components/TemplateContent";
import { TemplateItem } from "./components/TemplateItem";
import { Template } from "./types";

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

  const displayTemplate = templates.find(
    (template) => template.id === selectedId
  );

  return (
    <div className="w-[700px] h-[400px] bg-white">
      {/* Header */}
      <Header />
      {/* Dashboard */}
      <main className="w-full">
        <div className="flex mx-6 py-3">
          <div className="w-[45%] h-[315px] overflow-scroll">
            <ul className="mr-2">
              {templates.map((template) => (
                <li className="h-10" key={template.id}>
                  <TemplateItem title={template.title} />
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[55%] h-[315px] border rounded-md">
            <TemplateContent displayTemplate={displayTemplate} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
