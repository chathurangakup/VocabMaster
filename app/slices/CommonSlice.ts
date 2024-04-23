import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';



export interface CommonState {
  defaultResult: number;


}

const initialState: CommonState = {
  defaultResult: 0,
}



export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {



  },

})

// Action creators are generated for each case reducer function
export const {  } = commonSlice.actions

export default commonSlice.reducer