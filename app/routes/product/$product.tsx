import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';
import productStyles from './product.css';

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: productStyles }];
};

export async function loader(args: LoaderArgs) {
    const data = {
        product: await db.product.findUnique({
            where: {
                slug: args.params.product,
            },
        }),
    };
    return data;
}

export default function ProductRoute() {
    const { product } = useLoaderData<typeof loader>();
    console.log({ product });

    if (!product) {
        return <div>Not a product</div>;
    }

    return (
        <div>
            <div>{product.name}</div>
            <div>${product.price}</div>
            <div>{product.description}</div>
        </div>
    );
}
