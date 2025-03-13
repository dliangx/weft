// themes/lightTheme.ts
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#55d67f',
    },
    secondary: {
      main: '#bf55d6',
    },
    // 其他浅色主题配置...
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#55d67f',
    },
    secondary: {
      main: '#bf55d6',
    },
    // 其他暗色主题配置...
  },
});