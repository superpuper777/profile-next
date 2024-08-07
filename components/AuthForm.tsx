"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

import emailIcon from "@/public/email-icon.svg";
import userIcon from "@/public/name-user-icon.svg";
import lockIcon from "@/public/pas-lock-icon.svg";
import eyeIcon from "@/public/pas-eye-icon.svg";

type FormValues = {
  email: string;
  password: string;
  name?: string;
};

type AuthFormProps = {
  type: "login" | "register";
};

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    reset,
  } = useForm<FormValues>({ mode: "onChange" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("URL API не определен");
    return <p>Ошибка: URL-адрес API настроен неправильно.</p>;
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const endpoint =
        type === "login" ? "/api/auth/login" : "/api/auth/sign-up";
      const response = await axios.post(`${apiUrl}${endpoint}`, data);

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      console.log("Login successful!");
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen-minus-header-footer">
      <div className="flex justify-center items-center flex-col bg-background-primary max-w-100 p-7.5 rounded-1.25 border border-strokes-secondady">
        <h1 className="title mb-6.25">
          {type === "login"
            ? "Вход в Yoldi Agency"
            : "Регистрация в Yoldi Agency"}
        </h1>
        <form
          className="flex flex-col gap-3.75"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative">
            <label
              htmlFor="email"
              className="absolute top-1/2 left-5 transform -translate-y-1/2 pointer-events-none"
            >
              <Image src={emailIcon} alt="email icon" width={25} height={25} />
            </label>
            <input
              id="email"
              type="email"
              placeholder="E-mail"
              {...register("email", {
                required: "Требуется адрес электронной почты",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby="email-error"
              className="pl-12 py-[12.5px] border border-custom-gray bg-background-primary rounded-1.25"
            />
            {errors.email && (
              <p id="email-error" role="alert" className="text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          {type === "register" && (
            <div className="relative">
              <label
                htmlFor="name"
                className="absolute top-1/2 left-5 transform -translate-y-1/2 pointer-events-none"
              >
                <Image src={userIcon} alt="email icon" width={25} height={25} />
              </label>
              <input
                id="name"
                type="text"
                placeholder="Имя"
                {...register("name", { required: "Name is required" })}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby="name-error"
                className="pl-12 py-[12.5px] border border-custom-gray bg-background-primary rounded-1.25"
              />
              {errors.name && (
                <p id="name-error" role="alert" className="text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}
          <div className="relative">
            <label
              htmlFor="password"
              className="absolute top-1/2 left-5 transform -translate-y-1/2 pointer-events-none"
            >
              <Image src={lockIcon} alt="email icon" width={25} height={25} />
            </label>
            <input
              id="password"
              type="password"
              placeholder="Пароль"
              {...register("password", {
                required: "Необходим пароль",
                minLength: {
                  value: 4,
                  message: "Пароль должен содержать не менее 4 символов.",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby="password-error"
              className="pl-12 py-[12.5px] border border-custom-gray bg-background-primary rounded-1.25"
            />
            {errors.password && (
              <p id="password-error" role="alert" className="text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="mb-1.25 py-3 bg-txt-color disabled:bg-strokes-primary rounded-1.25 text-white btnText"
          >
            {isSubmitting
              ? "Отправка..."
              : type === "login"
              ? "Войти"
              : "Создать аккаунт"}
          </button>
          {errorMessage && (
            <p role="alert" className="text-red-500">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
