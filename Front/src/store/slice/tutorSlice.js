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
        return rejectWithValue(error.response.data);
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
  stateCreating: {
    isLoading: false,
    status: "idle"
  },
  stateUpdating: {
    isLoading: false,
    status: "idle"
  },
  stateDeleting: {
    isLoading: false,
    status: "idle"
  },
  stateAlertMessage: "",
  alertType: "",
};

const tutorSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {
    resetStates: (state) => {
      state.stateCreating = {
        isLoading: false,
        status: "idle"
      }
      state.stateUpdating = {
        isLoading: false,
        status: "idle"
      }
      state.stateDeleting = {
        isLoading: false,
        status: "idle"
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTutor.pending, (state) => {
        state.isLoading = false;
        state.stateCreating.isLoading = true        
      })
      .addCase(createTutor.rejected, (state) => {
        state.isLoading = false;
        state.stateCreating.isLoading = false        
        state.stateDeleting.status = "rejected";
        state.stateAlertMessage = "No se pudo crear el tutor";
        state.alertType = "error";
      })
      .addCase(createTutor.fulfilled, (state) => {
        state.isLoading = false;
        state.stateCreating.isLoading = false;  
        state.stateDeleting.status = "completed";
        state.stateAlertMessage = "Tutor creado con éxito!";
        state.alertType = "success";
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
        state.stateUpdating.isLoading = true;
        state.isLoading = true;
      })
      .addCase(updateTutor.rejected, (state, action) => {
        state.stateUpdating.isLoading = false;
        state.isLoading = false;
        state.error = action.payload;
        state.stateDeleting.status = "rejected";
        state.stateAlertMessage = "No se ha podido actualizar el tutor!";
        state.alertType = "error";
      })
      .addCase(updateTutor.fulfilled, (state) => {
        state.stateUpdating.isLoading = false;
        state.isLoading = false;
        state.stateDeleting.status = "completed";
        state.stateAlertMessage = "Tutor actualizado con éxito!";
        state.alertType = "success";
      })
      .addCase(deleteTutor.pending, (state) => {
        state.stateDeleting.isLoading = true;
        state.isLoading = true;
      })
      .addCase(deleteTutor.rejected, (state, action) => {
        state.stateDeleting.isLoading = false;
        state.stateDeleting.status = "rejected";
        state.stateAlertMessage = action.payload.message;
        state.alertType = "error";
      })
      .addCase(deleteTutor.fulfilled, (state) => {
        state.isLoading = false;       
        state.stateDeleting.isLoading = false;
        state.stateDeleting.status = "completed";
        state.stateAlertMessage = "Tutor eliminado con éxito!";
        state.alertType = "success";
      }) 
      .addCase(hideAlert, (state) => {
        state.stateAlertMessage = "";
        state.alertType = "";
      })
  },
});

export const { resetStates } = tutorSlice.actions;
export default tutorSlice.reducer;
