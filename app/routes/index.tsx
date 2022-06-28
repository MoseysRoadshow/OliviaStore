import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

import { db } from '~/utils/db.server';

import { useLoaderData } from '@remix-run/react';
import ProductCard from '~/components/productCard';

import indexStyles from '~/styles/index.css';
export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: indexStyles }];
};

type LoaderData = {
    productList: Array<{ id: string; name: string; price: string; featured: boolean }>;
};

export const loader: LoaderFunction = async () => {
    const data: LoaderData = {
        productList: await db.product.findMany(),
    };
    return json(data);
};

export default function Index() {
    const data = useLoaderData<LoaderData>();

    return (
        <div>
            <nav>Nav</nav>
            <header>Olivia's Unnamed Store</header>
            <main className='product-grid'>
                {data.productList.map((product) => (
                    <ProductCard key={product.id} name={product.name} price={product.price} />
                ))}
            </main>
        </div>
    );
}
