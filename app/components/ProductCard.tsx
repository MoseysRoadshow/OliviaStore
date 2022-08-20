import { Link } from '@remix-run/react';

type ProductCardType = {
    name: string;
    price: number;
    image: string;
    slug: string;
    description: string;
};

export default function ProductCard({ name, price, image, slug, description }: ProductCardType) {
    return (
        <Link to={`/product/${slug}`} className='grid'>
            <img
                className='col-start-1 col-end-2 row-start-1 row-end-2 aspect-square w-full object-cover'
                src={image}
                alt={description}
            />
            <div className='col-start-1 col-end-2 row-start-1 row-end-2'>Back in stock</div>
            <div className='col-start-1 col-end-2 row-start-1 row-end-2 m-2 flex justify-between self-end bg-white p-2'>
                <p className=''>{name}</p>
                <p className=''>${price}</p>
            </div>
        </Link>
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
