export default function ProductCard({ name, price, image }: { name: string; price: number; image: string }) {
    return (
        <article className='product-card stacked'>
            <img className='product-image' src={image} alt='couch' />
            <div className='product-specials'>Back in stock</div>
            <div className='product-content'>
                <p className='product-name'>{name}</p>
                <p className='product-price'>${price}</p>
            </div>
        </article>
    );
}
