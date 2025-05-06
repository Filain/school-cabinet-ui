"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

import Loading from "@/app/loading";
import { authService } from "@/services/authService";
import { useUserStore } from "@/store/useUserStore";

export default function AuthUserRequired({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { user, setUser, logout } = useUserStore();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authService.me();
        if (currentUser) {
          setUser(currentUser);
        } else {
          router.replace("/");
          logout();
        }
      } catch (e: unknown) {
        if (e instanceof AxiosError && e.response?.status === 403) {
          router.replace("/");
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    // Перевіряємо користувача лише якщо його ще немає
    if (!user) {
      checkAuth();
    } else {
      setLoading(false); // Якщо користувач вже є, зупиняємо завантаження
    }
  }, [logout, setUser, user, router]);

  // Показуємо лише спінер під час перевірки автентифікації
  if (loading) {
    return <Loading />;
  }

  // Якщо користувач авторизований (стан user не null), відображаємо обгорнутий компонент (children)
  if (user) {
    return <>{children}</>;
  }

  // Якщо користувач не авторизований і завантаження завершено, нічого не відображаємо (перенаправлення вже відбулося)
  return null;
}
