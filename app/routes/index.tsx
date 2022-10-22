// import { useState } from 'react';
// import type { LinksFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';
// import { Link } from '@remix-run/react';
import ProductCard from '~/components/ProductCard';
import ComingSoon from '~/components/ComingSoon';

export async function loader() {
    const data = {
        productList: await db.product.findMany(),
    };
    return data;
}

export default function Index() {
    // const { productList } = useLoaderData<typeof loader>();

    // console.log({ productList });

    return (
        <div className='h-full bg-orange-50'>
            {/* <main className='grid grid-cols-300 gap-2 p-4 pt-24'>
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
            </main> */}
            <ComingSoon />
        </div>
    );
    // return <ComingSoon />;
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
