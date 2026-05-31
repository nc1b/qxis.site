import { useEffect, useState, useCallback } from 'react';

export function useRoute() {
  const [path, setPath] = useState(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to) => {
    if (typeof window === 'undefined') return;
    if (to === window.location.pathname) return;
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo(0, 0);
  }, []);

  return { path, navigate };
}

export function matchWork(path) {
  return /^\/work\/?$/.test(path);
}

export function matchBeforeDM(path) {
  return /^\/dm\/?$/i.test(path);
}

export function matchMay(path) {
  return /^\/may\/?$/i.test(path);
}
