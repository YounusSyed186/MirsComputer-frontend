import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useViewStore = create(
  persist(
    (set) => ({
      currentView: 'home',
      setCurrentView: (view) => set({ currentView: view }),
    }),
    {
      name: 'view-store', // Key in localStorage
      getStorage: () => localStorage, // Optional: defaults to localStorage
    }
  )
);

export default useViewStore;
