import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Copilot from '../components/Copilot';

export default function MainLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--dark)' }}>
      <Navbar />
      <main style={{ flex: 1, paddingBottom: '0' }} className="mobile-main">
        <Outlet />
      </main>
      <Footer />
      <Copilot />
      <style>{`
        @media(min-width: 901px) {
          .mobile-main { padding-bottom: 0 !important; }
        }
      `}</style>
    </div>
  );
}
