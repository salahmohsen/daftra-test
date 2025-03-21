'use client';

import { createNavStore, NavStore } from '@/lib/store/nav.store';
import { type ReactNode, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export type NavStoreApi = ReturnType<typeof createNavStore>;

export const NavStoreContext = createContext<NavStoreApi | undefined>(
  undefined,
);

export interface NavStoreProviderProps {
  children: ReactNode;
  initialState?: Partial<NavStore>;
}

export const NavStoreProvider = ({
  children,
  initialState,
}: NavStoreProviderProps) => {
  const storeRef = useRef<NavStoreApi | null>(null);

  if (storeRef.current === null)
    storeRef.current = createNavStore(initialState);

  return (
    <NavStoreContext.Provider value={storeRef.current}>
      {children}
    </NavStoreContext.Provider>
  );
};

export const useNavStore = <T,>(selector: (store: NavStore) => T): T => {
  const navStoreContext = useContext(NavStoreContext);

  if (!navStoreContext) {
    throw new Error(`useNavStore must be used within NavStoreProvider`);
  }

  return useStore(navStoreContext, selector);
};
