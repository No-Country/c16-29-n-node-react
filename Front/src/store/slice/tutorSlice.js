import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../utils/axios";
import { getAccessToken } from "../../utils/accessToken";

//crear Tutor
export const createTutor = createAsyncThunk(
  "tutor/createTutor",
  async (tutorData, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      const response = await AxiosInstance.post("/users", tutorData, {
        headers: { "X-Access-Token": token },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

//Obtener Students
export const getStudents = createAsyncThunk(
  "tutor/getStudents",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      const response = await AxiosInstance.post(
        "/users/role",
        { role: "STUDENT" },
        {
          headers: { "X-Access-Token": token },
        }
      );
      return response.data.map((student) => ({
        id: student.id,
        value: student.id,
        label: `${student.firstName} ${student.lastName}`,
      }));
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

//Obtener los datos de tutors y students
export const fetchTutor = createAsyncThunk(
  "tutor/fetchTutor",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      const tutorsResponse = await AxiosInstance.post(
        "/users/role",
        { role: "TUTOR" },
        {
          headers: { "X-Access-Token": token },
        }
      );
      return {
        tutors: tutorsResponse.data,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Editar Tutor
export const updateTutor = createAsyncThunk(
  "tutor/updateTutor",
  async ({ id, tutorData }, thunkAPI) => {
    try {
        const token = getAccessToken();
      const response = await AxiosInstance.put(`/users/${id}`, tutorData,
      {
        headers: { "X-Access-Token": token },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//Eliminar profesor
export const deleteTutor =createAsyncThunk(
    'tutor/deleteTutor',
    async(tutorId, {rejectWithValue})=>{
      try{
        const token = getAccessToken();

        await AxiosInstance.delete(`users/${tutorId}`,{
            headers: { "X-Access-Token": token },
          });
        return tutorId;
  
      }catch (error){
        return rejectWithValue(error.toString());
      }
    }
  )

  //alert
  export const showAlert = createAction("tutor/showAlert");
  export const hideAlert = createAction("tutor/hideAlert");

const initialState = {
  tutors: [],
  students: [],
  isLoading: false,
  error: null,
  successMessage: "",
  stateCreating:false,
  stateUpdating:false,
  stateDeleting:false,
  stateAlertMessage: "",
  alertType: "",
};

const tutorSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTutor.pending, (state) => {
        state.isLoading = false;
        state.stateCreating = true        
      })
      .addCase(createTutor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stateCreating = false;  
        state.tutors.push(action.payload);
        state.successMessage = "Tutor creado con éxito!";
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = action.payload;
      })
      .addCase(fetchTutor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTutor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tutors = action.payload.tutors;
      })
      .addCase(updateTutor.pending, (state) => {
        state.stateUpdating = true;
        state.isLoading = true;
      })
      .addCase(updateTutor.fulfilled, (state, action) => {
        state.stateUpdating = false;
        state.isLoading = false;
        const index = state.tutors.findIndex(
          (tutor) => tutor.id === action.payload.id
        );
        if (index !== -1) {
          state.tutors[index] = action.payload;
        }
        state.successMessage = "Tutor actualizado con éxito!";
      })
      .addCase(updateTutor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteTutor.pending, (state) => {
        state.stateDeleting = true;
        state.isLoading = true;
      })
      .addCase(deleteTutor.fulfilled, (state, action) => {
        state.stateDeleting = false;
        state.isLoading = false;       
        state.successMessage = "Tutor eliminado con éxito!";
        state.stateAlertMessage = action.payload = "Tutor eliminado con éxito!";
        state.stateAlertType = action.payload = "success";
      }) 
      .addCase(hideAlert, (state) => {
        state.alertMessage = "";
        state.alertType = "";
      })
  },
});

export const { actions, reducer } = tutorSlice;
export default reducer;
