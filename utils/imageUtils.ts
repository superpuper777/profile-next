import { ImageDto } from "./../app/types/image";

export const getImageSrc = (imageDto: ImageDto | null) => {
  return imageDto ? imageDto.url : "";
};
