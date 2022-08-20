import { useState, createContext, useContext, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import superjson from 'superjson';

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
    const [{ cart, total }, setCart] = useState({ cart: new Map<string, CartItem>(), total: 0 });

    // load the cart from local storage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const valueInLocalStorage = window.localStorage.getItem('cart');
            if (valueInLocalStorage) {
                try {
                    const { cart, total } = superjson.parse<{
                        cart: Map<string, CartItem>;
                        total: number;
                    }>(valueInLocalStorage);
                    // console.log({ cart });
                    setCart({ cart, total });
                } catch (error) {
                    // console.log(error);
                    window.localStorage.clear();
                }
            }
        }
    }, []);

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
            let removedPrice = cart.get(slug)?.price;
            if (removedPrice === undefined) {
                throw new Error('undefined price something went wrong');
            }
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
        if (typeof window !== 'undefined') {
            try {
                window.localStorage.setItem('cart', superjson.stringify({ cart, total }));
            } catch (error) {
                console.log(error);
            }
        }
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
