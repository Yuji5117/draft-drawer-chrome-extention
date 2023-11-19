import React from "react";

type TemplateItemListProps = {
  children: React.ReactNode;
};
export const TemplateItemList = ({ children }: TemplateItemListProps) => {
  return <ul className="mr-2">{children}</ul>;
};
