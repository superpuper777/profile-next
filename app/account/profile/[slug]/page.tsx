import UserProfile from "./UserProfile";

const ProfilePage = ({ params }: { params: { slug: string } }) => {
  return <UserProfile params={params} />;
};

export default ProfilePage;
