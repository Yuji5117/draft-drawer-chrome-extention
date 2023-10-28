import { useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";

import { SearchIcon } from "./SearchIcon";
import { SearchInputField } from "./SearchInputField";

import { Status } from "@/types";

type HeaderProps = {
  onChangeKeyword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeStatusClick: (status: Status) => void;
};

export const Header = ({
  onChangeKeyword,
  handleChangeStatusClick,
}: HeaderProps) => {
  const { register } = useForm();
  return (
    <div className="bg-primary h-12 text-sm">
      <div className="h-full flex justify-between items-center mx-6">
        <div className="flex">
          <SearchIcon />
          <SearchInputField
            registration={register("query", {
              onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                onChangeKeyword(event),
            })}
          />
        </div>
        {/* Add Button */}
        <div
          onClick={() => handleChangeStatusClick("ADD")}
          role="button"
          className="flex items-center space-x-1"
        >
          <IoIosAddCircleOutline size={15} color="white" />
          <span className="text-white">New Template</span>
        </div>
      </div>
    </div>
  );
};
