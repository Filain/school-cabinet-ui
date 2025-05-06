import { create } from "zustand";

interface IPaginationState {
  total: number;
  setTotal: (total: number) => void;
}

export const usePaginationStore = create<IPaginationState>((set) => ({
  total: 0,
  setTotal: (total) => set({ total }),
}));
