import { create } from 'zustand';

import { type UserType, type UserDetailType } from '@/types/account';

interface UserState {
  user: UserType | null;
  setUser: (userInfo: UserType) => void;
}

interface UserDetailState {
  user: UserDetailType | null;
  setUser: (userInfo: UserDetailType) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (userInfo) => set({ user: userInfo }),
}));

export const useUserDetailStore = create<UserDetailState>((set) => ({
  user: null,
  setUser: (userInfo) => set({ user: userInfo }),
}));
