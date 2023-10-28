import React from "react";
import { useForm, UseFormRegister } from "react-hook-form";

type FieldValues = {
  query: string;
};

type SearchFormContainerProps = {
  children: (register: UseFormRegister<FieldValues>) => React.ReactNode;
};

export const SearchFormContainer = ({ children }: SearchFormContainerProps) => {
  const { register } = useForm<FieldValues>();

  return <div className="flex">{children(register)}</div>;
};
