import EditProfileModal from "./EditProfileModal";
import { ProfileDto } from "@/app/types/profile";

import { useProfileStore } from "@/store/useProfileStore";
import { EditButton, LogoutButton } from "./UserButtons";
import { useAuthStore } from "@/store/useAuthStore";

type ProfileContentProps = {
  profile: ProfileDto;
  onUpdateProfile?: (updatedProfile: ProfileDto) => void;
};

const ProfileContent: React.FC<ProfileContentProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const { isAuthenticated } = useAuthStore();
  // const { profile } = useProfileStore();
  console.log(profile);

  const { name, email, description } = profile;
  return (
    <div className="lg:px-60 md:px-32 xs:px-7.5 py-21.25 mb-[5%] bg-background-primary">
      <div className="flex lg:flex-row lg:items-start lg:justify-between xs:flex-col">
        <div className="lg:mb-7.5 xs:mb-2.5">
          <h1 className="title font-semibold mb-2.5">{name}</h1>
          <span className="paragraph text-custom-gray">{email}</span>
        </div>
        {isAuthenticated && <EditButton className="xs:self-start" />}
      </div>
      <p
        className={`paragraph mb-15 max-w-[600px] lg:mt-0 xs:mt-7.5 ${
          !isAuthenticated ? "xs:mt-[20px]" : ""
        }`}
      >
        {description}
      </p>
      {isAuthenticated && <LogoutButton />}
      <EditProfileModal
        data={profile}
        onUpdate={!isAuthenticated ? undefined : onUpdateProfile}
      />
    </div>
  );
};

export default ProfileContent;
