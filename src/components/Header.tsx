import { useForm } from "react-hook-form";

import { SearchIcon } from "./SearchIcon";
import { SearchInputField } from "./SearchInputField";

export const Header = () => {
  const { register } = useForm();
  return (
    <div className="bg-primary h-12 text-sm">
      <div className="h-full flex justify-between items-center mx-6">
        <div className="flex">
          <SearchIcon />
          <SearchInputField registration={register("query")} />
        </div>
        {/* Add Button */}
        <div>New Template</div>
      </div>
    </div>
  );
};
