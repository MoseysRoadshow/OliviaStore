import type { LinksFunction } from '@remix-run/node';
import { db } from '~/utils/db.server';
import { useLoaderData } from '@remix-run/react';
import ProductCard from '~/components/productCard';
import indexStyles from '~/styles/index.css';

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

    console.log(productList);
    return (
        <div>
            <nav>Nav</nav>
            <header>Olivia's Unnamed Store</header>
            <main className='product-grid'>
                {productList.map((product) => (
                    <ProductCard
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.featuredImage}
                    />
                ))}
            </main>
        </div>
    );
}
