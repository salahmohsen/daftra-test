import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getNavApi } from '../api/nav.api';
import { NavItemType } from '../types/nav.types';
import { NavStoreProvider } from './nav.store.provider';

export async function NavQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ['nav'],
    queryFn: getNavApi,
  });

  const navItems = queryClient.getQueryData<NavItemType[]>(['nav']);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NavStoreProvider initialState={{ Items: navItems, isEditable: true }}>
        {children}
      </NavStoreProvider>
    </HydrationBoundary>
  );
}
