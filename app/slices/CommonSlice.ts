import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';



export interface CommonState {
  defaultResult: number;
  loading: boolean,
  slideUpPanelConfig: object,


}

const initialState: CommonState = {
  defaultResult: 0,
  loading: false,
  slideUpPanelConfig: {
    visible: false,
    btnCancel: () => { },
    isLoggedIn: false,
  },
}



export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeLoadingStatus: (state, action: PayloadAction<boolean> ) => {
      state.loading =  action.payload
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
        // case SHOW_ADVERTICE_MODAL:
        //   return {...state, adverticeModalConfig: action.payload};

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

})

// Action creators are generated for each case reducer function
export const { changeLoadingStatus,changeSlideUpObj } = commonSlice.actions

export default commonSlice.reducer