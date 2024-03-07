
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from "../../utils/axios";
import { getAccessToken } from '../../utils/accessToken';


//crear Materia
export const createSubject = createAsyncThunk(
  'subject/createSubject',
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
  'subject/updateSubject',
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
  'subject/deleteSubject',
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
  'principal-subject/fetchSubjects',
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
  'principal-subject/fetchTeachers',
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
  error: null,
  successMessage: '',
  stateCreating: false,
  stateUpdating: false,
  stateDeleting: false
};

const principalSubjectSlice = createSlice({
  name: 'principal-subject',
  initialState,
  reducers: {},
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
        state.stateCreating = true;
      })
      .addCase(createSubject.fulfilled, (state) => {
        state.isLoading = false;
        state.stateCreating = false;
      })
      .addCase(updateSubject.pending, (state) => {
        state.isLoading = true;
        state.stateUpdating = true;
      })
      .addCase(updateSubject.fulfilled, (state) => {
        state.isLoading = false;
        state.stateUpdating = false;
      })
      .addCase(deleteSubject.pending, (state) => {
        state.isLoading = true;
        state.stateDeleting = true;
      })
      .addCase(deleteSubject.fulfilled, (state) => {
        state.isLoading = false;
        state.stateDeleting = false;
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

export default principalSubjectSlice.reducer;