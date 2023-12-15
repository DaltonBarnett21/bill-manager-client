import { create, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  name: string | undefined;
  email: string | undefined;
};

type UserStore = {
  user: User;
  actions: {
    setUser: (user: User) => void;
  };
};

const initialStates = {
  user: {
    name: undefined,
    email: undefined,
  },
};

const userStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...initialStates,
      actions: {
        setUser: (user: User | undefined) => {
          set({ user: user });
        },
      },
    }),
    {
      name: "user",
      partialize: (state) => ({ user: state.user }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

type Params<U> = Parameters<typeof useStore<typeof userStore, U>>;

//Selectors
const userSelector = (state: ExtractState<typeof userStore>) => state.user;
const actionsSelector = (state: ExtractState<typeof userStore>) => state.actions;

//Getters
export const getUser = () => userSelector(userStore.getState());
export const getUserActions = () => actionsSelector(userStore.getState());

function useAuthStore<U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) {
  return useStore(userStore, selector, equalityFn);
}

export const useUser = () => useAuthStore(userSelector);
export const useUserActions = () => useAuthStore(actionsSelector);
