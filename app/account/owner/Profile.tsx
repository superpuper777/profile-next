"use client";
import axios from "axios";
import ProfileContent from "@/components/profile/ProfileContent";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import useSWR from "swr";
import { ProfileDto } from "@/app/types/profile";

const fetcher = async (url: string, apiKey: string): Promise<ProfileDto> => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Ошибка при получении данных"
      );
    } else {
      throw new Error("Ошибка при получении данных");
    }
  }
};

const Profile = () => {
  const { apiKey } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const { data, error, mutate } = useSWR<ProfileDto>(
    [`${apiUrl}/api/profile`, apiKey],
    ([url, key]) => {
      if (typeof key !== "string") {
        throw new Error("API ключ должен быть строкой");
      }
      return fetcher(url, key);
    }
  );

  const [isModalOpen, setModalOpen] = useState(false);

  if (error) return <div>Ошибка загрузки профиля</div>;
  if (!data) return <div>Загрузка...</div>;

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleProfileUpdate = async (updatedProfile: ProfileDto) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/api/profile`,
        updatedProfile,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
          },
        }
      );
      mutate(response.data, false);
      closeModal();
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
    }
  };

  return (
    <div>
      <ProfileHeader
        name={data?.name}
        images={{ image: data?.image, cover: data?.cover }}
      />
      <ProfileContent
        data={data}
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
        onUpdateProfile={handleProfileUpdate}
      />
    </div>
  );
};

export default Profile;
