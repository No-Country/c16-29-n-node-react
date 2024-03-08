
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from "../../utils/axios";
import { getAccessToken } from '../../utils/accessToken';

export const fetchNotes = createAsyncThunk(
  'teacher-notes/fetchNotes',
  async (_, { rejectWithValue }) =>{
    try {
      const token = getAccessToken();
      const res = await AxiosInstance.get("notes/current", {
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

export const editNote = createAsyncThunk(
  'teacher-notes/editNote',
  async ({ id, data }, { rejectWithValue }) =>{
    try {
      const token = getAccessToken();
      const res = await AxiosInstance.put(`notes/${id}`, data, {
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

export const deleteNote = createAsyncThunk(
  'teacher-notes/deleteNote',
  async (id, { rejectWithValue }) =>{
    try {
      const token = getAccessToken();
      const res = await AxiosInstance.delete(`notes/${id}`, {
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
  notes: [],
  isLoading: false,
  alertType: "",
  alertMessage: "",
  state: {
    isLoading: false,
    status: "idle "
  }
};

const teacherNotesSlice = createSlice({
  name: 'teacher-notes',
  initialState,
  reducers: {
    hideAlert: (state) => {
      state.alertType = "",
      state.alertMessage = ""
    },
    resetStates: (state) => {
      state.state = {
        isLoading: false,
        status: "idle"
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = action.payload;
      })
      .addCase(editNote.pending, (state) => {
        state.isLoading = true;
        state.state.isLoading = true;
      })
      .addCase(editNote.rejected, (state) => {
        state.isLoading = false;
        state.state.isLoading = false
        state.state.status = "rejected"
        state.alertMessage = "No se pudo editar la nota"
        state.alertType = "error"
      })
      .addCase(editNote.fulfilled, (state) => {
        state.isLoading = false;
        state.state.isLoading = false
        state.state.status = "completed"
        state.alertMessage = "Se edito correctamente"
        state.alertType = "success"
      })
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true;
        state.state.isLoading = true;
      })
      .addCase(deleteNote.rejected, (state) => {
        state.isLoading = false;
        state.state.isLoading = false
        state.state.status = "rejected"
        state.alertMessage = "No se pudo eliminar la nota"
        state.alertType = "error"
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.state.isLoading = false
        state.state.status = "completed"
        state.alertMessage = "Se elimino correctamente"
        state.alertType = "success"
      })
  },
});

export const { hideAlert, resetStates } = teacherNotesSlice.actions;
export default teacherNotesSlice.reducer;