import type { LinksFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { db } from '~/utils/db.server';
import { useLoaderData } from '@remix-run/react';
import ProductCard from '~/components/productCard';
import indexStyles from '~/styles/index.css';

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: indexStyles }];
};

type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
};

type LoaderData = {
    productList: Array<Product>;
};

export async function loader() {
    const data: LoaderData = {
        productList: await db.product.findMany(),
    };
    return json(data);
}

export default function Index() {
    const { productList } = useLoaderData<typeof loader>();

    return (
        <div>
            <nav>Nav</nav>
            <header>Olivia's Unnamed Store</header>
            <main className='product-grid'>
                {productList.map((product) => (
                    <ProductCard key={product.id} name={product.name} price={product.price} image={product.image} />
                ))}
            </main>
        </div>
    );
}
