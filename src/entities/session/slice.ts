import { authApi, userApi } from "shared/api";
import { TokenStorage } from "shared/lib/token";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "shared/lib/types";

export interface UserState {
  user: User | null;
  isAuthorized: boolean;
  isSessionInited: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthorized: false,
  isSessionInited: false,
};

export const sessionSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state: UserState) => {
      state.user = null;
    },
    setIsAuthorized: (state: UserState, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },
    sessionInited: (state: UserState) => {
      state.isSessionInited = true;
    },
  },
});

export const getCurrentUserThunk = createAsyncThunk(
  "users/me",
  async (_, thunkApi) => {
    const user = await userApi.getCurrentUser();
    thunkApi.dispatch(setUser(user));
  }
);

export const initSession = createAsyncThunk(
  "auth/init",
  async (_, { dispatch }) => {
    TokenStorage.getToken() && dispatch(setIsAuthorized(true));
    dispatch(sessionInited());
    return;
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    authApi.logout();
    TokenStorage.clear();
    thunkApi.dispatch(setIsAuthorized(false));
  }
);

export const { setUser, clearUser, setIsAuthorized, sessionInited } =
  sessionSlice.actions;
