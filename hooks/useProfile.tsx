import useSWR from "swr";
import { fetchProfile, updateProfile } from "@/utils/fetcher";
import { ProfileDto } from "@/app/types/profile";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfileStore } from "@/store/useProfileStore";
import { useModalStore } from "@/store/useModalStore";

export const useProfile = () => {
  const { apiKey } = useAuthStore();
  const { setProfile } = useProfileStore();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { closeModal } = useModalStore();

  const { data, error, mutate } = useSWR<ProfileDto>(
    apiKey ? [`${apiUrl}/api/profile`, apiKey] : null,
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

  return {
    profile: data,
    error,
    isLoading: !data && !error,
    handleProfileUpdate,
  };
};
