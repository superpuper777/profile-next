"use client";
import useSWR from "swr";

import { ProfileDto } from "@/app/types/profile";
import { fetchUsers } from "@/utils/fetcher";
import ListItem from "./ListItem";

const List = () => {
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
    <div className="px-60 py-12.5 bg-background-primary">
      <h1 className="title mb-7.5 font-semibold">Список аккаунтов</h1>
      <ul>
        {data.map((user) => (
          <li key={user.slug}>
            <ListItem name={user.name} email={user.email} image={user.image} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
