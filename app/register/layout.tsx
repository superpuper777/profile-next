import Footer from "@/components/Footer";
import React, { ReactNode } from "react";

type RegisterLayoutProps = {
  children: ReactNode;
};

const RegisterLayout: React.FC<RegisterLayoutProps> = ({ children }) => (
  <div className="min-h-screen-minus-header flex flex-col">
    <main className="flex-grow">{children}</main>
    <Footer text="Уже есть аккаунт?" linkText="Войти" linkHref="/login" />
  </div>
);

export default RegisterLayout;
