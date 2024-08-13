import Image from "next/image";
import profileBanner from "@/public/images/profile/profile_banner.png";

const ProfileHeader = () => {
  const mockUser = {
    url: "https://frontend-test-api.yoldi.agency/api/image/src/a7a3455f-ee74-4ccf-b95a-da14e2590f4c",
    name: "Владислав",
  };

  return (
    <div className="relative bg-strokes-secondary h-[200px]">
      {profileBanner ? (
        <div className="relative w-full h-full">
          <Image
            src={profileBanner}
            alt="Banner"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : null}

      <div className="absolute top-[150px] left-[240px] rounded-full overflow-hidden bg-background-secondary">
        {mockUser.url ? (
          <Image
            src={mockUser.url}
            alt="Profile Picture"
            width={100}
            height={100}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProfileHeader;
