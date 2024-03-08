import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../utils/axios";
import { getAccessToken } from "../../utils/accessToken";

// Crear Examen
export const createExam = createAsyncThunk(
  "teacher-subject/createExam",
  async (data, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      const response = await AxiosInstance.post(`marks/exams`, data, {
        headers: {
          "X-Access-Token": token,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Crear Inasistencias
export const createNonAttendances = createAsyncThunk(
  "teacher-subject/create-non-attendances",
  async (data, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      const response = await AxiosInstance.post(`nonattendances`, data, {
        headers: {
          "X-Access-Token": token,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Crear Amonestacion
export const createBann = createAsyncThunk(
  "teacher-subject/create-bann",
  async (data, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      const response = await AxiosInstance.post(`banns`, data, {
        headers: {
          "X-Access-Token": token,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Crear Nota
export const createNote = createAsyncThunk(
  "teacher-subject/create-note",
  async (data, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      const response = await AxiosInstance.post(`notes`, data, {
        headers: {
          "X-Access-Token": token,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

export const createMark = createAsyncThunk(
  "teacher-subject/create-mark",
  async (data, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      const response = await AxiosInstance.post(`marks`, data, {
        headers: {
          "X-Access-Token": token,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

export const fetchSubjectByName = createAsyncThunk(
  "teacher-subject/fetchByName",
  async ({ name, grade, divition }, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      const res = await AxiosInstance.get(
        `/subjects/${name}/${grade}/${divition}`,
        {
          headers: {
            "X-Access-Token": token,
          },
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchExams = createAsyncThunk(
  "teacher-subject/fetch-exams",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      const res = await AxiosInstance.get(
        `/marks/exams/current`,
        {
          headers: {
            "X-Access-Token": token,
          },
        }
      );

      console.log(res.data);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  subject: {},
  exams: [],
  isLoading: false,
  alertType: "",
  alertMessage: "",
  stateFetching: {
    isLoading: false,
    status: "idle ",
  },
  stateCreating: {
    isLoading: false,
    status: "idle",
  },
};

const teacherSubjectSlice = createSlice({
  name: "teacher-subject",
  initialState,
  reducers: {
    hideAlert: (state) => {
      (state.alertType = ""), (state.alertMessage = "");
    },
    resetStates: (state) => {
      (state.stateFetching = {
        isLoading: false,
        status: "idle ",
      }),
        (state.stateCreating = {
          isLoading: false,
          status: "idle",
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjectByName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSubjectByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subject = action.payload;
      })
      .addCase(fetchExams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exams = action.payload;
      })
      .addCase(createExam.pending, (state) => {
        state.isLoading = true;
        state.stateCreating.isLoading = true;
      })
      .addCase(createExam.rejected, (state) => {
        state.isLoading = false;
        state.stateCreating.isLoading = false;
        state.stateCreating.status = "rejected";
        state.alertMessage = "No se pudo actualizar la materia";
        state.alertType = "error";
      })
      .addCase(createExam.fulfilled, (state) => {
        state.isLoading = false;
        state.stateCreating.isLoading = false;
        state.stateCreating.status = "completed";
        state.alertMessage = "Se desasigno el usuario correctamente";
        state.alertType = "success";
      })
      .addCase(createNonAttendances.pending, (state) => {
        state.isLoading = true;
        state.stateCreating.isLoading = true;
      })
      .addCase(createNonAttendances.rejected, (state) => {
        state.isLoading = false;
        state.stateCreating.isLoading = false;
        state.stateCreating.status = "rejected";
        state.alertMessage = "No se pudo crear las inasistencias";
        state.alertType = "error";
      })
      .addCase(createNonAttendances.fulfilled, (state) => {
        state.isLoading = false;
        state.stateCreating.isLoading = false;
        state.stateCreating.status = "completed";
        state.alertMessage = "Se crearon las inasistencias correctamente";
        state.alertType = "success";
      })
      .addCase(createBann.pending, (state) => {
        state.isLoading = true;
        state.stateCreating.isLoading = true;
      })
      .addCase(createBann.rejected, (state) => {
        state.isLoading = false;
        state.stateCreating.isLoading = false;
        state.stateCreating.status = "rejected";
        state.alertMessage = "No se pudo crear la amonestacion";
        state.alertType = "error";
      })
      .addCase(createBann.fulfilled, (state) => {
        state.isLoading = false;
        state.stateCreating.isLoading = false;
        state.stateCreating.status = "completed";
        state.alertMessage = "Se creó la amonestacion correctamente";
        state.alertType = "success";
      })
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
        state.stateCreating.isLoading = true;
      })
      .addCase(createNote.rejected, (state) => {
        state.isLoading = false;
        state.stateCreating.isLoading = false;
        state.stateCreating.status = "rejected";
        state.alertMessage = "No se pudo crear la nota";
        state.alertType = "error";
      })
      .addCase(createNote.fulfilled, (state) => {
        state.isLoading = false;
        state.stateCreating.isLoading = false;
        state.stateCreating.status = "completed";
        state.alertMessage = "Se creó la nota correctamente";
        state.alertType = "success";
      })
      .addCase(createMark.pending, (state) => {
        state.isLoading = true;
        state.stateCreating.isLoading = true;
      })
      .addCase(createMark.rejected, (state) => {
        state.isLoading = false;
        state.stateCreating.isLoading = false;
        state.stateCreating.status = "rejected";
        state.alertMessage = "No se pudo crear la calificacion";
        state.alertType = "error";
      })
      .addCase(createMark.fulfilled, (state) => {
        state.isLoading = false;
        state.stateCreating.isLoading = false;
        state.stateCreating.status = "completed";
        state.alertMessage = "Se creó la calificacion correctamente";
        state.alertType = "success";
      });
  },
});

export const { hideAlert, resetStates } = teacherSubjectSlice.actions;
export default teacherSubjectSlice.reducer;
