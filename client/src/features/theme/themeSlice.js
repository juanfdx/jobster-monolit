import { createSlice } from '@reduxjs/toolkit';



const checkThemeFromLocalStorage = () => {
  const isDarkTheme = localStorage.getItem('theme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
}

const initialState = {
  isDarkTheme: checkThemeFromLocalStorage(),
};



const themeSlice = createSlice({

  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
      document.body.classList.toggle('dark-theme', state.isDarkTheme);
      localStorage.setItem('theme', state.isDarkTheme);
    }
  }

});



export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;