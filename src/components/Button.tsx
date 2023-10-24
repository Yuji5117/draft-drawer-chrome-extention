import React from "react";

const variants = {
  primary: "bg-primary text-white",
  danger: "border border-red text-red",
};

const sizes = {
  sm: "py-1 px-4 text-sm",
  md: "py-2 px-6 text-md",
  lg: "py-3 px-8 text-lg",
};

type ButtonProps = React.HtmlHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`rounded-md hover:opacity-80 ${variants[variant]} ${sizes[size]}}`}
      {...props}
    >
      {children}
    </button>
  );
};
