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
        <div className='wrapper'>
            <Cart modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
            <header>
                <div>Menu</div>
                <Link to='/' className='link'>
                    Store Name
                </Link>
                <button onClick={() => setModalIsOpen(true)}>Cart</button>
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
