import Modal from 'react-modal';
import { useCart } from '~/utils/CartProvider';

Modal.setAppElement('#root');

export default function Cart({
    modalIsOpen,
    setModalIsOpen,
}: {
    modalIsOpen: boolean;
    setModalIsOpen: (flag: boolean) => void;
}) {
    const { cart, total } = useCart();
    console.log({ cart });
    console.log({ total });

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            closeTimeoutMS={250}
            className='border-1 absolute right-0 top-0 bottom-0 w-1/4 animate-modal-open overflow-auto border-solid border-red-100 bg-white p-5 outline-none'
        >
            <div>
                <div className='text-3xl font-bold'>Cart</div>
                {[...cart].map(([slug, item]) => (
                    <div key={slug}>
                        {item.name}
                        {item.price}
                    </div>
                ))}
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
