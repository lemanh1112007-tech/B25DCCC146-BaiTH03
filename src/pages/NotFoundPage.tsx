import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="page empty-state">
      <div className="card empty-card">
        <p className="not-found-code">404</p>
        <h1>Không tìm thấy trang</h1>
        <p>Đã xảy ra lỗi.</p>
        <Link to="/" className="btn btn-primary btn-lg">
          Quay về Trang chủ
        </Link>
      </div>
    </section>
  );
}
