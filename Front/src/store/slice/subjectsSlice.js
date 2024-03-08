import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from "../../utils/axios";
import { getAccessToken } from '../../utils/access-token';

export const getSubjects = createAsyncThunk(
  'subjects/getSubjects',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      const response = await AxiosInstance.get('/subjects', { headers:{"X-Access-Token": token}});
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  subjects: [],
  isLoading: false,
  error: null,
};

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubjects.pending, (state) => {
        state.isLoading = true;
        state.error = null; 
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subjects = action.payload;
      })
      .addCase(getSubjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});


export const { reducer: subjectsReducer } = subjectsSlice;
