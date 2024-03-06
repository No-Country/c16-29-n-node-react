import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../utils/axios";

const roles = {
  PRINCIPAL: "directivo",
  TEACHER: "profesor",
  TUTOR: "tutor",
  STUDENT: "alumno"

}

const initialState = {
  role: "",
  accessToken: "",
  status: "idle"
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.role = initialState.role;
      state.accessToken = initialState.accessToken;
      state.status = initialState.status;
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
      });
  }
});
export const login = createAsyncThunk("auth/login", async ({ username, password }) => {
  const response = await AxiosInstance.post("login", {
    username, password
  });
  return response.data;
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;