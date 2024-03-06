
import { createSlice } from '@reduxjs/toolkit';

export const selectedOptionsSlice = createSlice({
  name: 'selectedOptions',
  initialState: [],
  reducers: {
    setSelected: (state, action) => action.payload,
    clearSelected: () => []
  }
});


export const { setSelected, clearSelected } = selectedOptionsSlice.actions;
export default selectedOptionsSlice.reducer;