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
    <div className="px-60 py-21.25 bg-background-primary">
      <div className="flex items-start justify-between">
        <div className="mb-7.5">
          <h1 className="title mb-2.5">{name}</h1>
          <span className="paragraph text-custom-gray">{email}</span>
        </div>
        {!isGuest && <EditButton />}
      </div>
      <p className="paragraph mb-15">{description}</p>
      {!isGuest && <LogoutButton />}
      <EditProfileModal data={profile} onUpdate={onUpdateProfile} />
    </div>
  );
};

export default ProfileContent;
