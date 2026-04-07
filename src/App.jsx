import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Safety from './pages/Safety';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import WhoWeServe from './pages/WhoWeServe';

import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services/*" element={<Services />} />
            <Route path="who-we-serve" element={<WhoWeServe />} />
            <Route path="safety" element={<Safety />} />
            <Route path="careers" element={<Careers />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
