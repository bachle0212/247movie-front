import { createSlice } from '@reduxjs/toolkit';

const initState = {
  movieList: [],
  movieSelected: [],
  userList: [],
  slideList: [],
  loading: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState: initState,
  reducers: {
    fetchMovieList(state, action) {
      state.loading = true;
    },
    fetchMovieListSuccess(state, action) {
      state.movieList = action.payload;
      state.loading = false;
    },
    fetchMovieListFailed(state, action) {
      state.loading = false;
    },
    fetchUserList(state, action) {
      state.loading = true;
    },
    fetchUserListSuccess(state, action) {
      state.loading = false;
      state.userList = action.payload;
    },
    fetchUserListFailed(state, action) {
      state.loading = false;
    },
    fetchSlideList(state, action) {
      state.loading = true;
    },
    fetchSlideListSuccess(state, action) {
      state.loading = false;
      state.slideList = action.payload;
    },
    fetchSlideListFailed(state, action) {
      state.loading = false;
    },
    createNewMovie(state, action) {
      state.loading = true;
    },
    createNewMovieSuccess(state, action) {
      state.loading = false;
      state.movieList = action.payload;
    },
    createNewMovieFailed(state, action) {
      state.loading = false;
    },
    createNewEpisode(state, action) {
      state.loading = true;
    },
    createNewEpisodeSuccess(state, action) {
      state.loading = false;
    },
    createNewEpisodeFailed(state, action) {
      state.loading = false;
    },
    createNewSlice(state, action) {
      state.loading = true;
    },
    createNewSlide(state, action) {
      state.loading = true;
    },
    createNewSlideSuccess(state, action) {
      state.loading = false;
      state.slideList = action.payload;
    },
    createNewSlideFailed(state, action) {
      state.loading = false;
    },
    updateMovie(state, action) {
      state.loading = true;
    },
    updateMovieSuccess(state, action) {
      state.loading = false;
      state.movieList = action.payload;
    },
    updateMovieFailed(state, action) {
      state.loading = false;
    },
    removeMovie(state, action) {
      state.loading = true;
    },
    removieMovieSuccess(state, action) {
      state.loading = false;
      state.movieList = action.payload;
    },
    removeMovieFailed(state, action) {
      state.loading = false;
    },
  },
});

// Action
export const adminActions = adminSlice.actions;

// Reducers
const adminReducer = adminSlice.reducer;
export default adminReducer;
