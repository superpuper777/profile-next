import Image from "next/image";
import { ProfileDto } from "@/app/types/profile";
import { ImageDto } from "@/app/types/image";

type ProfileHeaderProps = {
  name: ProfileDto["name"];
  images: {
    image: ProfileDto["image"];
    cover: ProfileDto["cover"];
  };
};

const ProfileHeader = ({ name, images }: ProfileHeaderProps) => {
  const { image, cover } = images;

  const getInitials = (name?: string) => {
    if (!name) return "";
    const names = name.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.toUpperCase();
  };
  const getImageSrc = (imageDto: ImageDto | null) => {
    return imageDto ? imageDto.url : "";
  };

  return (
    <div className="relative bg-background-secondary h-[200px]">
      {cover ? (
        <div className="relative w-full h-full">
          <Image src={getImageSrc(cover)} alt="Banner" fill />
        </div>
      ) : (
        <div className="relative border border-strokes-secondary w-full h-full" />
      )}

      <div
        className={`absolute top-[150px] left-[240px] rounded-full overflow-hidden bg-background-secondary ${!image ? "border border-strokes-secondary" : ""} flex items-center justify-center w-[100px] h-[100px]`}
      >
        {image ? (
          <Image
            src={getImageSrc(image)}
            alt="Profile Picture"
            width={100}
            height={100}
          />
        ) : (
          <div className="text-txt-color font-semibold flex items-center justify-center w-full h-full text-4xl">
            {getInitials(name)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
