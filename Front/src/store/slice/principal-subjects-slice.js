import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from "../../utils/axios";
import { getAccessToken } from '../../utils/accessToken';


//crear Materia
export const createSubject = createAsyncThunk(
  'principal-subjects/createSubject',
  async (data, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      const response = await AxiosInstance.post('/subjects', data, {
        headers: {
          "X-Access-Token": token
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);
//Editar Profesor
export const updateSubject = createAsyncThunk(
  'principal-subjects/updateSubject',
  async ({id, data}, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      const response = await AxiosInstance.put(`/subjects/${id}`, data, {
        headers: {
          "X-Access-Token": token
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

//Eliminar profesor
export const deleteSubject = createAsyncThunk(
  'principal-subjects/deleteSubject',
  async (id, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      const response = await AxiosInstance.delete(`/subjects/${id}`, {
        headers: {
          "X-Access-Token": token
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

export const fetchSubjects = createAsyncThunk(
  'principal-subjects/fetchSubjects',
  async (_, { rejectWithValue }) =>{
    try {
      const token = getAccessToken();
      const res = await AxiosInstance.get("/subjects", {
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

export const fetchTeachers = createAsyncThunk(
  'principal-subjects/fetchTeachers',
  async (_, { rejectWithValue }) =>{
    try {
      const token = getAccessToken();
      const res = await AxiosInstance.post("/users/role", {
        role: "TEACHER"
      }, {
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
  teachers: [],
  isLoading: false,
  alertType: "",
  alertMessage: "",
  stateCreating: {
    isLoading: false,
    status: "idle "
  },
  stateUpdating: {
    isLoading: false,
    status: "idle"
  },
  stateDeleting: {
    isLoading: false,
    status: "idle"
  }
};

const principalSubjectsSlice = createSlice({
  name: 'principal-subjects',
  initialState,
  reducers: {
    hideAlert: (state) => {
      state.alertType = "",
      state.alertMessage = ""
    },
    resetStates: (state) => {
      state.stateCreating = {
        isLoading: false,
        status: "idle "
      },
      state.stateUpdating = {
        isLoading: false,
        status: "idle"
      },
      state.stateDeleting = {
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
      .addCase(createSubject.pending, (state) => {
        state.isLoading = true;
        state.stateCreating.isLoading = true;
      })
      .addCase(createSubject.rejected, (state) => {
        state.isLoading = false;
        state.stateCreating.isLoading = false;
        state.stateCreating.status = "rejected";
        state.alertMessage = "No se pudo crear la materia";
        state.alertType = "success";
      })
      .addCase(createSubject.fulfilled, (state) => {
        state.isLoading = false;
        state.stateCreating.isLoading = false;
        state.stateCreating.status = "completed";
        state.alertMessage = "Se creo la materia correctamente";
        state.alertType = "success";
      })
      .addCase(updateSubject.pending, (state) => {
        state.isLoading = true;
        state.stateUpdating.isLoading = true;
      })
      .addCase(updateSubject.rejected, (state) => {
        state.isLoading = false;
        state.stateUpdating.isLoading = false;
        state.stateUpdating.status = "rejected";
        state.alertMessage = "No se pudo actualizar la materia";
        state.alertType = "error";
      })
      .addCase(updateSubject.fulfilled, (state) => {
        state.isLoading = false;
        state.stateUpdating.isLoading = false;
        state.stateUpdating.status = "completed";
        state.alertMessage = "Se actualizó la materia correctamente";
        state.alertType = "success";
      })
      .addCase(deleteSubject.pending, (state) => {
        state.isLoading = true;
        state.stateDeleting.isLoading = true;
      })
      .addCase(deleteSubject.rejected, (state) => {
        state.isLoading = true;
        state.stateDeleting.isLoading = false;
        state.stateDeleting.status = "rejected";
        state.alertMessage = "No se pudo eliminar la materia";
        state.alertType = "error";
      })
      .addCase(deleteSubject.fulfilled, (state) => {
        state.isLoading = false;
        state.stateDeleting.isLoading = false;
        state.stateDeleting.status = "completed";
        state.alertMessage = "Se eliminó la materia correctamente";
        state.alertType = "success";
      })
      .addCase(fetchTeachers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teachers = action.payload;
      })
  },
});

export const { hideAlert, resetStates } = principalSubjectsSlice.actions;
export default principalSubjectsSlice.reducer;