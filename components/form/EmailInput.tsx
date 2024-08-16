import React from "react";
import {
  UseFormRegister,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import InputField from "./InputField";

type EmailInputProps<T extends FieldValues> = {
  id: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: FieldError;
  className?: string;
  emailValue?: string;
};

const EmailInput = <T extends FieldValues>({
  id,
  register,
  name,
  error,
  className,
  emailValue = "",
}: EmailInputProps<T>) => {
  const splitEmail = (email: string) => {
    const [localPart, domainPart] = email.split("@");
    return {
      localPart: localPart || "",
      domainPart: domainPart ? `@${domainPart}` : "",
    };
  };

  const { localPart, domainPart } = splitEmail(emailValue);
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-medium text-custom-gray btnText mb-1.25 gap-0"
      >
        Адрес профиля
      </label>
      <div className={`flex items-center border  rounded-1.25 ${className}`}>
        <div className="bg-background-secondary py-3.5 px-5 rounded-l-1.25 border-y-0 border-l-0 border-r h-full text-custom-gray paragraph border">
          {domainPart}
        </div>

        <InputField
          id={id}
          type="text"
          placeholder=""
          register={register}
          name={name}
          error={error}
          className="border-none"
          labelPosition="top"
          label=""
          disabled={true}
          value={localPart}
        />
      </div>
    </div>
  );
};

export default EmailInput;
