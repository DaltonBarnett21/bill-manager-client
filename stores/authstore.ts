import { create, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Router from "next/router";

type AuthStore = {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  actions: {
    setAccessToken: (accessToken: string | undefined) => void;
    setRefreshToken: (refreshToken: string | undefined) => void;
    clearAuthStore: () => void;
  };
};

const initialStates = {
  accessToken: undefined,
  refreshToken: undefined,
};

const authStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialStates,
      actions: {
        setAccessToken: (accessToken: string | undefined) => {
          set({ accessToken: accessToken });
        },
        setRefreshToken: (refreshToken: string | undefined) => {
          set({ refreshToken: refreshToken });
        },
        clearAuthStore: () => {
          set({ accessToken: undefined, refreshToken: undefined });
          Router.push("/login");
        },
      },
    }),
    {
      name: "tokens",
      partialize: (state) => ({ refreshToken: state.refreshToken, accessToken: state.accessToken }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

type Params<U> = Parameters<typeof useStore<typeof authStore, U>>;

//Selectors
const accessTokenSelector = (state: ExtractState<typeof authStore>) => state.accessToken;
const refreshTokenSelector = (state: ExtractState<typeof authStore>) => state.refreshToken;
const actionsSelector = (state: ExtractState<typeof authStore>) => state.actions;

//Getters
export const getAccessToken = () => accessTokenSelector(authStore.getState());
export const getRefreshToken = () => refreshTokenSelector(authStore.getState());
export const getAuthActions = () => actionsSelector(authStore.getState());

function useAuthStore<U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) {
  return useStore(authStore, selector, equalityFn);
}

//Hooks
export const useAccessToken = () => useAuthStore(accessTokenSelector);
export const useRefreshToken = () => useAuthStore(refreshTokenSelector);
export const useAuthActions = () => useAuthStore(actionsSelector);
