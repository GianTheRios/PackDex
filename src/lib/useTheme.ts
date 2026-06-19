import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'packdex-theme';

// The initial theme is set pre-paint by an inline script in index.html (default
// 'light'), so we read it back off <html data-theme> to stay in sync — no flash.
function getInitialTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage unavailable (private mode etc.) — theme just won't persist.
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    // Briefly enable color transitions so the switch cross-fades instead of snapping.
    const root = document.documentElement;
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 350);
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}
