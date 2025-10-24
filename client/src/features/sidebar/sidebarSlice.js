import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  isOpened: false
}


const sidebarSlice = createSlice({

  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpened = !state.isOpened;
      console.log(state.isOpened);
    }
  }

});


export const { toggleSidebar } = sidebarSlice.actions;
export const sidebarReducer = sidebarSlice.reducer;