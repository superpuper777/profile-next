"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

import emailIcon from "@/public/images/form/email-icon.svg";
import userIcon from "@/public/images/form/name-user-icon.svg";
import lockIcon from "@/public/images/form/pas-lock-icon.svg";
import InputField from "./InputField";
import { EyeIcon } from "./EyeIcon";
import { useAuth } from "@/app/context/AuthContext";

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
  const { setApiKey } = useAuth();
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

      setApiKey(apiKey);

      console.log("Login successful!");
      router.push("/account/owner");
      reset();
    } catch (error: any) {
      handleError(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen-minus-header-footer">
      <div className="flex justify-center items-start flex-col bg-background-primary max-w-100 w-full p-7.5 rounded-1.25 border border-strokes-secondary">
        <h2 className="title font-semibold mb-6.25">
          {type === "login" ? (
            "Вход в Yoldi Agency"
          ) : (
            <>
              Регистрация <br /> в Yoldi Agency
            </>
          )}
        </h2>
        <form
          className="flex flex-col gap-3.75 max-w-330 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mx-1.25 flex flex-col gap-3.75">
            {type === "register" && (
              <InputField
                id="name"
                type="text"
                name="name"
                placeholder="Имя"
                icon={userIcon}
                register={register}
                error={errors.name}
                className="w-full"
              />
            )}
            <InputField
              id="email"
              type="email"
              name="email"
              placeholder="E-mail"
              icon={emailIcon}
              register={register}
              error={errors.email}
              pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
              className="w-full"
            />
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
              className="w-full"
            />
            {errors.root && (
              <p role="alert" className="text-red-500">
                {errors.root.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className="mt-2.5 py-3 bg-txt-color disabled:bg-strokes-primary rounded-1.25 text-white btnText"
          >
            {type === "login" ? "Войти" : "Создать аккаунт"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
