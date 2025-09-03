import { UseFormRegisterReturn } from "react-hook-form";

type InputFieldProps = React.HtmlHTMLAttributes<HTMLInputElement> & {
  registration: Partial<UseFormRegisterReturn>;
};

export const InputField = ({ registration, ...props }: InputFieldProps) => {
  return (
    <input
      type="text"
      className="border rounded-sm w-full px-3 py-1 focus:outline-none "
      {...registration}
      {...props}
    />
  );
};
