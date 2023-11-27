import { FcGoogle } from "react-icons/fc";

type GoogleSigninButtonProps = {
  onClick: () => void;
};

export const GoogleSigninButton = ({ onClick }: GoogleSigninButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-white text-gray-600 w-auto px-4 py-2 rounded-md flex items-center cursor-pointer text-center border border-gray-300 hover:border-gray-500 shadow-sm hover:shadow transition duration-200 ease-in-out focus:outline-none focus:ring focus:ring-gray-300"
    >
      <FcGoogle size={20} className="mr-2" />
      <span className="font-bold text-base">Sign in with Google</span>
    </button>
  );
};
