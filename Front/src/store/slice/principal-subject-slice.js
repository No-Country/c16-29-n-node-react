import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from "../../utils/axios";
import { getAccessToken } from '../../utils/accessToken';

// Desasignar estudiante
export const deassignStudent = createAsyncThunk(
  'principal-subject/deassignStudent',
  async ({subject, user}, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      const response = await AxiosInstance.delete(`/subjects/${subject}/deassign/${user}`, {
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

// Asignar Estudiantes
export const assignStudents = createAsyncThunk(
  'principal-subject/assignStudents',
  async ({id, data}, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      const response = await AxiosInstance.put(`/subjects/assign/${id}`, data, {
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

export const fetchSubjectByFullname = createAsyncThunk(
  'principal-subject/fetchSubjectByFullname',
  async ({ name, grade, divition }, { rejectWithValue }) =>{
    try {
      const token = getAccessToken();
      const res = await AxiosInstance.get(`/subjects/${name}/${grade}/${divition}`, {
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

export const fetchStudents = createAsyncThunk(
  'principal-subject/fetchStudents',
  async (_, { rejectWithValue }) =>{
    try {
      const token = getAccessToken();
      const res = await AxiosInstance.post(`/users/role`, {
        role: "STUDENT"
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
  subject: {},
  allStudents: [],
  isLoading: false,
  alertType: "",
  alertMessage: "",
  stateFetching: {
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
  name: 'principal-subject',
  initialState,
  reducers: {
    hideAlert: (state) => {
      state.alertType = "",
      state.alertMessage = ""
    },
    resetStates: (state) => {
      state.stateFetching = {
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
      .addCase(fetchSubjectByFullname.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSubjectByFullname.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subject = action.payload;
      })
      .addCase(assignStudents.pending, (state) => {
        state.isLoading = true;
        state.stateUpdating.isLoading = true;
      })
      .addCase(assignStudents.rejected, (state) => {
        state.isLoading = false;
        state.stateUpdating.isLoading = false;
        state.stateUpdating.status = "rejected";
        state.alertMessage = "No se pudo crear la materia";
        state.alertType = "success";
      })
      .addCase(assignStudents.fulfilled, (state) => {
        state.isLoading = false;
        state.stateUpdating.isLoading = false;
        state.stateUpdating.status = "completed";
        state.alertMessage = "Se asignó el usuario correctamente";
        state.alertType = "success";
      })
      .addCase(deassignStudent.pending, (state) => {
        state.isLoading = true;
        state.stateDeleting.isLoading = true;
      })
      .addCase(deassignStudent.rejected, (state) => {
        state.isLoading = false;
        state.stateDeleting.isLoading = false;
        state.stateDeleting.status = "rejected";
        state.alertMessage = "No se pudo actualizar la materia";
        state.alertType = "error";
      })
      .addCase(deassignStudent.fulfilled, (state) => {
        state.isLoading = false;
        state.stateDeleting.isLoading = false;
        state.stateDeleting.status = "completed";
        state.alertMessage = "Se desasigno el usuario correctamente";
        state.alertType = "success";
      })
      .addCase(fetchStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allStudents = action.payload.filter((student) => 
          !state.subject?.students.find((current) => current.id === student.id)
        ).map(({id, firstName, lastName}) => ({
          value: id,
          label: `${firstName} ${lastName}`
        }));
      })
  },
});

export const { hideAlert, resetStates } = principalSubjectsSlice.actions;
export default principalSubjectsSlice.reducer;