import EditProfileModal from "./EditProfileModal";
import { ProfileDto } from "@/app/types/profile";

import { EditButton, LogoutButton } from "./UserButtons";
import { useProfileStore } from "@/store/useProfileStore";

type ProfileContentProps = {
  onUpdateProfile: (updatedProfile: ProfileDto) => void;
};

const ProfileContent: React.FC<ProfileContentProps> = ({ onUpdateProfile }) => {
  const { profile } = useProfileStore();
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
        <EditButton />
      </div>
      <p className="paragraph mb-15">{description}</p>
      <LogoutButton />
      <EditProfileModal data={profile} onUpdate={onUpdateProfile} />
    </div>
  );
};

export default ProfileContent;
