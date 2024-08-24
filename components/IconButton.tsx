import React from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";

export interface ButtonProps {
  iconSrc: StaticImageData;
  iconAlt: string;
  onClick?: () => void;
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const IconButton: React.FC<ButtonProps> = ({
  iconSrc,
  iconAlt,
  onClick,
  text,
  className,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center gap-[10px] px-[22.1px] py-[6.1px] btnText border ${className}`}
    >
      <Image src={iconSrc} alt={iconAlt} width={25} height={25} />
      {text}
    </button>
  );
};

export default IconButton;
