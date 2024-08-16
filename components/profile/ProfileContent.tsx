import Image from "next/image";

import EditProfileModal from "./EditProfileModal";
import { ProfileDto } from "@/app/types/profile";
import editIcon from "@/public/images/profile/edit-icon.svg";
import logoutIcon from "@/public/images/profile/logout-icon.svg";

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
        <button
          type="button"
          className="flex items-center gap-[10px] px-[22px] py-[7px] btnText border"
          onClick={openModal}
        >
          <Image
            src={editIcon}
            alt="Иконка редактирования"
            width={25}
            height={25}
          />
          Редактировать
        </button>
      </div>
      <p className="paragraph mb-[60px]">{description}</p>
      <button
        type="button"
        className="flex items-center gap-[10px] px-[22px] py-[7px] btnText border"
      >
        <Image src={logoutIcon} alt="Иконка выхода" width={25} height={25} />
        Выйти
      </button>
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
