"use client";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Icons from "@/components/ui/Icons";
import { authService } from "@/services/authService";
import { useUserStore } from "@/store/useUserStore";

export default function HeaderComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { user, logout: logoutStore } = useUserStore();
  const logout = () => {
    logoutStore();
    router.replace("/");
    authService.logout();
    queryClient.clear();
    logoutStore();
  };
  return (
    <header className="flex justify-between items-center min-h-16 bg-green-200 ">
      <p className="ml-5 text-4xl font-bold text-green-800 drop-shadow-xl">Logo</p>
      <div className=" flex flex-row items-center">
        <p className="mr-5 text-4xl font-bold text-green-800 drop-shadow-xl">{user?.name}</p>
        {user?.role === "admin" && !pathname.startsWith("/admin") && (
          <Button className="mr-5" icon={true} onClick={() => router.push("/admin")}>
            <Icons name="user" className=" w-10 h-10 fill-transparent stroke-white  stroke-1" />
          </Button>
        )}
        {pathname.startsWith("/admin") && (
          <Button className="mr-5" icon={true} onClick={() => router.push("/order")}>
            <Icons name="home" className=" w-10 h-10 fill-transparent stroke-white  stroke-1" />
          </Button>
        )}

        <Button className="mr-5" icon={true} onClick={logout}>
          <Icons name="logout" className="w-10 h-10 fill-transparent stroke-white   stroke-2" />
        </Button>
      </div>
    </header>
  );
}
