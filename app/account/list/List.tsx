"use client";
import useSWR from "swr";

import { ProfileDto } from "@/app/types/profile";
import { fetchUsers } from "@/utils/fetcher";
import ListItem from "./ListItem";
import { useProfile } from "@/hooks/useProfile";

const List = () => {
  const { profile } = useProfile();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data, error } = useSWR<Array<ProfileDto>>(
    `${apiUrl}/api/user`,
    fetchUsers,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  if (error) return <div>Ошибка загрузки профиля</div>;
  if (!data) return <div>Загрузка...</div>;
  return (
    <div className="xl:px-60 lg:px-16 xl:py-12.5 xs:px-5 bg-background-primary">
      <h1 className="title mb-7.5 font-semibold">Список аккаунтов</h1>
      <ul className="xl:mb-25 xs:mb-16.5">
        {data.map((user, index) => (
          <li
            key={user.slug}
            className={`${
              index === 0 ? "border-t-[0.5px] border-strokes-secondary" : ""
            }`}
          >
            <ListItem name={user.name} email={user.email} image={user.image} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
