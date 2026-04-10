import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/': 'SolPowerlines | Heavy Infrastructure & Storm Response Across the Gulf South',
  '/about': 'About Us | SolPowerlines — Dedicated to Excellence & Integrity',
  '/services': 'Services | Distribution, Underground, Storm Restoration & Fiber | SolPowerlines',
  '/who-we-serve': 'Who We Serve | Electric Cooperatives, Municipalities & IOUs | SolPowerlines',
  '/safety': 'Safety Program | CUSP Certified, Zero Compromise | SolPowerlines',
  '/careers': 'Careers | Build Your Future as a Lineman | SolPowerlines',
  '/contact': 'Contact Us | Request a Consultation | SolPowerlines',
};

export default function PageTitle() {
  const location = useLocation();

  useEffect(() => {
    const title = PAGE_TITLES[location.pathname] || 'SolPowerlines | Exceeding Expectations in the World of Energy';
    document.title = title;
  }, [location.pathname]);

  return null;
}
