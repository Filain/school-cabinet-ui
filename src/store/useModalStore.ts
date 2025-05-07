import { create } from "zustand";

type ModalType = "create" | "edit" | null;

interface IModalState {
  modal: ModalType;
  setModal: (modal: ModalType) => void;
}

export const useModalStore = create<IModalState>((set) => ({
  modal: null,
  setModal: (type) => set({ modal: type }),
}));
