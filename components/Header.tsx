import Image from "next/image";

import logo from "@/public/logo-wrapper.svg";
import Link from "next/link";

const Header = () => {
  const isAuth = false;
  const mockUser = {
    url: "https://frontend-test-api.yoldi.agency/api/image/src/a7a3455f-ee74-4ccf-b95a-da14e2590f4c",
    name: "Владислав",
  };
  return (
    <header className="flex w-full justify-between items-center py-3.75 px-5">
      <div className="flex items-center gap-5">
        <Image src={logo} alt="Logo" width={80} height={50} />
        <span className="paragraph">
          Разрабатываем и запускаем <br /> сложные веб проекты
        </span>
      </div>
      <div>
        {isAuth ? (
          <div className="flex items-center gap-5">
            <span>{mockUser.name}</span>
            <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
              <Image
                src={mockUser.url}
                alt="Изображение профиля"
                width={50}
                height={50}
                className="object-cover"
              />
            </div>
          </div>
        ) : (
          <Link
            href="/login"
            className="py-0.75 px-8.25 border cursor-pointer border-gray-200 rounded-1.25 flex items-center justify-center text-center btnText font-medium"
          >
            Войти
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
