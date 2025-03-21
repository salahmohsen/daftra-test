export type NavItemType = {
  id: number;
  title: string;
  target?: string;
  visible?: boolean;
  children?: NavItemType[];
};

export type TrackPayload = {
  id: number;
  from: number;
  to: number;
};
