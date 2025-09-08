import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type FavoritesState = {
  ids: string[]
}

const STORAGE_KEY = 'tt_favorites'

function loadFromStorage(): FavoritesState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { ids: [] }
}

const initialState: FavoritesState = loadFromStorage()

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id)
      } else {
        state.ids.push(id)
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      } catch {}
    },
    clearFavorites(state) {
      state.ids = []
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      } catch {}
    },
  },
})

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer

