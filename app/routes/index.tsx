import { useState } from 'react';
import type { LinksFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';
import { Link } from '@remix-run/react';
import ProductCard from '~/components/ProductCard';
import indexStyles from '~/styles/index.css';
import Cart from '~/components/Cart';

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
    const [modalIsOpen, setModalIsOpen] = useState(true);

    // console.log({ productList });

    return (
        <div className='bg-orange-50'>
            <Cart modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
            <header className='fixed top-0 flex w-full justify-between bg-orange-50 p-4 text-3xl'>
                <div>Menu</div>
                <Link to='/'>Store Name</Link>
                <button onClick={() => setModalIsOpen(true)}>Cart</button>
            </header>
            <main className='grid grid-cols-300 gap-2 p-4 pt-24'>
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
