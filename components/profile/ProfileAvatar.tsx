"use client";

import Image from "next/image";
import { getImageSrc } from "@/utils/imageUtils";
import { ImageDto } from "@/app/types/image";

type AvatarProps = {
  size?: number;
  className?: string;
  classNameForName?: string;
  name?: string;
  image?: ImageDto | null;
};

const ProfileAvatar: React.FC<AvatarProps> = ({
  size = 50,
  className = "",
  classNameForName = "",
  name,
  image,
}) => {
  const getInitials = (name?: string) => {
    if (!name) return "";
    const names = name.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.toUpperCase();
  };

  const defaultClassNames = `rounded-full overflow-hidden bg-background-secondary ${
    !image ? "border border-strokes-secondary" : ""
  } flex items-center justify-center ${className} w-[${size}px] h-[${size}px]`;

  return (
    <div className={defaultClassNames}>
      {image ? (
        <Image
          src={getImageSrc(image)}
          alt="Profile Picture"
          width={size}
          height={size}
          className="object-cover"
        />
      ) : (
        <div
          className={`text-txt-color flex items-center justify-center w-full h-full ${classNameForName}`}
        >
          {getInitials(name)}
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
