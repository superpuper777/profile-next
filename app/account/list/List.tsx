"use client";
import useSWR from "swr";
import { ProfileDto } from "@/app/types/profile";
import { fetchUsers } from "@/utils/fetcher";
import ListItem from "./ListItem";
import { useProfile } from "@/hooks/useProfile";
import Spinner from "@/components/Spinner";
import Link from "next/link";

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
  if (!data) return <Spinner />;

  return (
    <div className="xl:px-60 lg:px-16 py-12.5  xs:px-5 bg-background-primary">
      <h1 className="title md:font-medium xs:font-normal mb-7.5">
        Список аккаунтов
      </h1>
      <ul className="xl:mb-25 xs:mb-16.5">
        {data.map((user, index) => (
          <li
            key={user.slug}
            className={`${
              index === 0 ? "border-t-[0.5px] border-strokes-secondary" : ""
            }`}
          >
            <Link href={`/account/profile/${user.slug}`}>
              <ListItem
                name={user.name}
                email={user.email}
                image={user.image}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
