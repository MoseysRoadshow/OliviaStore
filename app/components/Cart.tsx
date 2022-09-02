import Modal from 'react-modal';
import { useShoppingCart } from '~/utils/shoppingCart';

Modal.setAppElement('#root');

export default function Cart() {
    const { cart, removeFromCart, showCart, setShowCart } = useShoppingCart((state) => state);
    const total = [...cart].reduce((acc, [_, item]) => acc + item.price, 0);
    console.log({ showCart });
    console.log({ cart });
    return (
        <Modal
            isOpen={showCart}
            onRequestClose={() => setShowCart(false)}
            closeTimeoutMS={250}
            className={{
                base: 'border-1 absolute right-0 top-0 bottom-0 w-full animate-modal-open overflow-auto border-solid bg-gray-100 p-5 outline-none md:w-[600px]',
                afterOpen: '',
                beforeClose:
                    'border-1 absolute right-0 top-0 bottom-0 w-full animate-modal-close overflow-auto border-solid bg-gray-100 p-5 outline-none md:w-[600px]',
            }}
            overlayClassName={{
                base: 'fixed inset-0 bg-white animate-fade-in',
                afterOpen: 'bg-opacity-75',
                beforeClose: '',
            }}
        >
            <aside className=' animate-fade-in-modal flex-col'>
                <h1 className='text-3xl font-bold'>Cart ({cart.size})</h1>
                {[...cart].map(([slug, item]) => (
                    <article
                        key={slug}
                        className='m-2 flex items-center justify-between border-b-2 border-black p-1 text-xl'
                    >
                        <img alt={item.description} src={`/${item.image}`} className='h-24 w-24' />
                        <div className='flex h-full flex-col justify-between'>
                            <div>{item.name}</div>
                            <button onClick={() => removeFromCart(slug)} className={'bg-gray-300 p-2'}>
                                Remove from cart
                            </button>
                        </div>
                        <div className='font-bold'>${item.price}</div>
                    </article>
                ))}
                <div className='text-2xl'>Total: {total}</div>
            </aside>
        </Modal>
    );
}

export function ErrorBoundary({ error }: { error: Error }) {
    return (
        <div>
            <h1>Error</h1>
            <p>{error.message}</p>
            <p>The stack trace is:</p>
            <pre>{error.stack}</pre>
        </div>
    );
}
