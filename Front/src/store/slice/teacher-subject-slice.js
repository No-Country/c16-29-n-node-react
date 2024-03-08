import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../utils/axios";
import { getAccessToken } from "../../utils/accessToken";

// Desasignar estudiante
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

export const fetchSubjectByFullname = createAsyncThunk(
  "teacher-subject/fetchByFullName",
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

const initialState = {
  subject: {},
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
    extraReducers: (builder) => {
      builder
        .addCase(fetchSubjectByFullname.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchSubjectByFullname.fulfilled, (state, action) => {
          state.isLoading = false;
          state.subject = action.payload;
          console.log(action);
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
        });
    },
  },
});

export const { hideAlert, resetStates } = teacherSubjectSlice.actions;
export default teacherSubjectSlice.reducer;