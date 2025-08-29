import React, { useEffect } from "react";
import { useForm, UseFormRegister } from "react-hook-form";

type FieldValues = {
  query: string;
};

type SearchFormContainerProps = {
  children: (register: UseFormRegister<FieldValues>) => React.ReactNode;
};

export const SearchFormContainer = ({ children }: SearchFormContainerProps) => {
  const { register, setFocus } = useForm<FieldValues>();

  useEffect(() => {
    setFocus("query");
  }, [setFocus]);

  return <div className="flex">{children(register)}</div>;
};
