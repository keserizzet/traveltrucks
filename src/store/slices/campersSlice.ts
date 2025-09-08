import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchCampers } from '../../api/client'
import type { Camper } from '../../api/client'

export type CampersState = {
  items: Camper[]
  page: number
  hasMore: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string
}

const initialState: CampersState = {
  items: [],
  page: 1,
  hasMore: true,
  status: 'idle',
}

export const loadCampers = createAsyncThunk(
  'campers/load',
  async (params: { page?: number; limit?: number } & Record<string, any> | undefined) => {
    const data = await fetchCampers(params)
    return { data, params }
  },
)

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    reset(state) {
      state.items = []
      state.page = 1
      state.hasMore = true
      state.status = 'idle'
      state.error = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCampers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadCampers.fulfilled, (state, action) => {
        const incoming = action.payload.data
        const page = action.payload.params?.page ?? 1
        if (page === 1) {
          state.items = incoming
        } else {
          state.items = state.items.concat(incoming)
        }
        state.page = page
        state.hasMore = incoming.length > 0
        state.status = 'succeeded'
      })
      .addCase(loadCampers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { reset } = campersSlice.actions
export default campersSlice.reducer

