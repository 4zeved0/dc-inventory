'use client'

import LoginForm from "@/app/components/LoginForm";
import LoginRedirect from "@/app/components/LoginRedirect";
import { SessionContext } from "@/app/context/SessionContext";
import { useContext } from "react";

export default function SignIn() {
  const { status } = useContext(SessionContext);

  if (status === 'loading') {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <div>
      <div className="w-screen h-screen flex justify-center items-center sm:p-0 px-5">
        {status === 'authenticated' ? <LoginRedirect /> : <LoginForm />}
      </div>
    </div>
  );
}
