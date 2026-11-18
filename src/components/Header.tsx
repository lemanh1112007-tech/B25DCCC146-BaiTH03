import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectCartTotalQuantity } from '../features/cart/cartSlice';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <span className="logo-mark">S</span>
          <span>ShopMini</span>
        </Link>

        <nav className="nav">
          <NavLink to="/" end className="nav-link">
            Trang chủ
          </NavLink>
          <NavLink to="/cart" className="nav-link">
            <span>Giỏ hàng</span>
            <span className="cart-badge">{totalQuantity}</span>
          </NavLink>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-outline btn-theme"
            aria-label="Chuyển đổi giao diện sáng tối"
          >
            {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
          </button>

          {user ? (
            <div className="user-info">
              <span className="user-badge">
                <span className="user-dot" />
                <span>{user.username}</span>
              </span>
              <button type="button" onClick={logout} className="btn btn-secondary">
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
