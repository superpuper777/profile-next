import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "../form/InputField";
import EmailInput from "../form/EmailInput";
import { ProfileDto } from "@/app/types/profile";
import { useModalStore } from "@/store/useModalStore";
import { usePathname, useRouter } from "next/navigation";

type EditProfileModalProps = {
  data: ProfileDto;
  onUpdate: (updatedProfile: ProfileDto) => void;
};

type FormValues = {
  name: string;
  email: string;
  description: string;
  slug: string;
};

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  data,
  onUpdate,
}) => {
  const { isOpen, closeModal } = useModalStore();
  const router = useRouter();
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: data.name,
      email: data.email,
      description: data.description || "",
      slug: data.slug,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    reset({
      name: data.name,
      email: data.email,
      description: data.description || "",
    });
  }, [data, reset]);

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    setIsLoading(true);

    onUpdate({
      ...data,
      ...formData,
    });
    setIsLoading(false);
    closeModal();
  };

  const handleCloseModal = () => {
    closeModal();
    router.replace(pathname);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-150 max-h-150 w-full h-auto mx-auto">
        <h2 className="title mb-6.25 font-semibold">Редактировать профиль</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3.75"
        >
          <InputField
            id="name"
            type="text"
            name="name"
            placeholder="Имя"
            register={register}
            error={errors.name}
            className="w-full"
            labelPosition="top"
            label="Имя"
          />
          <EmailInput
            id="email"
            register={register}
            name="email"
            error={errors.email}
            emailValue={data.email}
          />
          <InputField
            id="description"
            type="text"
            name="description"
            placeholder=""
            register={register}
            error={errors.description}
            className="w-full"
            labelPosition="top"
            label="Описание"
            rows={4}
          />
          <div className="w-full flex items-center gap-2.5 mt-2.5">
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 border border-custom-gray bg-background-primary text-txt-color btnText text-center py-3 rounded-1.25"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-txt-color text-white btnText text-center py-3 rounded-1.25"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
