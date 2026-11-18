import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-link">
        <img src={product.image} alt={product.title} className="product-image" />
      </Link>

      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <Link to={`/products/${product.id}`} className="product-title">
          <h3>{product.title}</h3>
        </Link>
        <p className="product-price">${product.price.toFixed(2)}</p>

        <div className="product-actions">
          <button
            type="button"
            onClick={handleAddToCart}
            className="btn btn-primary btn-full"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </article>
  );
}
