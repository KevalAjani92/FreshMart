// store/cartStore.js
import { create } from "zustand";
import axios from "axios";

const useCartStore = create((set) => ({
  cartItemCount: 0,
  fetchCartItemCount: async (customerID) => {
    try {
      const response = await axios.get(
        `https://localhost:7188/api/Cart/GetCartItemsByUser?customerID=${customerID}`
      );
      set({ cartItemCount: response.data.items.length });
    } catch (error) {
      console.error("Error fetching cart item count:", error);
    }
  },
  setCartItemCount: (count) => set({ cartItemCount: count }),
}));

export default useCartStore;
