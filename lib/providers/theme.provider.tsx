'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-dm-sans)',
  },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <MuiThemeProvider theme={theme}>{children} </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
};
