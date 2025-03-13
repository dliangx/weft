// hooks/useSystemTheme.ts
import useMediaQuery from '@mui/material/useMediaQuery';

export function useSystemTheme() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
    defaultMatches: false,
    ssrMatchMedia: (query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
    }),
  });

  return prefersDarkMode;
}