"use client";

import ProfileContent from "@/components/profile/ProfileContent";
import ProfileHeader from "@/components/profile/ProfileHeader";
import Spinner from "@/components/Spinner";

import { useProfile } from "@/hooks/useProfile";
import { useUser } from "@/hooks/useUser";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfileStore } from "@/store/useProfileStore";
import { fetchUser } from "@/utils/fetcher";
import useSWR from "swr";

const UserProfile = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { isAuthenticated } = useAuthStore();
  // const {
  //   profile,
  //   isLoading: isProfileLoading,
  //   handleProfileUpdate,
  // } = useProfile();
  // const { user, error, isLoading: isUserLoading } = useUser(slug);

  const { profile, isLoading, error, handleProfileUpdate } = useProfile(
    isAuthenticated ? undefined : slug
  );

  if (isLoading) return <Spinner />;
  if (error) return <div>Ошибка загрузки данных</div>;

  if (!profile) return <div>Ошибка загрузки данных</div>;
  console.log("1231231", profile);

  return (
    <div>
      <ProfileHeader />
      {/* <ProfileContent profile={user} /> */}
      <ProfileContent
        profile={profile}
        onUpdateProfile={isAuthenticated ? handleProfileUpdate : undefined}
      />
    </div>
  );
};

export default UserProfile;
