
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from "../../utils/axios";
import { getAccessToken } from '../../utils/accessToken';

export const fetchSubjects = createAsyncThunk(
  'teacher-subjects/fetchSubjects',
  async (_, { rejectWithValue }) =>{
    try {
      const token = getAccessToken();
      const res = await AxiosInstance.get("/subjects/current", {
        headers: {
          "X-Access-Token": token
        }
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
); 

const initialState = {
  subjects: [],
  isLoading: false,
  alertType: "",
  alertMessage: "",
  stateFetching: {
    isLoading: false,
    status: "idle "
  }
};

const teacherSubjectsSlice = createSlice({
  name: 'teacher-subjects',
  initialState,
  reducers: {
    hideAlert: (state) => {
      state.alertType = "",
      state.alertMessage = ""
    },
    resetStates: (state) => {
      state.stateFetching = {
        isLoading: false,
        status: "idle"
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subjects = action.payload;
      })
  },
});

export const { hideAlert, resetStates } = teacherSubjectsSlice.actions;
export default teacherSubjectsSlice.reducer;