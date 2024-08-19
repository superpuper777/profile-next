import React from "react";
import {
  FieldError,
  FieldValues,
  UseFormRegister,
  Path,
} from "react-hook-form";
import Image, { StaticImageData } from "next/image";

interface InputFieldProps<T extends FieldValues> {
  id: string;
  type: string;
  placeholder: string;
  icon?: StaticImageData;
  secondIcon?: React.ReactNode;
  register: UseFormRegister<T>;
  name: Path<T>;
  pattern?: RegExp;
  error?: FieldError;
  className?: string;
  labelPosition?: "top" | "inside";
  label?: string;
  rows?: number;
  disabled?: boolean;
  value?: string;
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
  className,
  label,
  labelPosition = "inside",
  rows,
  disabled = false,
  value,
}: InputFieldProps<T>) => {
  return (
    <>
      <div className="relative">
        {labelPosition === "top" && (
          <label
            htmlFor={id}
            className="block btnText font-medium text-custom-gray"
          >
            {label}
          </label>
        )}
        {icon && labelPosition === "inside" && (
          <label
            htmlFor={id}
            className="absolute top-1/2 left-5 transform -translate-y-1/2 pointer-events-none leading-normal"
          >
            <Image src={icon} alt={`${id} icon`} width={25} height={25} />
          </label>
        )}
        {rows ? (
          <textarea
            id={id}
            placeholder={placeholder}
            rows={rows}
            {...(!disabled &&
              register && {
                ...register(name, {
                  pattern: pattern
                    ? {
                        value: pattern,
                        message: "Неверный ввод",
                      }
                    : undefined,
                }),
              })}
            value={value}
            aria-invalid={!!error}
            aria-describedby={`${id}-error`}
            className={`py-2 px-3 border border-strokes-primary lg:h-38.5 xs:h-71 md:max-h-80 rounded-1.25 focus:outline-none resize-none ${className}`}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={labelPosition === "inside" ? placeholder : ""}
            {...(!disabled &&
              register && {
                ...register(name, {
                  required: `Требуется ${placeholder}`,
                  pattern: pattern
                    ? {
                        value: pattern,
                        message: "Неверный ввод",
                      }
                    : undefined,
                }),
              })}
            aria-invalid={!!error}
            aria-describedby={`${id}-error`}
            disabled={disabled}
            value={value}
            className={`${
              labelPosition === "inside" ? "pl-13.75" : "pl-5"
            } py-3.125 paragraph border border-custom-gray bg-background-primary rounded-1.25 placeholder:text-custom-gray focus:border-custom-gray focus:ring-0 hover:border-custom-gray hover:ring-0 outline-none ${className}`}
          />
        )}
        {secondIcon && labelPosition === "inside" && (
          <span className="absolute right-5 cursor-pointer top-1/2 transform -translate-y-1/2">
            {secondIcon}
          </span>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} role="alert" className="text-red-500">
          {error.message}
        </p>
      )}
    </>
  );
};

export default InputField;
