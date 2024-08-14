import { ImageDto } from "./image";

export interface ProfileDto {
  name: string;
  email: string;
  slug: string;
  description: string | null;
  image: ImageDto | null;
  cover: ImageDto | null;
}
