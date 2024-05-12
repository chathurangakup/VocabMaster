import { configureStore, combineReducers} from '@reduxjs/toolkit';
import { persistStore, persistReducer, Storage } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { MMKV } from 'react-native-mmkv'

import loginReducer from './screens/onboarding/Login/LoginSlice';
import lessonsReducer from './screens/lessons/LessonSlice';
import commonReducer from './slices/CommonSlice';

const combinedReducer = combineReducers({ 
  login: loginReducer,
  common: commonReducer,
  lessons: lessonsReducer
})

const rootReducer = (state: any, action: any) => {
  console.log("state", state)
  console.log("state1", action)
  if (action.type === 'signup/logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

// const storage = new MMKV();



// export const reduxStorage: Storage = {
//   setItem: (key, value) => {
//     storage.set(key, value)
//     return Promise.resolve(true)
//   },
//   getItem: (key) => {
//     const value = storage.getString(key)
//     return Promise.resolve(value)
//   },
//   removeItem: (key) => {
//     storage.delete(key)
//     return Promise.resolve()
//   },
// }

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: (arg0: { serializableCheck: boolean; }) => any) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})
global.store = store;

export const persistor = persistStore(store)



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch