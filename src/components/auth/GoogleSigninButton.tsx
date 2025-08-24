import { FcGoogle } from "react-icons/fc";

type GoogleSigninButtonProps = {
  onClick: () => void;
  isLoading?: boolean;
};

export const GoogleSigninButton = ({ onClick, isLoading = false }: GoogleSigninButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`w-auto px-4 py-2 rounded-md flex items-center text-center border transition duration-200 ease-in-out focus:outline-none focus:ring ${
        isLoading
          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
          : "bg-white text-gray-600 border-gray-300 hover:border-gray-500 shadow-sm hover:shadow cursor-pointer focus:ring-gray-300"
      }`}
    >
      <FcGoogle size={20} className="mr-2" />
      <span className="font-bold text-base">
        {isLoading ? "Signing in..." : "Sign in with Google"}
      </span>
    </button>
  );
};
