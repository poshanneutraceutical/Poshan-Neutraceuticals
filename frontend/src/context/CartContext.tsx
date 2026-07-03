import { getCustomerId } from "../utils/customer";
import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    cartService,
    Cart,
    CartItem
} from "../services/cartService";

interface CartContextType {
    cart: Cart | null;
    loading: boolean;

    addToCart: (productId: number, quantity?: number) => Promise<void>;
    removeItem: (productId: number) => Promise<void>;
    updateQuantity: (productId: number, quantity: number) => Promise<void>;
    refreshCart: () => Promise<void>;

    cartCount: number;

    clearCart: () => Promise<void>; // ✅ FIXED (async)
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CUSTOMER_ID = getCustomerId();

export const CartProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);

    // ✅ Load cart
    const refreshCart = async () => {
        try {
            const data = await cartService.getCart(CUSTOMER_ID);
            setCart(data);
        } catch {
            setCart(null);
        }
    };

    useEffect(() => {
        refreshCart();
    }, []);

    // ✅ Add to cart
    const addToCart = async (
        productId: number,
        quantity: number = 1
    ) => {
        setLoading(true);
        try {
            const data = await cartService.addToCart({
                customerId: CUSTOMER_ID,
                productId,
                quantity,
            });

            setCart(data);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Remove item
    const removeItem = async (productId: number) => {
        const data = await cartService.removeItem(
            CUSTOMER_ID,
            productId
        );
        setCart(data);
    };

    // ✅ Update quantity
    const updateQuantity = async (
        productId: number,
        quantity: number
    ) => {
        const data = await cartService.updateQuantity(
            CUSTOMER_ID,
            productId,
            quantity
        );
        setCart(data);
    };

    // 🚀 FIXED: clear cart (frontend + backend safe)
    const clearCart = async () => {
        try {
            // If backend supports it (recommended)
            if (cartService.clearCart) {
                await cartService.clearCart(CUSTOMER_ID);
            }
        } catch (err) {
            console.log("Backend clearCart not available or failed", err);
        }

        // Always reset frontend state
        setCart(null);

        // optional localStorage cleanup
        localStorage.removeItem("cart");
    };

    // Cart count
    const cartCount =
        cart?.items.reduce(
            (sum: number, item: CartItem) => sum + item.quantity,
            0
        ) || 0;

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                addToCart,
                removeItem,
                updateQuantity,
                refreshCart,
                cartCount,
                clearCart, // ✅ INCLUDED
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
};