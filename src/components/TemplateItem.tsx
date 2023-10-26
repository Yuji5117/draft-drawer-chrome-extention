import { HiOutlineClipboardCopy } from "react-icons/hi";

import { Text } from "./Text";

type TemplateItemProps = {
  title: string;
};

export const TemplateItem = ({ title }: TemplateItemProps) => {
  return (
    <div className="flex justify-between items-center px-2 h-full cursor-pointer">
      <div>
        <Text size="lg">{title}</Text>
      </div>
      <div>
        <HiOutlineClipboardCopy size={18} />
      </div>
    </div>
  );
};
