import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit';
// import auth from '@react-native-firebase/auth';

interface LessonInfo {
  // Define properties of your lesson information object
  id: number;
  title: string;
  // ... other properties
}

export interface LessonsState {
    lessonsInfo: any,
    loading: boolean,
    errorMessage: string
    
}

const initialState: LessonsState = {
  lessonsInfo: [],
  loading: false,
  errorMessage: '',
}
const apiUrl = 'https://firebasestorage.googleapis.com/v0/b/vocapp-f579a.appspot.com/o/basic.json?alt=media&token=fdaae561-8d5e-463b-85cc-8838c9fdc146';


export const getLessionInfo = createAsyncThunk("lessons/getLessionInfo", async () => {
  const response = await fetch(apiUrl);
  const jsonData = await response.json();
  console.log("jsonData",jsonData)
  return jsonData;
});


export const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
 
  },
  extraReducers: builder => {
    builder.addCase(getLessionInfo.pending, state => {
      state.loading = true
    })
    builder.addCase(getLessionInfo.fulfilled, (state, payload: any) => {
      console.log("payloadLOading",payload.payload)
      state.lessonsInfo = payload.payload
      state.loading = false
    })
    builder.addCase(getLessionInfo.rejected, (state, payload: any) => {
      console.log("errorMessage",payload)
      state.loading = false
      state.errorMessage = payload
    })
  }
})

// Action creators are generated for each case reducer function
// export const { getLessonsInformations} = lessonsSlice.actions

export default lessonsSlice.reducer