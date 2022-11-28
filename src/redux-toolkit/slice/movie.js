import { createSlice } from '@reduxjs/toolkit';

const initState = {
  _id: undefined,
  isSelecting: false,
  isSelected: false,
  isUpdate: false,
  isUpdating: false,
  isUpdated: false,
  currentEpisode: undefined,
  currentMovie: undefined,
  episodeSelected: undefined,
  infoMovieSelected: undefined,
  commentsMovieSelected: undefined,
  updateInfoSucces: false,
  updateComments: false,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState: initState,
  reducers: {
    selecting(state) {
      state.isSelecting = true;
    },
    selectedSuccess(state, action) {
      state.isSelecting = false;
      state.isSelected = true;
      state.currentMovie = action.payload;
    },
    selectedFailed(state, action) {
      state.isSelecting = false;
      state.isSelected = false;
    },
    unSelected(state, action) {
      state._id = undefined;
      state.isSelecting = false;
      state.isSelected = false;
      state.currentMovie = undefined;
      state.commentsMovieSlelected = undefined;
      state.currentEpisode = undefined;
      state.infoMovieSelected = undefined;
    },
    updateView(state, action) {
      state.isUpdating = true;
    },
    updateLike(state, action) {
      state.isUpdating = true;
    },
    updateMovieSuccess(state, action) {
      state._id = action.payload._id;
      state.updateComments = false;
      state.isSelected = true;
      state.isUpdate = false;
      state.isUpdating = false;
      state.isUpdated = true;
      state.currentMovie = action.payload;
    },
    updateCurrentEpisode(state, action) {
      state.currentEpisode = action.payload;
    },

    isSelecting(state, action) {
      state.isSelecting = true;
    },
    isSelected(state, action) {
      state._id = action.payload._id;
      state.isSelecting = false;
      state.isSelected = true;
      state.currentMovie = action.payload;
      state.commentsMovieSelected = action.payload.comments;

      state.infoMovieSelected = {
        _id: action.payload._id,
        name: action.payload.name,
        name_URL: action.payload.name_URL,
        other_name: action.payload.other_name,
        year: action.payload.year,
        views: action.payload.views,
        likes: action.payload.likes,
        URL_image: action.payload.URL_image,
        description: action.payload.description,
        duration: action.payload.duration,
        director: action.payload.director,
        country: action.payload.country,
        genres: action.payload.genres,
        casts: action.payload.casts,
        rate: action.payload.rate,
        episodes: action.payload.episodes,
      };
    },

    updateMovieFailed(state, action) {
      state.isUpdating = false;
      state.isUpdated = false;
      state.isUpdate = false;
    },

    playMovie(state, action) {
      state.currentEpisode = action.payload.episode;
      state.infoMovieSelected = action.payload.info;
    },

    addNewComment(state, action) {
      state.updateComments = true;
    },
    addNewCommentSuccess(state, action) {
      state.updateComments = false;
      // state.commentsMovieSelected = [...action.payload];
    },
    addNewCommentFailed(state, action) {
      state.updateComments = false;
    },
    updateCurentEpisodeSuccess(state, action) {
      state.currentEpisode = action.payload;
    },
    reloadData(state, action) {
      state.currentMovie = action.payload;
    },
    updateRate(state, action) {
      state.isUpdating = true;
    },
  },
});

// Action
export const movieActions = movieSlice.actions;

// Reducer
const movieReducer = movieSlice.reducer;
export default movieReducer;
