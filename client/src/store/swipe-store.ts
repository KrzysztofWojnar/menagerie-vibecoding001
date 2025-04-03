import { create } from 'zustand';
import { Animal } from "@/types/animal";

interface SwipeState {
  potentialMatches: Animal[];
  setPotentialMatches: (animals: Animal[]) => void;
  removeAnimal: (id: number) => void;
}

export const useSwipeStore = create<SwipeState>((set) => ({
  potentialMatches: [],
  setPotentialMatches: (animals) => set({ potentialMatches: animals }),
  removeAnimal: (id) => set((state) => ({
    potentialMatches: state.potentialMatches.filter(animal => animal.id !== id)
  })),
}));
