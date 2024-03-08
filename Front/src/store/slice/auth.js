import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../utils/axios";

export const login = createAsyncThunk("auth/login", async ({ username, password }) => {
  const response = await AxiosInstance.post("login", {
    username, password
  });
  return response.data;
});

export const verify = createAsyncThunk("auth/verify", async (_, {
  getState
}) => {
  const token = getState().auth.accessToken;
  const response = await AxiosInstance.post("users/verify", {}, {
    headers: {
      "X-Access-Token": token
    }
  });
  return response.data;
});

const roles = {
  PRINCIPAL: "directivo",
  TEACHER: "profesor",
  TUTOR: "tutor",
  STUDENT: "alumno"

}

const initialState = {
  role: "",
  accessToken: "",
  status: "idle",
  user: {}
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.role = initialState.role;
      state.accessToken = initialState.accessToken;
      state.status = initialState.status;
    },
    resetStatus: (state) => {
      state.status = "idle";
    }
  },
  extraReducers(builder){
    builder
      .addCase(login.pending, (state) => {
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "completed";
        state.accessToken = action.payload.token;
        state.role = roles[action.payload.role];
      })
      .addCase(login.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(verify.rejected, (state) => {
        state.role = initialState.role;
        state.accessToken = initialState.accessToken;
        state.status = "disconnected";
        state.user = initialState.user;
      });
  }
});

export const { logout, resetStatus } = authSlice.actions;

export default authSlice.reducer;