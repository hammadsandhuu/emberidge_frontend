import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Item,
  UpdateItemInput,
  addItemWithQuantity,
  removeItemOrQuantity,
  addItem,
  updateItem,
  removeItem,
  calculateUniqueItems,
  calculateItemTotals,
  calculateTotalItems,
  calculateTotal,
} from "@/services/utils/cartUtils";

export interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expiry: string;
}

export interface State {
  items: Item[];
  isEmpty: boolean;
  totalItems: number;
  totalUniqueItems: number;
  total: number;
  discount: number;
  finalTotal: number;
  coupon: Coupon | null;
  shippingFee: number;
  shippingMethod: string | null;
}

interface Actions {
  addItemWithQuantity: (item: Item, quantity: number) => void;
  removeItemOrQuantity: (id: Item["id"], quantity?: number) => void;
  addItem: (item: Item) => void;
  updateItem: (id: Item["id"], item: UpdateItemInput) => void;
  removeItem: (id: Item["id"]) => void;
  resetCart: () => void;
  setCart: (
    items: Item[],
    discount?: number,
    coupon?: Coupon | null,
    finalTotal?: number,
    shippingFee?: number,
    shippingMethod?: string | null
  ) => void;
}

export type CartState = State & Actions;

const initialState: State = {
  items: [],
  isEmpty: true,
  totalItems: 0,
  totalUniqueItems: 0,
  total: 0,
  discount: 0,
  finalTotal: 0,
  coupon: null,
  shippingFee: 0,
  shippingMethod: null,
};

const generateFinalState = (
  items: Item[],
  discount = 0,
  coupon: Coupon | null = null,
  finalTotal?: number,
  shippingFee = 0,
  shippingMethod: string | null = null
) => {
  const totalUniqueItems = calculateUniqueItems(items);
  const total = calculateTotal(items);
  const final = finalTotal ?? total - discount + shippingFee;

  return {
    items: calculateItemTotals(items),
    totalItems: calculateTotalItems(items),
    totalUniqueItems,
    total,
    isEmpty: totalUniqueItems === 0,
    discount,
    finalTotal: final,
    coupon,
    shippingFee,
    shippingMethod,
  };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      ...initialState,

      addItemWithQuantity: (item, quantity) => {
        const items = addItemWithQuantity(get().items, item, quantity);
        set(
          generateFinalState(
            items,
            get().discount,
            get().coupon,
            undefined,
            get().shippingFee,
            get().shippingMethod
          )
        );
      },

      removeItemOrQuantity: (id, quantity = 1) => {
        const items = removeItemOrQuantity(get().items, id, quantity);
        set(
          generateFinalState(
            items,
            get().discount,
            get().coupon,
            undefined,
            get().shippingFee,
            get().shippingMethod
          )
        );
      },

      addItem: (item) => {
        const items = addItem(get().items, item);
        set(
          generateFinalState(
            items,
            get().discount,
            get().coupon,
            undefined,
            get().shippingFee,
            get().shippingMethod
          )
        );
      },

      updateItem: (id, itemData) => {
        const items = updateItem(get().items, id, itemData);
        set(
          generateFinalState(
            items,
            get().discount,
            get().coupon,
            undefined,
            get().shippingFee,
            get().shippingMethod
          )
        );
      },

      removeItem: (id) => {
        const items = removeItem(get().items, id);
        set(
          generateFinalState(
            items,
            get().discount,
            get().coupon,
            undefined,
            get().shippingFee,
            get().shippingMethod
          )
        );
      },

      resetCart: () => {
        set({ ...initialState });
        try {
          localStorage.removeItem("glozin-cart");
        } catch (error) {
          console.error("Failed to clear persisted cart:", error);
        }
      },

      setCart: (
        items,
        discount = 0,
        coupon: Coupon | null = null,
        finalTotal,
        shippingFee = 0,
        shippingMethod: string | null = null
      ) => {
        set(
          generateFinalState(
            items,
            discount,
            coupon,
            finalTotal,
            shippingFee,
            shippingMethod
          )
        );
      },
    }),
    {
      name: "glozin-cart",
      partialize: (state) => ({
        items: state.items,
        discount: state.discount,
        coupon: state.coupon,
        finalTotal: state.finalTotal,
        shippingFee: state.shippingFee,
        shippingMethod: state.shippingMethod,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) console.error("Error rehydrating cart state:", error);
        if (state && state.items) {
          const items = state.items;
          state.totalItems = calculateTotalItems(items);
          state.totalUniqueItems = calculateUniqueItems(items);
          state.total = calculateTotal(items);
          state.finalTotal =
            state.total - (state.discount ?? 0) + (state.shippingFee ?? 0);
          state.isEmpty = items.length === 0;
        }
      },
    }
  )
);

