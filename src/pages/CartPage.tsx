import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  removeFromCart,
  selectCartItems,
  selectCartTotalPrice,
  updateQuantity,
} from '../features/cart/cartSlice';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  if (cartItems.length === 0) {
    return (
      <section className="page empty-state">
        <div className="card empty-card">
          <h1>Giỏ hàng trống</h1>
          <p>Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
          <Link to="/" className="btn btn-primary">
            Mua sắm ngay
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <h1 className="page-title">Giỏ hàng của bạn</h1>

      <div className="cart-layout">
        <div className="cart-list">
          {cartItems.map(({ product, quantity }) => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.title} className="cart-item-image" />

              <div className="cart-item-info">
                <Link to={`/products/${product.id}`} className="cart-item-title">
                  {product.title}
                </Link>
                <p className="cart-item-unit">${product.price.toFixed(2)} / sản phẩm</p>
              </div>

              <div className="cart-stepper">
                <button
                  type="button"
                  onClick={() =>
                    dispatch(
                      updateQuantity({ productId: product.id, quantity: quantity - 1 })
                    )
                  }
                  className="stepper-btn"
                  aria-label="Giảm số lượng"
                >
                  -
                </button>
                <span className="cart-qty">{quantity}</span>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(
                      updateQuantity({ productId: product.id, quantity: quantity + 1 })
                    )
                  }
                  className="stepper-btn"
                  aria-label="Tăng số lượng"
                >
                  +
                </button>
              </div>

              <div className="cart-item-subtotal">
                ${(product.price * quantity).toFixed(2)}
              </div>

              <button
                type="button"
                onClick={() => dispatch(removeFromCart(product.id))}
                className="btn btn-danger"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>

        <aside className="card summary-panel">
          <h2>Tóm tắt đơn hàng</h2>
          <div className="summary-row">
            <span>Số loại sản phẩm</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-total">
            <span>Tổng tiền</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <Link to="/checkout" className="btn btn-primary btn-full btn-lg">
            Thanh toán
          </Link>
        </aside>
      </div>
    </section>
  );
}
