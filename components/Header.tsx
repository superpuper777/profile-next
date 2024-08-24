"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useProfileStore } from "@/store/useProfileStore";
import logo from "@/public/logo-wrapper.svg";
import ProfileAvatar from "./profile/ProfileAvatar";
import { useAuthStore } from "@/store/useAuthStore";

const Header = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { profile } = useProfileStore();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <header className="flex w-full justify-between items-center pt-3.75 pb-3.5 px-5 border-b border-strokes-secondary">
      <div className="flex items-center justify-center gap-5">
        <Image
          src={logo}
          alt="Logo"
          width={80}
          height={50}
          onClick={handleLogoClick}
          className="cursor-pointer"
        />
        <span className="paragraph hidden lg:block">
          Разрабатываем и запускаем <br /> сложные веб проекты
        </span>
      </div>
      <div>
        {profile && isAuthenticated ? (
          <div className="flex items-center gap-5 mr-[10px]">
            <span>{profile.name}</span>
            <ProfileAvatar
              name={profile.name}
              image={profile.image}
              size={50}
              className="w-12.5 h-12.5 rounded-full overflow-hidden"
              classNameForName="subtitle"
            />
          </div>
        ) : (
          <Link
            href="/login"
            className="py-1.75 px-8.25 mr-[10px] border cursor-pointer border-gray-200 rounded-1.25 flex items-center justify-center text-center btnText font-medium"
          >
            Войти
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
