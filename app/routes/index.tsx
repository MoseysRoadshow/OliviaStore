import { useState } from 'react';
import type { LinksFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';
import { Link } from '@remix-run/react';
import Modal from 'react-modal';
import ProductCard from '~/components/ProductCard';
import indexStyles from '~/styles/index.css';

Modal.setAppElement('#root');

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: indexStyles }];
};

export async function loader() {
    const data = {
        productList: await db.product.findMany(),
    };
    return data;
}

export default function Index() {
    const { productList } = useLoaderData<typeof loader>();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    console.log({ productList });

    return (
        <div className='wrapper'>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <div className='text-3xl font-bold underline'>The Modal</div>
            </Modal>
            <header>
                <div>Menu</div>
                <Link to='/' className='link'>
                    Store Name
                </Link>
                <div onClick={() => setModalIsOpen(true)}>Cart</div>
            </header>
            <main className='product-grid'>
                {productList.map((product) => (
                    <ProductCard
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.featuredImage}
                        slug={product.slug}
                        description={product.description}
                    />
                ))}
            </main>
        </div>
    );
}
