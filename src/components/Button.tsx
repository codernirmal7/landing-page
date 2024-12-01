import React from "react";

type ButtonProps = {
  title: any;
  id: string;
  rightIcon?: any;
  leftIcon?: any;
  containerClass: string;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  id,
  rightIcon,
  leftIcon,
  containerClass,
}) => {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black hover:scale-110 transition-all gap-3 ${containerClass}`}
    >
      {leftIcon}
      {title}
      {rightIcon}
    </button>
  );
};
