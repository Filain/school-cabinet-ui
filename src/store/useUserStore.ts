import { create } from "zustand";

import { IUser } from "@/services/authService";

interface IUserState {
  user: IUser | null;
  setUser: (userData: IUser) => void;
  logout: () => void;
}

export const useUserStore = create<IUserState>((set) => ({
  user: null,

  setUser: (userData) => {
    // console.log("Setting user:", userData); // Додаємо лог тут
    set({ user: userData });
  },

  logout: () => {
    set({ user: null });
  },
}));
