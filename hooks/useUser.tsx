import useSWR from "swr";
import { fetchUser } from "@/utils/fetcher";
import { ProfileDto } from "@/app/types/profile";
import { useProfileStore } from "@/store/useProfileStore";

export const useUser = (slug: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { setProfile } = useProfileStore();

  const { data, error } = useSWR<ProfileDto>(
    slug ? `${apiUrl}/api/user/${slug}` : null,
    fetchUser,
    {
      onSuccess: (data) => {
        setProfile(data);
      },
    }
  );

  return {
    user: data,
    error,
    isLoading: !data && !error,
  };
};
