import { useState, createContext, useContext, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { z } from 'zod';

const CartItem = z.object({
    slug: z.string(),
    name: z.string(),
    price: z.number(),
    image: z.string(),
});

const CartCombined = z.object({
    total: z.number(),
    cart: z.object({}).catchall(CartItem),
});

const CartContext = createContext<
    | {
          cart: {
              [x: string]: {
                  slug: string;
                  name: string;
                  price: number;
                  image: string;
              };
          };
          total: number;
          clearCart: () => void;
          addToCart: (slug: string, name: string, price: number, image: string) => void;
          removeFromCart: (slug: string) => void;
      }
    | undefined
>(undefined);

function useCartState() {
    const [{ cart = {}, total = 0 }, setCart] = useState(() => {
        // if saved data in local storage load into cart
        if (typeof window !== 'undefined') {
            const valueInLocalStorage = window.localStorage.getItem('cart');
            if (valueInLocalStorage) {
                return CartCombined.parse(JSON.parse(valueInLocalStorage));
            }
        }
        return { cart: {}, total: 0 };
    });

    function addToCart(slug: string, name: string, price: number, image: string) {
        if (!cart[slug]) {
            setCart({
                cart: { ...cart, [slug]: { slug, name, price, image } },
                total: total + price,
            });
        }
    }

    function removeFromCart(slug: string) {
        if (cart[slug]) {
            const removedPrice = z.number().parse(cart[slug]?.price);
            const newCart = { ...cart };
            delete newCart[slug];
            setCart({
                cart: newCart,
                total: total - removedPrice,
            });
        }
    }

    function clearCart() {
        setCart({ cart: {}, total: 0 });
    }

    // save the cart to local storage whenever it's changed
    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify({ cart, total }));
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
