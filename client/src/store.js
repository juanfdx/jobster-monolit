import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from './features/theme/themeSlice';
import { sidebarReducer } from './features/sidebar/sidebarSlice';



export const store = configureStore({

  reducer: {
    themeState: themeReducer,
    sidebarState: sidebarReducer
  }
  
});