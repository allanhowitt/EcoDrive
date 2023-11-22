import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  selectedVehicle: null,
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setSelectedVehicle: (state, action) => {
      state.selectedVehicle = action.payload;
    },
  }
});

export const { setOrigin, setDestination, setTravelTimeInformation, setSelectedVehicle } = navigationSlice.actions;

// Selectors
export const selectOrigin = (state) => state.navigation.origin
export const selectDestination = (state) => state.navigation.destination
export const selectTravelTimeInformation = (state) => state.navigation.travelTimeInformation
export const selectSelectedVehicle = (state) => state.navigation.selectedVehicle;

export default navigationSlice.reducer;