import { createStore } from 'zustand';
import { NavItemType, TrackPayload } from '../types/nav.types';

type NavState = {
  Items: NavItemType[];
  openItems: Record<number, boolean>;
  trackPayload: TrackPayload;
  isEditable: boolean;
};

type NavActions = {
  setItems: (Items: NavItemType[]) => void;
  setTrackPayload: (trackPayload: TrackPayload) => void;
  setOpenItems: (openItems: Record<number, boolean>) => void;
  setIsEditable: (isEditable: boolean) => void;
};

export type NavStore = NavState & NavActions;

const defaultInitState: NavState = {
  Items: [],
  openItems: {},
  isEditable: false,

  trackPayload: {
    id: 0,
    from: 0,
    to: 0,
  },
};

export const createNavStore = (initialState?: Partial<NavState>) => {
  return createStore<NavStore>()(set => ({
    ...defaultInitState,
    ...initialState,

    setItems: (Items: NavItemType[]) => set({ Items }),
    setTrackPayload: (trackPayload: TrackPayload) => set({ trackPayload }),
    setOpenItems: (openItems: Record<number, boolean>) => set({ openItems }),
    setIsEditable: (isEditable: boolean) => set({ isEditable }),
  }));
};
