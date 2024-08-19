import EditProfileModal from "./EditProfileModal";
import { ProfileDto } from "@/app/types/profile";

import useIsGuest from "@/hooks/useIsGuest";
import { useProfileStore } from "@/store/useProfileStore";
import { EditButton, LogoutButton } from "./UserButtons";

type ProfileContentProps = {
  onUpdateProfile: (updatedProfile: ProfileDto) => void;
};

const ProfileContent: React.FC<ProfileContentProps> = ({ onUpdateProfile }) => {
  const { profile } = useProfileStore();
  const isGuest = useIsGuest();
  if (!profile) {
    return <div>Загрузка...</div>;
  }
  const { name, email, description } = profile;
  return (
    <div className="lg:px-60 md:px-32 xs:px-7.5 py-21.25 mb-[5%] bg-background-primary">
      <div className="flex lg:flex-row lg:items-start lg:justify-between xs:flex-col">
        <div className="lg:mb-7.5 xs:mb-2.5">
          <h1 className="title mb-2.5">{name}</h1>
          <span className="paragraph text-custom-gray">{email}</span>
        </div>
        {!isGuest && <EditButton className="xs:self-start" />}
      </div>
      <p className="paragraph mb-15 max-w-[600px] lg:mt-0 xs:mt-7.5">
        {description}
      </p>
      {!isGuest && <LogoutButton />}
      <EditProfileModal data={profile} onUpdate={onUpdateProfile} />
    </div>
  );
};

export default ProfileContent;
