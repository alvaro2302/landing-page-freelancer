import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Resets scroll on route changes. Hash links (e.g. /#contact, /terms#terms-9) keep their target.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
