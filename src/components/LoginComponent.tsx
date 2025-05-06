"use client";

import { joiResolver } from "@hookform/resolvers/joi";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import InputPassword from "@/components/ui/form/InputPassword";
import InputText from "@/components/ui/form/InputText";
import { authService, IloginData } from "@/services/authService";
import { useUserStore } from "@/store/useUserStore";
import { loginValidator } from "@/validators/loginValidator";

export default function LoginComponent() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setUser } = useUserStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.me();
        if (user) {
          // startTransition гарантує, що push не порушить рендер
          React.startTransition(() => {
            router.push("/order");
          });
        }
      } catch (error) {
        console.log(error);
        router.push("/");
      }
    };

    checkAuth();
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IloginData>({
    resolver: joiResolver(loginValidator),
  });

  const formSubmit: SubmitHandler<IloginData> = async (user) => {
    setErrorMessage(null);
    authService
      .login(user)
      .then((data) => {
        if (data) {
          setUser(data);
          router.push("/order");
        }
      })
      .catch((error: AxiosError) => {
        if (error.status === 404) {
          setErrorMessage("Login or password is incorrect");
        } else {
          setErrorMessage("Error");
        }
      });
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-250px)]">
      <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col border-2 bg-white border-green-800 rounded-xl w-[300px] p-4">
        <InputText {...register("email")} label={"Email"} />
        <p className="text-red-500 text-sm h-4">{errors.email?.message ? String(errors.email?.message) : ""}</p>
        <InputPassword {...register("password")} label={"Password"} />
        <p className="text-red-500 text-sm h-4">{errors.password?.message ? String(errors.password?.message) : ""}</p>
        <div className="flex flex-row justify-center ">
          <Button type="submit" className="mt-4 p-2 ">
            Login
          </Button>
        </div>
        {errorMessage ? <p className="text-red-500 text-sm h-4 text-center">{errorMessage}</p> : <p className="h-4"></p>}
      </form>
    </div>
  );
}
