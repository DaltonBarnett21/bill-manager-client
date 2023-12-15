import { api } from "@/lib/api-service";
import { useAuthActions } from "@/stores/authstore";
import { useUser } from "@/stores/userstore";
import React from "react";
import { Button } from "./ui/button";

const Test = () => {
  const { clearAuthStore } = useAuthActions();
  const { name } = useUser();

  const test = api.test.useFetchTest();
  return (
    <main>
      <span>Welcome, {name}!</span>
      {test.data?.test}
      <Button onClick={() => clearAuthStore()}>Logout</Button>
    </main>
  );
};

export default Test;
