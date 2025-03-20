import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar'; 
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.css';
import Cart from '../components/Cart/Cart';
import FloatAlert from "../components/FloatAlert/FloatAlert";
import useApp from "../hooks/useApp";

function Layout() {
  const { cartOpen, setCartOpen, alert } = useApp();
  const [contentLoaded, setContentLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset contentLoaded to false for the animation reset
    setContentLoaded(false);

    // Delay to trigger re-render for the animation
    const timer = setTimeout(() => setContentLoaded(true), 100);

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div>
      <Navbar />
      <div className={`${styles.content} ${contentLoaded ? styles.contentAppear : ''}`}>
        <Outlet />
      </div>
      {cartOpen && (
        <Cart 
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
        />
      )}
      <Footer />
      {alert && alert.message && <FloatAlert />}
    </div>
  );
}

export default Layout;
