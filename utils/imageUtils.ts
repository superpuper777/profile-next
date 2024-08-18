import { ImageDto } from "./../app/types/image";

export const getImageSrc = (imageDto: ImageDto | null) => {
  if (imageDto && imageDto.url) {
    return imageDto.url.startsWith("http")
      ? imageDto.url
      : `https://frontend-test-api.yoldi.agency/${imageDto.url}`;
  }

  return "";
};
