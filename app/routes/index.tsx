import type { LinksFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';
import { Link } from '@remix-run/react';
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

    console.log({ productList });

    return (
        <div className='wrapper'>
            <header>
                <div>Menu</div>
                <Link to='/' className='link'>
                    Store Name
                </Link>
                <div>Cart</div>
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
