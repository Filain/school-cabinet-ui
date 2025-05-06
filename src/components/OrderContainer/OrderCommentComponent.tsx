"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";

import Loading from "@/app/loading";
import OrderFormComponent from "@/components/OrderFormComponent";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/form/InputText";
import Modal from "@/components/ui/Modal";
import { commentService } from "@/services/commentService";
import { IOrder } from "@/services/orderService";
import { useModalStore } from "@/store/useModalStore";
import { useUserStore } from "@/store/useUserStore";

interface ICommentProps {
  order: IOrder;
}
interface IFormData {
  comment: string;
}

export default function OrderCommentComponent({ order }: ICommentProps) {
  const queryClient = useQueryClient();
  const { modal, setModal } = useModalStore();
  const { user } = useUserStore();

  const { reset, register, handleSubmit } = useForm<IFormData>();
  const { data, isPending: isLoading } = useQuery({ queryKey: ["comments", order._id], queryFn: () => commentService.getAll(order._id) });
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { comment: string }) => commentService.create(order._id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments", order._id] }),
  });

  if (isPending || isLoading) {
    return <Loading />;
  }
  const sendComment = (data: IFormData) => {
    mutate({ comment: data.comment });
    reset();
  };

  const handleModal = () => {
    // console.log("order manager", order.manager);
    // console.log("me", user?._id);

    if (order.manager?._id === user?._id || order.manager === null) {
      setModal(true);
    } else {
      alert("This order belongs to another user.");
    }
  };

  return (
    <div className="flex flex-row gap-2  h-min-20">
      <div className="flex flex-col gap-2 w-1/2 p-4">
        <p className="cursor-default w-1/2">
          <span className="font-bold">Massage: </span>
          {order.msg}
        </p>
        <p className="cursor-default w-1/2 ">
          {" "}
          <span className="font-bold">UTM: </span> {order.utm}
        </p>
      </div>
      <div className=" w-1/2 flex flex-row">
        <div className=" flex flex-col p-4 w-full">
          <div className=" flex flex-col bg-gray-400  rounded-xl py-2">
            {data?.length === 0 && <p className="px-2 ">No comments</p>}
            {/*{JSON.stringify(data)}*/}
            {data?.map((comment) => (
              <div className="flex flex-row justify-between " key={comment._id}>
                <p className=" pl-4 overflow-hidden text-ellipsis whitespace-nowrap cursor-default" title={comment.comment}>
                  {comment.comment}
                </p>
                {/* Лінія з крапок */}
                <div className="self-end h-2 flex-grow border-t border-solid border-gray-500 mx-2" />
                <div className="flex flex-row gap-2">
                  <p className="">{comment.commentedBy?.name}</p>
                  <p className="">{comment.commentedBy?.surname}</p>
                  <p className="mx-4 whitespace-nowrap">{dayjs(comment.commentedBy?.createdAt).format("MMM DD,YYYY")}</p>
                </div>
              </div>
            ))}
          </div>

          <form
            className="flex flex-row items-end gap-4 p-4 bg-gray-400 mt-4 rounded-xl"
            onSubmit={handleSubmit((data) => sendComment(data))}
          >
            <InputText {...register("comment", { required: "Comment is required" })} />
            <Button type="submit" className="h-10">
              Submit
            </Button>
          </form>
        </div>
        <div className="flex flex-col justify-center pr-4">
          <Button className="h-10" onClick={handleModal}>
            Edit
          </Button>
        </div>
        <Modal onClose={() => setModal(false)} isOpen={modal}>
          <OrderFormComponent order={order} isNew={false} />
        </Modal>
      </div>{" "}
    </div>
  );
}
