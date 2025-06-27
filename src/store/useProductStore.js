import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProductStore = create(
  persist(
    (set) => ({
      products: [],
      selectedProduct: null,
      setProducts: (products) => set({ products }),
      setCurrentProduct: (product) => set({ selectedProduct: product }),
      clearSelectedProduct: () => set({ selectedProduct: null }),
    }),
    {
      name: 'product-store', // Key in localStorage
      getStorage: () => localStorage,
    }
  )
);

export default useProductStore;
