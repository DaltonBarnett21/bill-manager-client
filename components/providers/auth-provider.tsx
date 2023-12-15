import { useAccessToken } from "@/stores/authstore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const accessToken = useAccessToken();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ((accessToken && router.asPath === "/login") || router.asPath === "/register") {
      router.push("/");
    }

    if (!accessToken && router.asPath === "/") {
      router.push("/login");
    }
    setIsLoading(false);
  }, [router.asPath]);

  if (isLoading) {
    return <Loading />;
  }

  return <div>{children}</div>;
};

const Loading = () => {
  return <div>Loading...</div>;
};

export default AuthProvider;
