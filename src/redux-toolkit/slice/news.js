import { createSlice } from '@reduxjs/toolkit';

const initState = {
  isLoading: false,
  reviewPhim: false,
  phimChieuRap: false,
  blogPhim: false,
  blogSao: false,
};

const newsState = createSlice({
  name: 'news',
  initialState: initState,
  reducers: {
    loadingData(state, action) {
      state.isLoading = true;
    },

    loadedPublicData(state, action) {
      state.isLoading = false;
      state.countries = action.payload.countries;
      state.genres = action.payload.genres;
      state.slides = action.payload.slides;
    },
  },
});

// Actions
export const newsAction = newsState.actions;

// Reducer
const newsReducer = newsAction.reducer;
export default newsReducer;
