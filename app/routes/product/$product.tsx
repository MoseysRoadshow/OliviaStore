import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';
import productStyles from '~/styles/product.css';

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
        <div className='product-wrapper'>
            <header>
                <div>Menu</div>
                <Link to='/' className='link'>
                    Store Name
                </Link>
                <div>Cart</div>
            </header>
            <main>
                <section className='pictures'>
                    <img src={`/${product.featuredImage}`} alt={product.description} />
                    {product.images.map((image, index) => (
                        <img src={`/${image}`} key={index} alt={product.description} />
                    ))}
                </section>
                <section className='right-side'>
                    <h1>{product.name}</h1>
                    <h2>{product.description}</h2>
                    <h3>${product.price}</h3>
                    <button>Add To Cart</button>
                    <ul>
                        <li>
                            <h4>{product.details}</h4>
                        </li>
                        <li>
                            <h4>{product.details}</h4>
                        </li>
                        <li>
                            <h4>{product.details}</h4>
                        </li>
                        <li>
                            <h4>{product.details}</h4>
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
}
