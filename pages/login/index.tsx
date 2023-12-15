import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const LoginForm = dynamic(() => import("@/components/forms/login-form"), { suspense: true });

const LoginPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;

function Loading() {
  return <div className=" bg-red-200 h-screen">🌀 Loading...</div>;
}
