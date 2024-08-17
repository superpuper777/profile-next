import EditProfileModal from "./EditProfileModal";
import { ProfileDto } from "@/app/types/profile";

import { EditButton, LogoutButton } from "./UserButtons";

type ProfileContentProps = {
  data: ProfileDto;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  onUpdateProfile: (updatedProfile: ProfileDto) => void;
};

const ProfileContent: React.FC<ProfileContentProps> = ({
  data,
  isModalOpen,
  openModal,
  closeModal,
  onUpdateProfile,
}) => {
  const { name, email, description } = data;
  return (
    <div className="px-[240px] py-[85px] bg-background-primary">
      <div className="flex items-start justify-between">
        <div className="mb-[30px]">
          <h1 className="title mb-[10px]">{name}</h1>
          <span className="paragraph text-custom-gray">{email}</span>
        </div>
        <EditButton openModal={openModal} />
      </div>
      <p className="paragraph mb-[60px]">{description}</p>
      <LogoutButton />
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={data}
        onUpdate={onUpdateProfile}
      />
    </div>
  );
};

export default ProfileContent;
