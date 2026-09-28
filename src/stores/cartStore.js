import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      products: [],
      totalPrice: 0,

      addToCart: (product) => {
        const products = get().products;

        const existingProduct = products.find(
          (item) => item._id === product._id
        );

        if (existingProduct) {
          set({
            products: products.map((item) => {
              if (item._id === product._id) {
                return {
                  ...item,
                  quantity: item.quantity + 1,
                };
              }

              return item;
            }),
          });
        } else {
          set({
            products: [
              ...products,
              {
                ...product,
                quantity: 1,
              },
            ],
          });
        }

        const updatedProducts = get().products;

        set({
          totalPrice: updatedProducts.reduce(
            (total, item) => total + Number(item.price) * Number(item.quantity),
            0
          ),
        });
      },

      removeFromCart: (productId) => {
        const products = get().products;

        const updatedProducts = products.filter(
          (item) => item._id !== productId
        );

        set({
          products: updatedProducts,
          totalPrice: updatedProducts.reduce(
            (total, item) => total + Number(item.price) * Number(item.quantity),
            0
          ),
        });
      },

      increaseQuantity: (productId) => {
        const products = get().products;

        const updatedProducts = products.map((item) => {
          if (item._id === productId && item.quantity < 10) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }

          return item;
        });

        set({
          products: updatedProducts,
          totalPrice: updatedProducts.reduce(
            (total, item) => total + Number(item.price) * Number(item.quantity),
            0
          ),
        });
      },

      decreaseQuantity: (productId) => {
        const products = get().products;

        const updatedProducts = products.map((item) => {
          if (item._id === productId && item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }

          return item;
        });

        set({
          products: updatedProducts,
          totalPrice: updatedProducts.reduce(
            (total, item) => total + Number(item.price) * Number(item.quantity),
            0
          ),
        });
      },

      clearCart: () => {
        set({
          products: [],
          totalPrice: 0,
        });
      },
    }),
    {
      name: "zustand:cart-storage",
    }
  )
);

export default useCartStore;