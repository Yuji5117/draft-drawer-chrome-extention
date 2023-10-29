import { IoIosAddCircleOutline } from "react-icons/io";

import { SearchFormContainer } from "./SearchForm";
import { SearchIcon } from "./SearchForm/SearchIcon";
import { SearchInputField } from "./SearchForm/SearchInputField";
import { Text } from "./ui/Text";

import { Status } from "@/types";

type HeaderProps = {
  onChangeKeyword: (query: string) => void;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  setSectedId: (value: React.SetStateAction<string>) => void;
};

export const Header = ({
  onChangeKeyword,
  setStatus,
  setSectedId,
}: HeaderProps) => {
  const handleChangeStatusToAdd = (status: Status) => {
    setSectedId("");
    setStatus(status);
  };

  return (
    <div className="bg-primary h-12 text-sm">
      <div className="h-full flex justify-between items-center mx-6">
        <SearchFormContainer>
          {(register) => (
            <>
              <SearchIcon />
              <SearchInputField
                registration={register("query", {
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                    onChangeKeyword(event.target.value),
                })}
              />
            </>
          )}
        </SearchFormContainer>
        <div
          onClick={() => handleChangeStatusToAdd("ADD")}
          role="button"
          className="flex items-center space-x-1"
        >
          <IoIosAddCircleOutline size={15} color="white" />
          <Text size="sm" variant="white">
            New Template
          </Text>
        </div>
      </div>
    </div>
  );
};
