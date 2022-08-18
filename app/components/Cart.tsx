import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function Cart() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <div>The Modal</div>
            </Modal>
        </>
    );
}
