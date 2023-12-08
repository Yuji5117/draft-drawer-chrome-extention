import { useEffect, useState } from "react";

import { Template } from "@/types";

export const TemplateList = () => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const getTemplates = async () => {
      await new Promise<void>((resolve) => {
        chrome.runtime.sendMessage({ type: "get-templates" }, (response) => {
          setTemplates(response.tempaltes as Template[]);
          resolve();
        });
      });
    };
    getTemplates();
  }, []);

  return (
    <div className="w-32 bg-red">
      <ul>
        {templates.map((tempalte) => (
          <li>{tempalte.title}</li>
        ))}
      </ul>
    </div>
  );
};
