import React from "react";
import {
  FieldError,
  FieldValues,
  UseFormRegister,
  Path,
} from "react-hook-form";
import Image, { StaticImageData } from "next/image";
import { EyeIcon } from "./EyeIcon";

interface InputFieldProps<T extends FieldValues> {
  id: string;
  type: string;
  placeholder: string;
  icon: StaticImageData;
  secondIcon?: React.ReactNode;
  register: UseFormRegister<T>;
  name: Path<T>;
  pattern?: RegExp;
  error?: FieldError;
}

const InputField = <T extends FieldValues>({
  id,
  type,
  placeholder,
  icon,
  secondIcon,
  register,
  name,
  pattern,
  error,
}: InputFieldProps<T>) => {
  return (
    <>
      <div className="relative">
        <label
          htmlFor={id}
          className="absolute top-1/2 left-5 transform -translate-y-1/2 pointer-events-none leading-normal"
        >
          <Image src={icon} alt={`${id} icon`} width={25} height={25} />
        </label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(name, {
            required: `Требуется ${placeholder}`,
            pattern: pattern
              ? {
                  value: pattern,
                  message: "Неверный ввод",
                }
              : undefined,
          })}
          aria-invalid={!!error}
          aria-describedby={`${id}-error`}
          className="pl-12 py-[12.5px] border border-custom-gray bg-background-primary rounded-1.25 placeholder:text-custom-gray focus:border-custom-gray focus:ring-0 hover:border-custom-gray hover:ring-0 outline-none"
        />
        {secondIcon && (
          <span className="absolute right-5 cursor-pointer top-1/2 transform -translate-y-1/2">
            {secondIcon}
          </span>
        )}
      </div>
      <div>
        {error && (
          <p id={`${id}-error`} role="alert" className="text-red-500">
            {error.message}
          </p>
        )}
      </div>
    </>
  );
};

export default InputField;
