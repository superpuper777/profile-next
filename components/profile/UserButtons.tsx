"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/app/context/AuthContext";
import IconButton from "../IconButton";

import editIcon from "@/public/images/profile/edit-icon.svg";
import logoutIcon from "@/public/images/profile/logout-icon.svg";

const LogoutButton: React.FC = () => {
  const { clearApiKey } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    clearApiKey();
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

const EditButton: React.FC<{ openModal: () => void }> = ({ openModal }) => {
  return (
    <IconButton
      iconSrc={editIcon}
      iconAlt="Иконка редактирования"
      onClick={openModal}
      text="Редактировать"
    />
  );
};

export { LogoutButton, EditButton };
