import create from 'zustand';
import { persist } from 'zustand/middleware';
import superjson from 'superjson';

interface CartItem {
    slug: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

interface Cart {
    cart: Map<string, CartItem>;
    addToCart: (item: CartItem) => void;
    removeFromCart: (slug: string) => void;
    showCart: boolean;
    setShowCart: (flag: boolean) => void;
    // clearCart: () => void;
}

export const useShoppingCart = create<Cart>()(
    persist(
        (set, get) => ({
            cart: new Map<string, CartItem>(),
            showCart: false,
            setShowCart: (flag) => set({ showCart: flag }),
            addToCart: (item) => {
                const { cart } = get();
                if (!cart.has(item.slug)) {
                    cart.set(item.slug, item);
                }

                set({ cart, showCart: true });
            },
            removeFromCart: (slug) => {
                const { cart } = get();
                if (cart.has(slug)) {
                    cart.delete(slug);
                    set({ cart });
                }
            },
        }),
        {
            name: 'cart',
            serialize: (state) => superjson.stringify(state),
            deserialize: (str) => superjson.parse(str),
        },
    ),
);
