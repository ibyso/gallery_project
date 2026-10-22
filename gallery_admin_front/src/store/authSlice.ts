import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getCurrentUser } from "../apis/userApi";

export type UserRole = "Member" | "Manager" | "Admin";

export interface User {
  user_id: number;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  restoreStatus: "idle" | "pending" | "done";
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isInitialized: false,
  restoreStatus: "idle",
};

// 새로고침 후 인증 복원
export const restoreSession = createAsyncThunk<User | null, void, { state: { auth: AuthState } }>(
  "auth/restoreSession",
  async () => {
    const token = sessionStorage.getItem("access_token");

    if (!token) {
      return null;
    }

    try {
      const user = await getCurrentUser();
      return user;
    } catch {
      sessionStorage.removeItem("access_token");
      return null;
    }
  },
  {
    condition: (_, { getState }) => {
      return getState().auth.restoreStatus === "idle";
    },
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isInitialized = true;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isInitialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreSession.pending, (state) => {
        state.isLoading = true;
        state.restoreStatus = "pending";
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = action.payload !== null;
        state.isLoading = false;
        state.isInitialized = true;
        state.restoreStatus = "done";
      })
      .addCase(restoreSession.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isInitialized = true;
        state.restoreStatus = "done";
      });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
