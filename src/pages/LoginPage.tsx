import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LocationState {
  from?: {
    pathname: string;
  };
}

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;
  const fromPath = state?.from?.pathname || '/';

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (user) {
    return <Navigate to={fromPath} replace />;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.trim() === '') {
      setError('Vui lòng nhập tên đăng nhập.');
      return;
    }

    const isSuccess = login(username, password);
    if (!isSuccess) {
      setError('Mật khẩu không đúng! Vui lòng thử lại.');
      return;
    }

    setError('');
    navigate(fromPath, { replace: true });
  };

  return (
    <section className="page auth-page">
      <form onSubmit={handleSubmit} className="card form-card">
        <h1>Đăng nhập</h1>
        <p className="subtitle">Đăng nhập tài khoản để tiếp tục thanh toán.</p>

        <div className="demo-hint">
          Nhập tên đăng nhập bất kỳ và mật khẩu <strong>123456</strong> để đăng nhập.
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="form-group">
          <label htmlFor="username">Tên đăng nhập</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên đăng nhập..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu..."
          />
        </div>

        <button type="submit" className="btn btn-primary btn-full btn-lg">
          Đăng nhập
        </button>
      </form>
    </section>
  );
}
