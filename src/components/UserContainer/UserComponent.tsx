import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

import Loading from "@/app/loading";
import Button from "@/components/ui/Button";
import { adminService } from "@/services/adminService";
import { IUser } from "@/services/authService";

interface IUserProps {
  user: IUser;
}

export default function UserComponent({ user }: IUserProps) {
  const { name, surname, email, role, isBanned, isActive, createdAt, lastLogin, inWork, total } = user;
  const queryClient = useQueryClient();

  const { mutate: ban } = useMutation({
    mutationFn: (id: string) => adminService.ban(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const { mutate: unban } = useMutation({
    mutationFn: (id: string) => adminService.unban(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const { mutate: activate, isPending } = useMutation({
    mutationFn: (id: string) => adminService.getActivationToken(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className=" flex flex-row gap-4 border-2 border-green-800  m-2 p-4 rounded-3xl w-full max-w-[1024px]">
      <div className="w-1/2 ">
        <div className="flex flex-row gap-4">
          <p>
            Name: <span className="font-bold"> {name}</span>
          </p>
          <p>
            Surname: <span className="font-bold">{surname}</span>
          </p>
        </div>

        <p>
          Email: <span className="font-bold">{email}</span>
        </p>
        <p>
          Role: <span className="font-bold">{role}</span>
        </p>
        <div className="flex flex-row gap-4">
          <p>
            Is banned: <span className={`font-bold ${isBanned ? "text-red-500" : ""}`}>{isBanned.toString().toUpperCase()}</span>
          </p>
          <p>
            Is active: <span className={`font-bold ${isActive ? "" : "text-red-500"}`}>{isActive.toString().toUpperCase()}</span>
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <p>
            Created at: <span className="font-bold">{dayjs(createdAt).format("DD.MM.YYYY")}</span>
          </p>
          <p>
            Last login: <span className="font-bold">{lastLogin ? dayjs(lastLogin).format("DD.MM.YYYY") : "-"}</span>
          </p>
        </div>
      </div>
      <div className="w-1/4 flex flex-col items-center j">
        <p>
          Total: <span className="font-bold">{total.toString()}</span>
        </p>
        <p>
          In work: <span className="font-bold">{inWork.toString()}</span>
        </p>
      </div>
      <div className="w-1/4 flex flex-col items-center justify-evenly ">
        {isActive ? (
          <Button type="button" disabled={user.activation === "activation"} onClick={() => activate(user._id)}>
            RECOVERY PASSWORD
          </Button>
        ) : (
          <Button type="button" disabled={user.activation === "activation"} onClick={() => activate(user._id)}>
            ACTIVATE
          </Button>
        )}

        {isBanned ? (
          <Button type="button" onClick={() => unban(user._id)}>
            UNBAN
          </Button>
        ) : (
          <Button type="button" onClick={() => ban(user._id)}>
            BAN
          </Button>
        )}
      </div>
    </div>
  );
}
