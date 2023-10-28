import { UseFormRegisterReturn } from "react-hook-form";

type SearchInputFieldProps = React.HtmlHTMLAttributes<HTMLInputElement> & {
  registration: Partial<UseFormRegisterReturn>;
  placeholder?: string;
};

export const SearchInputField = ({
  placeholder = "Search template...",
  registration,
}: SearchInputFieldProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="bg-[#A2C6A1] bg-opacity-80 text-white placeholder-white placeholder-opacity-50 outline-none w-60 h-9 pl-3 rounded-sm"
      {...registration}
    />
  );
};
