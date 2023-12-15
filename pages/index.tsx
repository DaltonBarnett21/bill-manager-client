import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@/stores/authstore";
import { useUser } from "@/stores/userstore";
import { api } from "@/lib/api-service";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import WithLayout from "@/components/layouts/with-layout";

const Test = dynamic(() => import("@/components/test"), { suspense: true });

const inter = Inter({ subsets: ["latin"] });

function Home() {
  return <Suspense fallback={<Loading />}>hello</Suspense>;
}

export default WithLayout(Home);

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
