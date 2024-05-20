import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit';


import { changeLoadingStatus } from '../../slices/CommonSlice';
import { ADVANCE_API_URL, BASIC_API_URL, INTERMEDIATE_API_URL, MESTRY_API_URL } from '../../utils/constants';

interface LessonInfo {
  // Define properties of your lesson information object
  id: number;
  title: string;
  // ... other properties
}

export interface LessonsState {
    lessonsBasicInfo: any,
    lessonsIntermediateInfo: any,
    lessonsAdvanceInfo: any,
    lessonsMesteryInfo: any,
    loading: boolean,
    errorMessage: string
    
}

const initialState: LessonsState = {
  lessonsBasicInfo: [],
  lessonsIntermediateInfo:[],
  lessonsAdvanceInfo:[],
  lessonsMesteryInfo:[],
  loading: false,
  errorMessage: '',
}


export const getBasicLessionInfo = createAsyncThunk("lessons/lessonsBasicInfo", async () => {
  global.store.dispatch(changeLoadingStatus(true))
  const response = await fetch(BASIC_API_URL);
  const jsonData = await response.json();
  console.log("jsonData",jsonData)
  global.store.dispatch(changeLoadingStatus(false))
  return jsonData;
});

export const getIntermediateLessionInfo = createAsyncThunk("lessons/intermediateLessionInfo", async () => {
  global.store.dispatch(changeLoadingStatus(true))
  const response = await fetch(INTERMEDIATE_API_URL);
  const jsonData = await response.json();
  console.log("jsonData",jsonData)
  global.store.dispatch(changeLoadingStatus(false))
  return jsonData;
});

export const getAdvanceLessionInfo = createAsyncThunk("lessons/advanceLessionInfo", async () => {
  global.store.dispatch(changeLoadingStatus(true))
  const response = await fetch(ADVANCE_API_URL);
  const jsonData = await response.json();
  console.log("jsonData",jsonData)
  global.store.dispatch(changeLoadingStatus(false))
  return jsonData;
});

export const getMestryLessionInfo = createAsyncThunk("lessons/mestryLessionInfo", async () => {
  global.store.dispatch(changeLoadingStatus(true))
  const response = await fetch(MESTRY_API_URL);
  const jsonData = await response.json();
  console.log("jsonData",jsonData)
  global.store.dispatch(changeLoadingStatus(false))
  return jsonData;
});

export const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    changeBasicLessonInfo: (state: { lessonsBasicInfo: any; }, action: any ) => {
      state.lessonsBasicInfo =  action.payload
    },
    changeIntermediateLessonInfo: (state: { lessonsIntermediateInfo: any; }, action: any ) => {
      state.lessonsIntermediateInfo =  action.payload
    },
    changeAdvanceLessonInfo: (state: { lessonsAdvanceInfo: any; }, action: any ) => {
      state.lessonsAdvanceInfo =  action.payload
    },
    changeMesteryLessonInfo: (state: { lessonsMesteryInfo: any; }, action: any ) => {
      state.lessonsMesteryInfo =  action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getBasicLessionInfo.pending, state => {
      state.loading = true
    })
    builder.addCase(getBasicLessionInfo.fulfilled, (state, payload: any) => {
      console.log("payloadLOading",payload.payload)
      state.lessonsBasicInfo = payload.payload
      state.loading = false
    })
    builder.addCase(getBasicLessionInfo.rejected, (state, payload: any) => {
      console.log("errorMessage",payload)
      state.loading = false
      state.errorMessage = payload
    })

    builder.addCase(getIntermediateLessionInfo.pending, state => {
      state.loading = true
    })
    builder.addCase(getIntermediateLessionInfo.fulfilled, (state, payload: any) => {
      console.log("payloadLOading",payload.payload)
      state.lessonsIntermediateInfo = payload.payload
      state.loading = false
    })
    builder.addCase(getIntermediateLessionInfo.rejected, (state, payload: any) => {
      console.log("errorMessage",payload)
      state.loading = false
      state.errorMessage = payload
    })

    builder.addCase(getAdvanceLessionInfo.pending, state => {
      state.loading = true
    })
    builder.addCase(getAdvanceLessionInfo.fulfilled, (state, payload: any) => {
      console.log("payloadLOading",payload.payload)
      state.lessonsAdvanceInfo = payload.payload
      state.loading = false
    })
    builder.addCase(getAdvanceLessionInfo.rejected, (state, payload: any) => {
      console.log("errorMessage",payload)
      state.loading = false
      state.errorMessage = payload
    })


    builder.addCase(getMestryLessionInfo.pending, state => {
      state.loading = true
    })
    builder.addCase(getMestryLessionInfo.fulfilled, (state, payload: any) => {
      console.log("payloadLOading",payload.payload)
      state.lessonsMesteryInfo = payload.payload
      state.loading = false
    })
    builder.addCase(getMestryLessionInfo.rejected, (state, payload: any) => {
      console.log("errorMessage",payload)
      state.loading = false
      state.errorMessage = payload
    })
  }
})

// Action creators are generated for each case reducer function
export const { changeBasicLessonInfo,changeIntermediateLessonInfo,changeAdvanceLessonInfo,changeMesteryLessonInfo } = lessonsSlice.actions

export default lessonsSlice.reducer