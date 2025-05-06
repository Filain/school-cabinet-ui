"use client";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import InputText from "@/components/ui/form/InputText";
import { adminService, ICreateUser } from "@/services/adminService";
import { useModalStore } from "@/store/useModalStore";
import { userValidator } from "@/validators/userValidator";

export default function CreateUserFormComponent() {
  const { setModal } = useModalStore();
  const queryClient = useQueryClient();

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<ICreateUser>({
    resolver: joiResolver(userValidator),
  });

  const { mutate } = useMutation({
    mutationFn: (data: ICreateUser) => adminService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setModal(false);
      reset();
    },
  });

  const closeModal = () => {
    setModal(false);
    reset();
  };

  return (
    <>
      <form
        className={"flex flex-col border-2 border-green-800 rounded-xl p-4 w-[300px]  "}
        onSubmit={handleSubmit((data) => mutate(data))}
      >
        <InputText type="text" {...register("email")} label="Email" />
        <p className="text-red-500 text-sm h-4">{errors.email?.message ? String(errors.email?.message) : ""}</p>

        <InputText type="text" {...register("name")} label="Name" />
        <p className="text-red-500 text-sm h-4">{errors.name?.message ? String(errors.name?.message) : ""}</p>

        <InputText type="text" {...register("surname")} label="Surname" />
        <p className="text-red-500 text-sm h-4">{errors.surname?.message ? String(errors.surname?.message) : ""}</p>
        <div className="flex flex-row justify-between mt-2">
          <Button className="mr-4" type="reset" onClick={closeModal}>
            CANCEL
          </Button>
          <Button className="ml-4" type="submit">
            CREATE
          </Button>
        </div>
      </form>
    </>
  );
}
