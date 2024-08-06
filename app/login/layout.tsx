import Footer from "@/components/Footer";
import React, { ReactNode } from "react";

type LoginLayoutProps = {
  children: ReactNode;
};

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => (
  <div className="min-h-screen-minus-header flex flex-col">
    <main className="flex-grow">{children}</main>
    <Footer
      text="Еще нет аккаунта?"
      linkText="Зарегистрироваться"
      linkHref="/register"
    />
  </div>
);

export default LoginLayout;
