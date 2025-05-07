"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Loading from "@/app/loading";
import { authService } from "@/services/authService";
import { useUserStore } from "@/store/useUserStore";

const USER_QUERY_KEY = "currentUser";

export default function AuthUserRequired({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { user, setUser, logout } = useUserStore();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: authService.me,
    enabled: !user,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }

    if (isError) {
      if (error instanceof AxiosError && error.response?.status === 403) {
        router.replace("/");
        logout();
      }
    }
  }, [data, isError, error, router, setUser, logout]);

  if (isLoading || (!user && !isError)) {
    return <Loading />;
  }

  if (user) {
    return <>{children}</>;
  }
  return null;
}
