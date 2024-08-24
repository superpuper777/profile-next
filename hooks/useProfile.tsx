import useSWR from "swr";
import { fetchProfile, fetchUser, updateProfile } from "@/utils/fetcher";
import { ProfileDto } from "@/app/types/profile";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfileStore } from "@/store/useProfileStore";
import { useModalStore } from "@/store/useModalStore";

export const useProfile = (slug?: string) => {
  const { apiKey, isAuthenticated } = useAuthStore();
  const { setProfile, clearProfile } = useProfileStore();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { closeModal } = useModalStore();

  const shouldFetchProfile = isAuthenticated && apiKey;

  const key: string | [string, string] | null = slug
    ? `${apiUrl}/api/user/${slug}`
    : apiKey && isAuthenticated
    ? [`${apiUrl}/api/profile`, apiKey]
    : null;

  const fetcher = (url: string, apiKey?: string) => {
    if (apiKey) {
      return fetchProfile(url, apiKey);
    }
    return fetchUser(url);
  };

  const { data, error, mutate } = useSWR<ProfileDto>(
    key ? (key === `${apiUrl}/api/profile` ? [key, apiKey] : key) : null,
    (url: string, apiKey?: string) => fetcher(url, apiKey),
    {
      onSuccess: (data) => {
        setProfile(data);
      },
      onError: () => {
        clearProfile(); // Очищаем профиль в случае ошибки
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
