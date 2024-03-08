import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from "../../utils/axios";
import { getAccessToken } from '../../utils/accessToken';
export const fetchNonAttendances =createAsyncThunk(
    'teacher-nonAttendances/fetchNonAttendances',
    async (_, { rejectWithValue }) =>{
      try {
        const token = getAccessToken();
        const nonAttendacesResponse = await AxiosInstance.get(
          'nonattendances/current', 
          {
            headers:{"X-Access-Token": token}
          });
        return nonAttendacesResponse.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  ); 
  
const initialState = {
    nonAttendances: [],
    alertType: "",
    alertMessage: "",
    stateUpdating: {
        isLoading: false,
        status: "idle"
      },
  };
  const teacherNonAttendancesSlice = createSlice({
    name: 'nonAttendances',
    initialState,
    reducers: {
        hideAlert: (state) => {
        state.alertType = "",
        state.alertMessage = ""
        },
        resetStates: (state) => {
        state.stateUpdating = {
            isLoading: false,
            status: "idle"
        }
        }
  },
    extraReducers: (builder) => {
      builder
        .addCase(fetchNonAttendances.pending, (state) => {
          state.stateUpdating.isLoading = true;
        })
        .addCase(fetchNonAttendances.fulfilled, (state, action) => {
          state.stateUpdating.isLoading = false;
          state.nonAttendances = action.payload;
        })
        .addCase(fetchNonAttendances.rejected, (state, action)=>{
            state.stateUpdating.isLoading=false;
            state.error = action.payload;
        });
    },
  });
  
  export const { hideAlert, resetStates } = teacherNonAttendancesSlice.actions;
  export default teacherNonAttendancesSlice.reducer
  