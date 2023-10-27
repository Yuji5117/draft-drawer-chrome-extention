import { HiOutlineClipboardCopy } from "react-icons/hi";

import { Text } from "./Text";

type TemplateItemProps = {
  id: string;
  title: string;
  handleSelectTemplateClick: (id: string) => void;
};

export const TemplateItem = ({
  id,
  title,
  handleSelectTemplateClick,
}: TemplateItemProps) => {
  return (
    <div className="flex justify-between items-center px-2 h-full cursor-pointer">
      <div onClick={() => handleSelectTemplateClick(id)} className="w-60">
        <Text size="lg">{title}</Text>
      </div>
      <div>
        <HiOutlineClipboardCopy size={18} />
      </div>
    </div>
  );
};
