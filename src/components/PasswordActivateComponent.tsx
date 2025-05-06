"use client";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import InputPassword from "@/components/ui/form/InputPassword";
import { adminService } from "@/services/adminService";
import { passwordValidator } from "@/validators/passwordValidator";

interface IPassword {
  password: string;
  confirm_password: string;
}

interface IProps {
  token: string;
}

export default function PasswordActivateComponent({ token }: IProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPassword>({
    resolver: joiResolver(passwordValidator),
  });

  const { mutate } = useMutation({
    mutationFn: (data: { token: string; password: string }) => adminService.changePassword(data.token, data.password),
  });

  const handleSubmitSuccess = (data: IPassword) => {
    mutate({ token: token, password: data.password });
    router.push("/");
  };

  return (
    <div className=" h-[calc(100vh-250px)] flex items-center justify-center ">
      <form
        className="flex flex-col border-2 border-green-800 rounded-xl w-[300px] p-4 bg-white"
        onSubmit={handleSubmit((data) => handleSubmitSuccess(data))}
      >
        <InputPassword {...register("password")} label="Password" />
        <p className="text-red-500 text-sm h-4">{errors.password?.message ? String(errors.password?.message) : ""}</p>
        <InputPassword {...register("confirm_password")} label="Confirm Password" />
        <p className="text-red-500 text-sm h-4">{errors.confirm_password?.message ? String(errors.confirm_password?.message) : ""}</p>
        <div className="flex justify-center items-center">
          <Button type="submit">Submit</Button>{" "}
        </div>
      </form>
    </div>
  );
}
