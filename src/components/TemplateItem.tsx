import { HiOutlineClipboardCopy } from "react-icons/hi";

import { Text } from "./Text";

import { Template } from "@/types";

type TemplateItemProps = {
  template: Template;
  handleSelectTemplateClick: (id: string) => void;
};

export const TemplateItem = ({
  template,
  handleSelectTemplateClick,
}: TemplateItemProps) => {
  const { id, title, content } = template;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
  };

  return (
    <div className="flex justify-between items-center px-2 h-full cursor-pointer">
      <div onClick={() => handleSelectTemplateClick(id)} className="w-60">
        <Text size="lg">{title}</Text>
      </div>
      <div onClick={copyToClipboard}>
        <HiOutlineClipboardCopy size={18} />
      </div>
    </div>
  );
};
