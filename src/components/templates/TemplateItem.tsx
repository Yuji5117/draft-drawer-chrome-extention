import { HiOutlineClipboardCopy } from "react-icons/hi";

import { Text } from "../ui/Text";

import { Status, Template } from "@/types";

type TemplateItemProps = {
  template: Template;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  setSectedId: (value: React.SetStateAction<string>) => void;
};

export const TemplateItem = ({
  template,
  setStatus,
  setSectedId,
}: TemplateItemProps) => {
  const { id, title, content } = template;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
  };

  const handleSelectTemplateClick = (id: string) => {
    setSectedId(id);
    setStatus("READ");
  };

  return (
    <div
      onClick={() => handleSelectTemplateClick(id)}
      className="flex justify-between items-center px-2 h-full cursor-pointer"
    >
      <Text size="lg">{title}</Text>
      <div onClick={copyToClipboard} className="hover:opacity-50">
        <HiOutlineClipboardCopy size={18} />
      </div>
    </div>
  );
};
