
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from "../../utils/axios";


//crear Profesor
export const createTeacher = createAsyncThunk(
  'profesor/createTeacher',
  async (teacherData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post('/profesores', teacherData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);
//Editar Profesor
export const updateTeacher = createAsyncThunk(
  'profesor/updateTeacher',
  async ({id, teacherData},thunkAPI) => {
    try {
      const response = await AxiosInstance.put(`/profesores/${id}`, teacherData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//Eliminar profesor
export const deleteTeacher =createAsyncThunk(
  'profesor/deleteTeacher',
  async(teacherId, {rejectWithValue})=>{
    try{
      await AxiosInstance.delete(`profesores/${teacherId}`);
      return teacherId;

    }catch (error){
      return rejectWithValue(error.toString());
    }
  }
)

//Obtener los datos de profesores y materias
export const fetchTeacher =createAsyncThunk(
  'profesor/fetchTeacher',
  async (_, { rejectWithValue }) =>{
    try {
      const [teachersResponse] = await Promise.all([
        AxiosInstance.get('/profesores'),
    //    AxiosInstance.get('subjects'),
      ])
      return {
        teachers: teachersResponse.data,
    //    subjects: subjectsResponse.data,
      }

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
); 


const initialState = {
  teachers: [],
  subjects:[],
  isLoading: false,
  error: null,
  successMessage: '',
};

const profesorSlice = createSlice({
  name: 'profesor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teachers.push(action.payload);
        state.successMessage = 'Profesor creado con éxito!';
      })
      .addCase(fetchTeacher.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teachers = action.payload.teachers;
        //state.subjects=action.payload.subjects; // Asume que la respuesta es un arreglo de profesores
      })
      .addCase(updateTeacher.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.teachers.findIndex(teacher => teacher.id === action.payload.id);
        if (index !== -1) {
          state.teachers[index] = action.payload; 
        }
        state.successMessage = 'Profesor actualizado con éxito!';
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteTeacher.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.isLoading=false;
        state.teachers = state.teachers.filter(teacher => teacher.id !== action.payload); // Elimina el profesor por ID
        state.successMessage="Profesor eliminado con éxito"
      });      
  },
});

export const {actions, reducer} = profesorSlice;
export default reducer
