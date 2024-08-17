"use client";

import { useRouter, usePathname } from "next/navigation";

import { useModalStore } from "@/store/useModalStore";
import { useAuthStore } from "@/store/useAuthStore";

import IconButton from "../IconButton";
import editIcon from "@/public/images/profile/edit-icon.svg";
import logoutIcon from "@/public/images/profile/logout-icon.svg";
import { useProfileStore } from "@/store/useProfileStore";

const LogoutButton = () => {
  const { clearApiKey } = useAuthStore();
  const { clearProfile } = useProfileStore();
  const router = useRouter();

  const handleLogout = () => {
    clearApiKey();
    clearProfile();
    router.push("/login");
  };

  return (
    <IconButton
      iconSrc={logoutIcon}
      iconAlt="Иконка выхода"
      onClick={handleLogout}
      text="Выйти"
      className="btn"
    />
  );
};

const EditButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { openModal } = useModalStore();

  const handleEditClick = () => {
    openModal();
    router.push(`${pathname}?edit=true`);
  };

  return (
    <IconButton
      iconSrc={editIcon}
      iconAlt="Иконка редактирования"
      onClick={handleEditClick}
      text="Редактировать"
    />
  );
};

export { LogoutButton, EditButton };
