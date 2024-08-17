import Image from "next/image";

import ProfileAvatar from "./ProfileAvatar";
import { useProfileStore } from "@/store/useProfileStore";
import { getImageSrc } from "@/utils/imageUtils";

const ProfileHeader = () => {
  const { profile } = useProfileStore();

  if (!profile) {
    return <div>Загрузка...</div>;
  }
  const { cover } = profile;

  return (
    <div className="relative bg-background-secondary h-50">
      {cover ? (
        <div className="relative w-full h-full">
          <Image src={getImageSrc(cover)} alt="Banner" fill />
        </div>
      ) : (
        <div className="relative border border-strokes-secondary w-full h-full" />
      )}

      <ProfileAvatar
        size={100}
        className="absolute top-37.5 left-60  w-25 h-25 "
        classNameForName="text-4xl"
      />
    </div>
  );
};

export default ProfileHeader;
