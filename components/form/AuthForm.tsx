"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

import emailIcon from "@/public/email-icon.svg";
import userIcon from "@/public/name-user-icon.svg";
import lockIcon from "@/public/pas-lock-icon.svg";
import InputField from "./InputField";
import { EyeIcon } from "./EyeIcon";

export type FormValues = {
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
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [hiddenPassword, setHiddenPassword] = useState(false);
  const hidePassword = () => setHiddenPassword((prev) => !prev);

  if (!apiUrl) {
    console.error("URL API не определен");
    return <p>Ошибка: URL-адрес API настроен неправильно.</p>;
  }

  const handleError = (error: any) => {
    const message =
      error.response?.data?.message || "Произошла ошибка. Попробуйте снова.";
    setError("root", { type: "manual", message });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const endpoint =
        type === "login" ? "/api/auth/login" : "/api/auth/sign-up";
      const response = await axios.post(`${apiUrl}${endpoint}`, data);

      if (response.data.error) {
        throw new Error(response.data.error);
      }
      const apiKey = response.data.value;

      localStorage.setItem("api_key", apiKey);

      console.log("Login successful!");
      router.push("/account/owner");
      reset();
    } catch (error: any) {
      handleError(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen-minus-header-footer">
      <div className="flex justify-center items-center flex-col bg-background-primary max-w-100 w-full p-7.5 rounded-1.25 border border-strokes-secondady">
        <h1 className="title mb-6.25">
          {type === "login"
            ? "Вход в Yoldi Agency"
            : "Регистрация в Yoldi Agency"}
        </h1>
        <form
          className="flex flex-col gap-3.75"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            id="email"
            type="email"
            name="email"
            placeholder="E-mail"
            icon={emailIcon}
            register={register}
            error={errors.email}
            pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
          />
          {type === "register" && (
            <InputField
              id="name"
              type="text"
              name="name"
              placeholder="Имя"
              icon={userIcon}
              register={register}
              error={errors.name}
            />
          )}
          <InputField
            id="password"
            type={hiddenPassword ? "text" : "password"}
            name="password"
            placeholder="Пароль"
            icon={lockIcon}
            register={register}
            error={errors.password}
            secondIcon={
              <button
                type="button"
                onClick={hidePassword}
                aria-label="Переключить видимость пароля"
                className="flex items-center justify-center"
              >
                <EyeIcon isValid={isValid} />
              </button>
            }
          />
          {errors.root && (
            <p role="alert" className="text-red-500">
              {errors.root.message}
            </p>
          )}
          <button
            type="submit"
            disabled={!isValid}
            className="mb-1.25 py-3 bg-txt-color disabled:bg-strokes-primary rounded-1.25 text-white btnText"
          >
            {type === "login" ? "Войти" : "Создать аккаунт"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
