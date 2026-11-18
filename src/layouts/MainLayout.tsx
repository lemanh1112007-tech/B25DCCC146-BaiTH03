import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="container main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} ShopMini</p>
        </div>
      </footer>
    </div>
  );
}
