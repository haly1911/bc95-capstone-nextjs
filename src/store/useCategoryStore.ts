import { create } from "zustand";

type CategoryState = {
  selectedSubId: number | "all";
  setSelectedSubId: (id: number | "all") => void;
};

export const useCategoryStore = create<CategoryState>((set) => ({
  selectedSubId: "all",
  setSelectedSubId: (id) => set({ selectedSubId: id }),
}));
