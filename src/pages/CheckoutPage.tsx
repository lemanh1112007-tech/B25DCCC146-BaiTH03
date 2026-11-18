import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useAuth } from '../contexts/AuthContext';
import {
  clearCart,
  selectCartItems,
  selectCartTotalPrice,
} from '../features/cart/cartSlice';

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const [isOrdered, setIsOrdered] = useState<boolean>(false);

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <section className="page empty-state">
        <div className="card success-card">
          <div className="success-icon" aria-hidden="true">
            ✓
          </div>
          <h1>Đặt hàng thành công!</h1>
          <p>
            Cảm ơn <strong>{user?.username}</strong> đã mua hàng tại ShopMini.
          </p>
          <Link to="/" className="btn btn-primary btn-lg">
            Tiếp tục mua sắm
          </Link>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="page empty-state">
        <div className="card empty-card">
          <h1>Giỏ hàng đang trống</h1>
          <p>Vui lòng thêm sản phẩm vào giỏ trước khi thanh toán.</p>
          <Link to="/" className="btn btn-primary">
            Quay lại trang chủ
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <h1 className="page-title">Thanh toán đơn hàng</h1>

      <div className="checkout-layout">
        <div className="card checkout-items-card">
          <h2>Sản phẩm trong đơn ({cartItems.length})</h2>
          <ul className="checkout-items">
            {cartItems.map(({ product, quantity }) => (
              <li key={product.id} className="checkout-item">
                <div>
                  <span className="checkout-item-name">{product.title}</span>
                  <span className="checkout-item-qty">× {quantity}</span>
                </div>
                <span className="checkout-item-price">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="card summary-panel">
          <h2>Xác nhận thanh toán</h2>
          <div className="summary-row">
            <span>Người đặt hàng</span>
            <strong>{user?.username}</strong>
          </div>
          <div className="summary-divider" />
          <div className="summary-total">
            <span>Tổng tiền</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>

          <div className="checkout-actions">
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="btn btn-primary btn-full btn-lg"
            >
              Đặt hàng
            </button>
            <Link to="/cart" className="btn btn-outline btn-full">
              Quay lại giỏ hàng
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
