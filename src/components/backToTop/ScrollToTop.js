import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scroll To Top
const ScrollToTop = () => {
    const { pathname } = useLocation();
    
    useEffect (() => {
        window.scroll(0, 1);
    }, [pathname]);

  return null;
}

export default ScrollToTop
