import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type FiltersState = {
  location: string
  vehicleType: string | null
  extras: {
    ac: boolean
    kitchen: boolean
    bathroom: boolean
    tv: boolean
    radio: boolean
    refrigerator: boolean
    microwave: boolean
    gas: boolean
    water: boolean
  }
}

const initialState: FiltersState = {
  location: '',
  vehicleType: null,
  extras: {
    ac: false,
    kitchen: false,
    bathroom: false,
    tv: false,
    radio: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
  },
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload
    },
    setVehicleType(state, action: PayloadAction<string | null>) {
      state.vehicleType = action.payload
    },
    toggleExtra(state, action: PayloadAction<keyof FiltersState['extras']>) {
      const key = action.payload
      state.extras[key] = !state.extras[key]
    },
    resetFilters() {
      return initialState
    },
  },
})

export const { setLocation, setVehicleType, toggleExtra, resetFilters } = filtersSlice.actions
export default filtersSlice.reducer

