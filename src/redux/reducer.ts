// cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ProductState {
  products: Product[];
  cart: Product[];
}

const initialState: ProductState = {
  products: [
    { id: 1, name: "Product 1", price: 100, quantity: 0 },
    { id: 2, name: "Product 2", price: 200, quantity: 0 },
  ],
  cart: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    addToCart: (state, action: PayloadAction<number>) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        const cartItem = state.cart.find((c) => c.id === product.id);
        if (cartItem) {
          cartItem.quantity += 1;
        } else {
          state.cart.push({ ...product, quantity: 1 });
        }
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const cartItem = state.cart.find((c) => c.id === action.payload);
      if (cartItem) {
        cartItem.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const cartItem = state.cart.find((c) => c.id === action.payload);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else {
        state.cart = state.cart.filter((c) => c.id !== action.payload);
      }
    },
  },
});

export const {
  addProduct,
  editProduct,
  deleteProduct,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} = productSlice.actions;

export default productSlice.reducer;
