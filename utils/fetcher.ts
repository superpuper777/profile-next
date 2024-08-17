import axios from "axios";
import { ProfileDto } from "@/app/types/profile";

export const fetchProfile = async (
  url: string,
  apiKey: string
): Promise<ProfileDto> => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Ошибка при получении данных"
      );
    } else {
      throw new Error("Ошибка при получении данных");
    }
  }
};

export const updateProfile = async (
  url: string,
  profile: ProfileDto,
  apiKey: string
): Promise<ProfileDto> => {
  try {
    const response = await axios.patch(url, profile, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Ошибка при обновлении профиля");
  }
};
