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
        <Link to={`/product/${slug}`} className='product-card stacked'>
            <img className='product-image' src={image} alt={description} />
            <div className='product-specials'>Back in stock</div>
            <div className='product-content'>
                <p className='product-name'>{name}</p>
                <p className='product-price'>${price}</p>
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
