import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';



export interface CommonState {
  defaultResult: number;
  loading: boolean


}

const initialState: CommonState = {
  defaultResult: 0,
  loading: false
}



export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeLoadingStatus: (state, action: PayloadAction<boolean> ) => {
      state.loading =  action.payload
    },


  },

})

// Action creators are generated for each case reducer function
export const { changeLoadingStatus } = commonSlice.actions

export default commonSlice.reducer