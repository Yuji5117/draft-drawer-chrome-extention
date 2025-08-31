import { HiOutlineClipboardCopy } from "react-icons/hi";

import { Text } from "../ui/Text";

import { Status, Template } from "@/types";

type TemplateItemProps = {
  template: Template;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  setSectedId: (value: React.SetStateAction<string>) => void;
  copyButtonRef?: (el: HTMLButtonElement | null) => void;
  onCopyButtonFocus: () => void;
  copyTabIndex: number;
};

export const TemplateItem = ({
  template,
  setStatus,
  setSectedId,
  copyButtonRef,
  onCopyButtonFocus,
  copyTabIndex,
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
      className="flex justify-between items-center pr-3 h-full cursor-pointer"
    >
      <Text size="lg">{title}</Text>
      <button
        ref={copyButtonRef}
        onClick={async (e) => {
          e.stopPropagation();
          await copyToClipboard();
          window.close();
        }}
        onFocus={onCopyButtonFocus}
        tabIndex={copyTabIndex}
        className="hover:opacity-50"
      >
        <HiOutlineClipboardCopy size={18} />
      </button>
    </div>
  );
};
