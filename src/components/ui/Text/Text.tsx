import React from "react";

const variants = {
  default: "text-black",
  white: "text-white",
};

const sizes = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
};

type TextProps = {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

export const Text = ({
  children,
  variant = "default",
  size = "md",
  className = "",
}: TextProps) => {
  return (
    <p className={`${variants[variant]} ${[sizes[size]]} ${className}`}>
      {children}
    </p>
  );
};
