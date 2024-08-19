import Image from "next/image";

import ProfileAvatar from "./ProfileAvatar";
import { useProfileStore } from "@/store/useProfileStore";
import { getImageSrc } from "@/utils/imageUtils";

const ProfileHeader = () => {
  const { profile } = useProfileStore();

  if (!profile) {
    return <div>Загрузка...</div>;
  }
  const { cover, name, image } = profile;

  return (
    <div className="relative bg-background-secondary h-50">
      {cover ? (
        <div className="relative w-full h-full">
          <Image src={getImageSrc(cover)} alt="Banner" fill />
        </div>
      ) : (
        <div className="relative border border-strokes-secondary w-full h-full" />
      )}
      <div className="lg:px-60 md:px-32 xs:px-7.5">
        <ProfileAvatar
          name={name}
          image={image || undefined}
          size={100}
          className="absolute top-37.5 w-25 h-25 "
          classNameForName="text-4xl"
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
