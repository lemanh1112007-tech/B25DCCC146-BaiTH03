import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const filteredProducts = items.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <section className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
      <h1 style={{ margin: 0, fontSize: '1.75rem' }}>Danh sách sản phẩm</h1>

      <div className="search-box">
        <span className="search-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm sản phẩm theo tên..."
          className="search-input"
        />
      </div>
    </div>

      {status === 'loading' && (
        <div className="status-box">
          <p>Đang tải danh sách sản phẩm...</p>
        </div>
      )}

      {status === 'failed' && (
        <div className="status-box error-box">
          <p>Lỗi: {error}</p>
          <button
            type="button"
            onClick={() => dispatch(fetchProducts())}
            className="btn btn-primary"
          >
            Thử lại
          </button>
        </div>
      )}

      {status === 'succeeded' && filteredProducts.length === 0 && (
        <div className="empty-state">
          <p>Không tìm thấy sản phẩm phù hợp."{searchTerm}".</p>
        </div>
      )}

      {status === 'succeeded' && filteredProducts.length > 0 && (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
