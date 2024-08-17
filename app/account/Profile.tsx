"use client";
import axios from "axios";
import useSWR from "swr";

import { useModalStore } from "@/store/useModalStore";

import ProfileContent from "@/components/profile/ProfileContent";
import ProfileHeader from "@/components/profile/ProfileHeader";

import { ProfileDto } from "@/app/types/profile";
import { useAuthStore } from "@/store/useAuthStore";
import { fetchProfile, updateProfile } from "@/utils/fetcher";
import { useProfileStore } from "@/store/useProfileStore";

const Profile = () => {
  const { apiKey } = useAuthStore();
  const { setProfile } = useProfileStore();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { closeModal } = useModalStore();

  const { data, error, mutate } = useSWR<ProfileDto>(
    [`${apiUrl}/api/profile`, apiKey],
    ([url, key]) => {
      if (typeof key !== "string") {
        throw new Error("API ключ должен быть строкой");
      }
      return fetchProfile(url, key);
    },
    {
      onSuccess: (data) => {
        setProfile(data);
      },
    }
  );

  if (error) return <div>Ошибка загрузки профиля</div>;
  if (!data) return <div>Загрузка...</div>;

  const handleProfileUpdate = async (updatedProfile: ProfileDto) => {
    if (!apiKey) {
      throw new Error("API ключ должен быть строкой");
    }
    try {
      const updatedData = await updateProfile(
        `${apiUrl}/api/profile`,
        updatedProfile,
        apiKey
      );
      setProfile(updatedData);
      mutate(updatedData, false);
      closeModal();
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
    }
  };

  return (
    <div>
      <ProfileHeader />
      <ProfileContent onUpdateProfile={handleProfileUpdate} />
    </div>
  );
};

export default Profile;