// import { create } from "zustand";
// import {
//   Item,
//   UpdateItemInput,
//   addItemWithQuantity,
//   removeItemOrQuantity,
//   addItem,
//   updateItem,
//   removeItem,
//   calculateUniqueItems,
//   calculateItemTotals,
//   calculateTotalItems,
//   calculateTotal,
// } from "@/services/utils/cartUtils";

// export interface Coupon {
//   id: string;
//   code: string;
//   discountType: "percentage" | "fixed";
//   discountValue: number;
//   expiry: string;
// }

// export interface State {
//   items: Item[];
//   isEmpty: boolean;
//   totalItems: number;
//   totalUniqueItems: number;
//   total: number;
//   discount: number;
//   finalTotal: number;
//   coupon: Coupon | null;
// }

// interface Actions {
//   addItemWithQuantity: (item: Item, quantity: number) => void;
//   removeItemOrQuantity: (id: Item["id"], quantity?: number) => void;
//   addItem: (item: Item) => void;
//   updateItem: (id: Item["id"], item: UpdateItemInput) => void;
//   removeItem: (id: Item["id"]) => void;
//   resetCart: () => void;
//   setCart: (
//     items: Item[],
//     discount?: number,
//     coupon?: Coupon | null,
//     finalTotal?: number
//   ) => void;
// }

// export type CartState = State & Actions;

// const initialState: State = {
//   items: [],
//   isEmpty: true,
//   totalItems: 0,
//   totalUniqueItems: 0,
//   total: 0,
//   discount: 0,
//   finalTotal: 0,
//   coupon: null,
// };

// const generateFinalState = (
//   items: Item[],
//   discount = 0,
//   coupon: Coupon | null = null,
//   finalTotal?: number
// ) => {
//   const totalUniqueItems = calculateUniqueItems(items);
//   const total = calculateTotal(items);

//   return {
//     items: calculateItemTotals(items),
//     totalItems: calculateTotalItems(items),
//     totalUniqueItems,
//     total,
//     isEmpty: totalUniqueItems === 0,
//     discount,
//     finalTotal: finalTotal ?? total - discount,
//     coupon,
//   };
// };

// export const useCartStore = create<CartState>((set, get) => ({
//   ...initialState,

//   addItemWithQuantity: (item, quantity) => {
//     const items = addItemWithQuantity(get().items, item, quantity);
//     set(generateFinalState(items, get().discount, get().coupon));
//   },

//   removeItemOrQuantity: (id, quantity = 1) => {
//     const items = removeItemOrQuantity(get().items, id, quantity);
//     set(generateFinalState(items, get().discount, get().coupon));
//   },

//   addItem: (item) => {
//     const items = addItem(get().items, item);
//     set(generateFinalState(items, get().discount, get().coupon));
//   },

//   updateItem: (id, itemData) => {
//     const items = updateItem(get().items, id, itemData);
//     set(generateFinalState(items, get().discount, get().coupon));
//   },

//   removeItem: (id) => {
//     const items = removeItem(get().items, id);
//     set(generateFinalState(items, get().discount, get().coupon));
//   },

//   resetCart: () => set({ ...initialState }),

//   setCart: (items, discount = 0, coupon: Coupon | null = null, finalTotal) => {
//     set(generateFinalState(items, discount, coupon, finalTotal));
//   },
// }));
