import { NavQueryProvider } from './nav.query.provider';
import { ReactQueryProvider } from './react.query.provider';
import { ThemeProvider } from './theme.provider';

export default async function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <NavQueryProvider>{children}</NavQueryProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
