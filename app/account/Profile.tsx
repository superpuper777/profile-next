"use client";

import ProfileContent from "@/components/profile/ProfileContent";
import ProfileHeader from "@/components/profile/ProfileHeader";
import Spinner from "@/components/Spinner";

import { useProfile } from "@/hooks/useProfile";

const Profile = () => {
  const { error, isLoading, handleProfileUpdate } = useProfile();

  if (error) return <div>Ошибка загрузки профиля</div>;
  if (isLoading) return <Spinner />;

  return (
    <div>
      <ProfileHeader />
      <ProfileContent onUpdateProfile={handleProfileUpdate} />
    </div>
  );
};

export default Profile;
