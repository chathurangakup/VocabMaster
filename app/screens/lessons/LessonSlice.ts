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
const apiUrl = 'https://firebasestorage.googleapis.com/v0/b/vocapp-f579a.appspot.com/o/basic.json?alt=media&token=27460846-8446-42be-b566-4d8f45161314';


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
    changeBasicLessonInfo: (state: { lessonsInfo: any; }, action: any ) => {
      state.lessonsInfo =  action.payload
    },
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
export const { changeBasicLessonInfo  } = lessonsSlice.actions

export default lessonsSlice.reducer