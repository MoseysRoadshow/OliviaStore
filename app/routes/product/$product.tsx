import type { LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';
// import { useCart } from '~/utils/CartProvider';
import { useShoppingCart } from '~/shoppingCart';

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
    // const { addToCart } = useCart();
    const addToCart = useShoppingCart((state) => state.addToCart);
    // const [pageTotal] = useState(0);
    const { product } = useLoaderData<typeof loader>();
    // console.log({ product });

    // useEffect(() => {
    //     setPageTotal(total);
    // }, [total]);

    function handleOnClick() {
        if (product) {
            addToCart({ slug: product.slug, name: product.name, price: product.price, image: product.featuredImage });
        }
    }
    if (!product) {
        return <div>Not a product</div>;
    }

    return (
        <div className='bg-orange-50 p-4 text-3xl'>
            <main className='grid grid-cols-2 gap-4'>
                <section className='flex w-full flex-col gap-1'>
                    <img src={`/${product.featuredImage}`} alt={product.description} />
                    {product.images.map((image, index) => (
                        <img src={`/${image}`} key={index} alt={product.description} />
                    ))}
                </section>
                <section className='fixed left-1/2 top-16'>
                    <h1>{product.name}</h1>
                    <h2>{product.description}</h2>
                    <h3>${product.price}</h3>
                    {/* <h3>Total in cart: ${pageTotal}</h3> */}
                    <button onClick={handleOnClick}>Add To Cart</button>
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
