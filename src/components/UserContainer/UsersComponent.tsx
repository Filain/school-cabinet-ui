"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import Loading from "@/app/loading";
import UserComponent from "@/components/UserContainer/UserComponent";
import { adminService } from "@/services/adminService";
import { usePaginationStore } from "@/store/usePaginationStore";

export default function UsersComponent() {
  const { setTotal } = usePaginationStore();

  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  const { data, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => await adminService.getAll(page),
  });

  useEffect(() => {
    setTotal(data?.total || 0);
  }, [data, setTotal]);

  if (isLoading) {
    return <Loading />;
  }
  return <div className="flex flex-col items-center">{data?.data.map((user) => <UserComponent key={user._id} user={user} />)}</div>;
}
