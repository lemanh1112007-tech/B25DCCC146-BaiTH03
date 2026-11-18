import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import { fetchProducts } from '../features/products/productsSlice';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { items, status, error } = useAppSelector((state) => state.products);
  const product = items.find((item) => item.id === Number(id));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return (
      <section className="page status-box">
        <p>Đang tải thông tin sản phẩm...</p>
      </section>
    );
  }

  if (status === 'failed') {
    return (
      <section className="page status-box error-box">
        <p>Lỗi: {error}</p>
        <button
          type="button"
          onClick={() => dispatch(fetchProducts())}
          className="btn btn-primary"
        >
          Thử lại
        </button>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="page empty-state">
        <div className="card empty-card">
          <h2>Không tìm thấy sản phẩm</h2>
          <p>Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link to="/" className="btn btn-primary">
            Quay lại trang chủ
          </Link>
        </div>
      </section>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <section className="page">
      <Link to="/" className="back-link">
        ← Quay lại danh sách sản phẩm
      </Link>

      <div className="product-detail">
        <div className="detail-image-wrapper">
          <img src={product.image} alt={product.title} className="detail-image" />
        </div>

        <div className="detail-info">
          <span className="product-category">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>

          <button
            type="button"
            onClick={handleAddToCart}
            className="btn btn-primary btn-lg"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </section>
  );
}
