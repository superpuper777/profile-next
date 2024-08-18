import ProfileAvatar from "@/components/profile/ProfileAvatar";
import { ImageDto } from "@/app/types/image";

type ListItemProps = {
  name: string;
  email: string;
  image: ImageDto | null;
};

const ListItem = ({ name, email, image }: ListItemProps) => {
  return (
    <div className="py-2.5 border-b border-t border-strokes-secondary flex items-center justify-between ">
      <div className="flex items-center justify-start gap-5">
        <ProfileAvatar
          name={name}
          image={image}
          size={50}
          className="w-12.5 h-12.5 rounded-full overflow-hidden"
          classNameForName="subtitle"
        />
        <span className="paragraph">{name}</span>
      </div>
      <span className="paragraph text-custom-gray">{email}</span>
    </div>
  );
};

export default ListItem;
