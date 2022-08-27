import Modal from 'react-modal';
import { useShoppingCart } from '~/utils/shoppingCart';

Modal.setAppElement('#root');

export default function Cart() {
    const { cart, removeFromCart, showCart, setShowCart } = useShoppingCart((state) => state);
    const total = [...cart].reduce((acc, [_, item]) => acc + item.price, 0);

    return (
        <Modal
            isOpen={showCart}
            onRequestClose={() => setShowCart(false)}
            closeTimeoutMS={250}
            className={{
                base: 'border-1 absolute right-0 top-0 bottom-0 w-1/4 animate-modal-open overflow-auto border-solid bg-gray-100 p-5 outline-none',
                afterOpen: '',
                beforeClose:
                    'border-1 absolute right-0 top-0 bottom-0 w-1/4 animate-modal-close overflow-auto border-solid bg-gray-100 p-5 outline-none',
            }}
            overlayClassName={{
                base: 'fixed inset-0 bg-white animate-fade-in',
                afterOpen: 'bg-opacity-75',
                beforeClose: '',
            }}
        >
            <div className='flex animate-fade-in-modal flex-col gap-2'>
                <div className='text-3xl font-bold'>Cart</div>
                {[...cart].map(([slug, item]) => (
                    <div key={slug}>
                        {item.name}
                        {item.price}
                        <button onClick={() => removeFromCart(slug)} className={'bg-gray-200 p-1'}>
                            Remove from cart
                        </button>
                    </div>
                ))}
                <div>Total: {total}</div>
            </div>
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
