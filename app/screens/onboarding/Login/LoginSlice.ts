import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit';
// import auth from '@react-native-firebase/auth';

export interface LoginState {
    isLogin: boolean,
    loading: boolean,
    userId: string,
    errorMessage: string,
    username: string
    
}

const initialState: LoginState = {
  isLogin: false,
  loading: false,
  userId: '',
  errorMessage: '',
  username:'',
}



export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeIsLogin: (state, action: PayloadAction<boolean> ) => {
      state.isLogin =  action.payload
    },
    changeLoadingState: (state, action: PayloadAction<boolean>) =>{
      state.loading = action.payload
    },
    chnageUsername : (state, action: PayloadAction<string>) =>{
      state.username = action.payload
    },
  },
  extraReducers: builder => {
    // builder.addCase(loginUsers.pending, state => {
    //   state.loading = true
    // })
    // builder.addCase(loginUsers.fulfilled, (state, payload: any) => {
    //   console.log("payloadLOading",payload.payload.uid)
    //   state.userId = payload.payload.uid
    //   state.loading = false
    // })
    // builder.addCase(loginUsers.rejected, (state, payload: any) => {
    //   console.log("errorMessage",payload)
    //   state.loading = false
    //   state.errorMessage = payload
    // })
  }
})

// Action creators are generated for each case reducer function
export const { changeIsLogin,changeLoadingState,chnageUsername} = loginSlice.actions

export default loginSlice.reducer