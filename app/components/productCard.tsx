export default function ProductCard({ name, price }: { name: String; price: String }) {
    return (
        <article className='product-card stacked'>
            <img className='product-image' src='stuff.jpeg' alt='couch' />
            <div className='product-specials'>Back in stock</div>
            <div className='product-content'>
                <p className='product-name'>{name}</p>
                <p className='product-price'>${price}</p>
            </div>
        </article>
    );
}
