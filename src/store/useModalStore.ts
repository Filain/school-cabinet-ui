import { create } from "zustand";

interface IModalState {
  modal: boolean;
  setModal: (modal: boolean) => void;
}

export const useModalStore = create<IModalState>((set) => ({
  modal: false,

  setModal: (modal) => set({ modal }),
}));
