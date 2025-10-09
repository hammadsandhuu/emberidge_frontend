import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";

// ---------------------- Types ----------------------
export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
  original2?: string;
};

export interface OrderItem {
  product: string; // product _id
  name: string;
  price: number;
  quantity: number;
  image?: Attachment | null;
}

export interface OrderAddress {
  _id: string;
  fullName: string;
  phoneNumber: string;
  country: string;
  state?: string;
  city: string;
  area?: string;
  streetAddress: string;
  apartment?: string;
  postalCode: string;
  label?: string;
  isDefault?: boolean;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  shippingAddress: OrderAddress;
  paymentMethod: "stripe" | "applepay" | "COD" | "cod";
  paymentStatus: "pending" | "paid" | "failed" | "refunded" | "unpaid";
  paymentIntentId?: string | null;
  orderStatus: "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shippingFee: number;
  discount: number;
  coupon?: string | null;
  totalAmount: number;
  metadata?: object;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderPayload {
  addressId: string;
  paymentMethod: "stripe" | "applepay" | "COD";
  metadata?: object;
}

// ---------------------- API Functions ----------------------
const fetchOrders = async () => {
  const { data } = await http.get(API_RESOURCES.ORDERS);
  return data.data;
};

const fetchOrder = async (orderId: string) => {
  const { data } = await http.get(`${API_RESOURCES.ORDERS}/${orderId}`);
  return data.data;
};

const createOrder = async (payload: CreateOrderPayload) => {
  const response = await http.post(API_RESOURCES.ORDERS, payload);
  return response.data.data as { order: Order; clientSecret?: string };
};

// ---------------------- React Query Hooks ----------------------
const useOrdersQuery = () => {
  return useQuery({
    queryKey: [API_RESOURCES.ORDERS],
    queryFn: fetchOrders,
  });
};
const useOrderQuery = (orderId: string) => {
  return useQuery({
    queryKey: [API_RESOURCES.ORDERS, orderId],
    queryFn: () => fetchOrder(orderId),
    enabled: !!orderId,
  });
};

const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_RESOURCES.ORDERS] });
    },
  });
};

export {
  fetchOrders,
  fetchOrder,
  createOrder,
  useOrdersQuery,
  useOrderQuery,
  useCreateOrderMutation,
};
