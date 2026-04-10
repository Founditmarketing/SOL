import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GridGlitch from '../components/GridGlitch';

export default function MainLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--dark)' }}>
      <GridGlitch />
      <Navbar />
      <main style={{ flex: 1, paddingBottom: '0' }} className="mobile-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
