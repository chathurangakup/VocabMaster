import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { VERSION_CHECK_API_URL } from '../utils/constants';



export interface CommonState {
  defaultResult: number;
  loading: boolean,
  slideUpPanelConfig: object,
  isConnectedInternet:boolean,
  versionInfo: any,
  errorMessage: string


}

const initialState: CommonState = {
  defaultResult: 0,
  loading: false,
  slideUpPanelConfig: {
    visible: false,
    btnCancel: () => { },
    isLoggedIn: false,
  },
  isConnectedInternet:false,
  versionInfo:[],
  errorMessage:''
}




export const getVersionInfo = createAsyncThunk("lessons/getVersionInfo", async () => {
  global.store.dispatch(changeLoadingStatus(true))
  const response = await fetch(VERSION_CHECK_API_URL);
  const jsonData = await response.json();
  console.log("jsonData",jsonData)
  global.store.dispatch(changeLoadingStatus(false))
  return jsonData;
});


export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeLoadingStatus: (state, action: PayloadAction<boolean> ) => {
      state.loading =  action.payload
    },
    changeInternetConnectionStatus: (state, action: PayloadAction<boolean> ) => {
      state.isConnectedInternet =  action.payload
    },
    changeSlideUpObj: (state, action: PayloadAction<any>) => {
      console.log("changeSlideUpObj nnnnnnn", action.payload.type)
      switch (action.payload.type) {
       // case DEFALUT:
        //   return {...state, defaultResult: initialState.defaultResult};
        // case UPDATE_LOADING_SPINNER_STATE:
        //   return {...state, loading: action.payload};
        case 'SHOW_BOTTOM_ALERT':
          return { ...state, slideUpPanelConfig: action.payload };
        case 'HIDE_BOTTOM_ALERT':
          return { ...state, slideUpPanelConfig: initialState.slideUpPanelConfig };
        // case LOGIN:
        //   return {...state, isLoggedIn: action.payload};
        // case CHECK_LOGIN:
        //   return {...state, isLoggedIn: action.payload};
        // case LOGOUT:
        //   return {...state, isLoggedIn: action.payload};
        default:
          return state;
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getVersionInfo.pending, state => {
      state.loading = true
    })
    builder.addCase(getVersionInfo.fulfilled, (state, payload: any) => {
      console.log("payloadLOading",payload.payload)
      state.versionInfo = payload.payload
      state.loading = false
    })
    builder.addCase(getVersionInfo.rejected, (state, payload: any) => {
      console.log("errorMessage",payload)
      state.loading = false
      state.errorMessage = payload
    })
  }

})

// Action creators are generated for each case reducer function
export const { changeLoadingStatus,changeSlideUpObj,changeInternetConnectionStatus } = commonSlice.actions

export default commonSlice.reducer