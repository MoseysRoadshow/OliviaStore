import { useState, createContext, useContext, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { z } from 'zod';

const CartJson = z.object({
    total: z.number(),
    cart: z.object({
        slug: z.object({
            slug: z.string(),
            name: z.string(),
            price: z.number(),
            image: z.string(),
        }),
    }),
});

interface CartItem {
    slug: string;
    name: string;
    price: number;
    image: string;
}

interface Cart {
    cart: Map<string, CartItem>;
    total: number;
    clearCart: () => void;
    addToCart: (slug: string, name: string, price: number, image: string) => void;
    removeFromCart: (slug: string) => void;
}

const CartContext = createContext<Cart | undefined>(undefined);

function useCartState(): Cart {
    const [{ cart, total }, setCart] = useState(() => {
        // if saved data in local storage load into cart
        if (typeof window !== 'undefined') {
            const valueInLocalStorage = window.localStorage.getItem('cart');
            if (valueInLocalStorage) {
                const { cart, total }: { cart: { [slug: string]: CartItem }; total: number } =
                    JSON.parse(valueInLocalStorage);
                return { cart: new Map(Object.entries(cart)), total };
            }
        }
        return { cart: new Map<string, CartItem>(), total: 0 };
    });

    function addToCart(slug: string, name: string, price: number, image: string) {
        if (!cart.has(slug)) {
            setCart({
                cart: new Map([...cart, ...new Map([[slug, { slug, name, price, image }]])]),
                total: total + price,
            });
        }
    }

    function removeFromCart(slug: string) {
        if (cart.has(slug)) {
            const removedPrice = z.number().parse(cart.get(slug)?.price);
            const newCart = { ...cart };
            newCart.delete(slug);
            setCart({
                cart: newCart,
                total: total - removedPrice,
            });
        }
    }

    function clearCart() {
        setCart({ cart: new Map(), total: 0 });
    }

    // save the cart to local storage whenever it's changed
    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify({ cart: Object.fromEntries(cart), total }));
    }, [cart, total]);

    return { cart, total, clearCart, addToCart, removeFromCart };
}

function CartProvider({ children }: PropsWithChildren) {
    const cart = useCartState();

    return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartContext provider');
    }
    return context;
}

export { CartProvider, useCart };
