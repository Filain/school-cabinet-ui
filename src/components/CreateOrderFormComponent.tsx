"use client";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import InputGroup from "@/components/ui/form/InputGroup";
import InputNumber from "@/components/ui/form/InputNumber";
import { InputSelect } from "@/components/ui/form/InputSelect";
import InputText from "@/components/ui/form/InputText";
import { Course, CourseFormat, CourseType, Statuses } from "@/constants/enums";
import { IFormData, IOrderCreate } from "@/interfaces/orderInterface";
import { orderService } from "@/services/orderService";
import { useModalStore } from "@/store/useModalStore";
import { orderValidator } from "@/validators/orderValidator";

export default function CreateOrderFormComponent() {
  const { setModal } = useModalStore();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({
    resolver: joiResolver(orderValidator),
  });

  const createMutation = useMutation({
    mutationFn: (data: IOrderCreate) => orderService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      setModal(null);
      reset();
    },
  });

  const closeModal = () => {
    setModal(null);
    reset();
  };

  const submit = (data: IOrderCreate) => {
    createMutation.mutate(data);
    // console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="border-2 border-green-800 rounded-xl  p-4 w-[700px]">
        <div className="flex gap-6 ">
          <div className="w-1/2">
            <InputGroup {...register("group")} label="Group" />
            <p className="text-red-500 text-sm h-4">{errors.group?.message ? String(errors.group?.message) : ""}</p>
            <InputText {...register("name")} label="Name" />
            <p className="text-red-500 text-sm h-4">{errors.name?.message ? String(errors.name?.message) : ""}</p>
            <InputText {...register("surname")} label="Surname" />
            <p className="text-red-500 text-sm h-4">{errors.surname?.message ? String(errors.surname?.message) : ""}</p>
            <InputText {...register("email")} label="Email" />
            <p className="text-red-500 text-sm h-4">{errors.email?.message ? String(errors.email?.message) : ""}</p>
            <InputText {...register("phone")} label="Phone" />
            <p className="text-red-500 text-sm h-4">{errors.phone?.message ? String(errors.phone?.message) : ""}</p>
            <InputNumber {...register("age")} label="Age" />
            <p className="text-red-500 text-sm h-4">{errors.age?.message ? String(errors.age?.message) : ""}</p>
          </div>
          <div className="w-1/2 ">
            <InputSelect {...register("status")} name="status" label="Status" options={Statuses} />
            <p className="text-red-500 text-sm h-[40px]">{errors.status?.message ? String(errors.status?.message) : ""}</p>
            <InputNumber {...register("sum")} label="Sum" />
            <p className="text-red-500 text-sm h-4">{errors.sum?.message ? String(errors.sum?.message) : ""}</p>
            <InputNumber {...register("already_paid")} label="Already paid" />
            <p className="text-red-500 text-sm h-4">{errors.already_paid?.message ? String(errors.already_paid?.message) : ""}</p>
            <InputSelect {...register("course")} name="course" label="Course" options={Course} />
            <p className="text-red-500 text-sm h-4">{errors.course?.message ? String(errors.course?.message) : ""}</p>
            <InputSelect {...register("course_format")} name="courseFormat" label="Course format" options={CourseFormat} />
            <p className="text-red-500 text-sm h-4">{errors.course_format?.message ? String(errors.course_format?.message) : ""}</p>
            <InputSelect {...register("course_type")} name="courseType" label="Course type" options={CourseType} />
            <p className="text-red-500 text-sm h-4">{errors.course_type?.message ? String(errors.course_type?.message) : ""}</p>
          </div>
        </div>
        <div className="border-t-1 border-green-800 pt-2">
          <InputText {...register("utm")} label="UTM" />
          <p className="text-red-500 text-sm h-4">{errors.utm?.message ? String(errors.utm?.message) : ""}</p>
          <InputText {...register("msg")} label="Message" />
          <p className="text-red-500 text-sm h-4">{errors.msg?.message ? String(errors.msg?.message) : ""}</p>
        </div>
        <div className="flex  justify-end gap-4 mt-2 ">
          <Button type={"button"} onClick={() => closeModal()}>
            CLOSE
          </Button>
          <Button type="submit">SUBMIT</Button>
        </div>
      </form>
    </>
  );
}
