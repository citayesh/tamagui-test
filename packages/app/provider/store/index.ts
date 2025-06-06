// store/index.ts
import { Platform } from 'react-native'
import { persistReducer, persistStore } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

import AsyncStorage from '@react-native-async-storage/async-storage'
import storage from 'redux-persist/lib/storage' // web

const selectedStorage = Platform.select({
  web: storage,
  default: AsyncStorage,
})

const persistConfig = {
  key: 'root',
  storage: selectedStorage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/FLUSH', 'persist/PURGE', 'persist/REGISTER'],
      },
    }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
