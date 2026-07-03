import axios from "axios";

const API = "http://localhost:8080/api/cart";

export interface AddToCartRequest {
    customerId: string;
    productId: number;
    quantity: number;
}

export interface CartItem {
    productId: number;
    productName: string;
    imageUrl: string;
    price: number;
    quantity: number;
    subtotal: number;
}

export interface Cart {
    id: number;
    customerId: string;
    totalAmount: number;
    items: CartItem[];
}

export const cartService = {

    addToCart: async (data: AddToCartRequest): Promise<Cart> => {

        const response = await axios.post(`${API}/add`, data);

        return response.data;
    },

    getCart: async (customerId: string): Promise<Cart> => {

        const response = await axios.get(`${API}/${customerId}`);

        return response.data;
    },

    updateQuantity: async (
        customerId: string,
        productId: number,
        quantity: number
    ): Promise<Cart> => {

        const response = await axios.put(
            `${API}/${customerId}/${productId}?quantity=${quantity}`
        );

        return response.data;
    },

    removeItem: async (
        customerId: string,
        productId: number
    ): Promise<Cart> => {

        const response = await axios.delete(
            `${API}/${customerId}/${productId}`
        );

        return response.data;
    }

};