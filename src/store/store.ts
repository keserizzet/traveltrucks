import { configureStore } from '@reduxjs/toolkit'
import campers from './slices/campersSlice'
import filters from './slices/filtersSlice'
import favorites from './slices/favoritesSlice'

export const store = configureStore({
  reducer: {
    campers,
    filters,
    favorites,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

