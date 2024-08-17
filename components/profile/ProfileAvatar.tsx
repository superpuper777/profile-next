"use client";

import Image from "next/image";
import { useProfileStore } from "@/store/useProfileStore";
import { getImageSrc } from "@/utils/imageUtils";

interface AvatarProps {
  size?: number;
  className?: string;
  classNameForName?: string;
}

const ProfileAvatar: React.FC<AvatarProps> = ({
  size = 50,
  className = "",
  classNameForName = "",
}) => {
  const { profile } = useProfileStore();

  if (!profile) return <div>Загрузка...</div>;
  const { name, image } = profile;

  console.log(image);

  const getInitials = (name?: string) => {
    if (!name) return "";
    const names = name.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.toUpperCase();
  };

  const avatarSizeClass = `${size}px`;
  const defaultClassNames = `rounded-full overflow-hidden bg-background-secondary ${
    !image ? "border border-strokes-secondary" : ""
  } flex items-center justify-center ${className}`;

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
          className={`text-txt-color font-semibold flex items-center justify-center w-full h-full ${classNameForName}`}
        >
          {getInitials(name)}
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
