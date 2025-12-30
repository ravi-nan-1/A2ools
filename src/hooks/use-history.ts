'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface HistoryItem {
  id: string;
  type: string;
  title: string;
  input: any;
  result: any;
  date: string;
}

interface HistoryState {
  history: HistoryItem[];
  addHistoryItem: (item: HistoryItem) => void;
  clearHistory: () => void;
}

export const useHistory = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
      addHistoryItem: (item) =>
        set((state) => ({ history: [item, ...state.history.slice(0, 49)] })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'tool-history-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
