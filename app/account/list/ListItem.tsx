import ProfileAvatar from "@/components/profile/ProfileAvatar";
import { ImageDto } from "@/app/types/image";

type ListItemProps = {
  name: string;
  email: string;
  image: ImageDto | null;
};

const ListItem = ({ name, email, image }: ListItemProps) => {
  return (
    <div className="py-2.5 border-b border-t border-strokes-secondary flex items-center justify-start">
      <ProfileAvatar
        name={name}
        image={image}
        size={50}
        className="w-12.5 h-12.5 rounded-full overflow-hidden mr-5"
        classNameForName="subtitle"
      />
      <div className="flex xl:items-center xl:flex-row xl:justify-between xl:w-w-minus-avatar xs:items-start xs:flex-col ">
        <span className="btnText font-semibold block lg:max-w-150 max-w-62.5 break-words">
          {name}
        </span>
        <span className="paragraph text-custom-gray block lg:max-w-150 max-w-62.5 break-words">
          {email}
        </span>
      </div>
    </div>
  );
};

export default ListItem;
