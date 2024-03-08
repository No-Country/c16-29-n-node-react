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
  export const updateNonAttendaces = createAsyncThunk(
    'teacher-nonAttendances/updateNonAttendaces',
    async ({id, nonAttendancesData}, {rejectWithValue}) => {
      try {
        const token = getAccessToken();
        const response = await AxiosInstance.put(`nonattendances/${id}`, nonAttendancesData, 
        { headers:{"X-Access-Token": token}});
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          console.error("Server Error Response:", error.response.data);
          return rejectWithValue(error.response.data);
        } else {
          console.error("Error:", error.toString());
          return rejectWithValue(error.toString());
        }
      }
    }
  );

export const deleteNonAttendaces =createAsyncThunk(
  'teacher-nonAttendances/deleteNonAttendaces',
  async(id, {rejectWithValue})=>{
    try{
      const token= getAccessToken();
      await AxiosInstance.delete(`/users/${id}`, { headers:{"X-Access-Token": token}});
      return id;

    }catch (error){
      return rejectWithValue(error.toString());
    }
  }
)
const initialState = {
    nonAttendances: [],
    alertType: "",
    alertMessage: "",
    error: "",
    successMessage:"",
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
        })
        .addCase(updateNonAttendaces.pending, (state)=>{
          state.stateUpdating.isLoading = true;
        })
        .addCase(updateNonAttendaces.fulfilled, (state, action) => {
          state.stateUpdating.isLoading = false;
          const index = state.nonAttendances.findIndex(nonAttendances => nonAttendances.id === action.payload.id);
          if (index !== -1) {
            state.nonAttendances[index] = action.payload; 
          }
          state.successMessage = 'Inasistencia actualizada con éxito!';
        })
        .addCase(updateNonAttendaces.rejected, (state, action) => {
          state.stateUpdating.isLoading = false;
          state.error = action.payload;
        })
        .addCase(deleteNonAttendaces.pending, (state)=>{
          state.stateUpdating.isLoading=true;
        })
        .addCase(deleteNonAttendaces.rejected, (state, action) => {
          state.stateUpdating.isLoading = false;
          state.error = action.payload;
        })
        .addCase(deleteNonAttendaces.fulfilled, (state, action) => {
          state.stateUpdating.isLoading = true;
          state.nonAttendances = state.nonAttendances.filter(nonAttendances => nonAttendances.id !== action.payload);
          state.successMessage="Inasistencia eliminado con éxito"
        })
    },
  });
  
  export const { hideAlert, resetStates } = teacherNonAttendancesSlice.actions;
  export default teacherNonAttendancesSlice.reducer
  