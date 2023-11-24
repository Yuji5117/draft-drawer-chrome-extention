import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { getAllDocs } from "@/libs/firebase";
import { AuthContext } from "@/store/context/auth";
import { Template, User } from "@/types";

export const getTemplates = async (userId: string): Promise<Template[]> => {
  return await getAllDocs(userId, "templates");
};

export const useTemplates = () => {
  const user = useContext(AuthContext) as User;
  return useQuery({
    queryKey: ["templates"],
    queryFn: () => getTemplates(user?.id),
  });
};
