import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { authActions } from '../slice/auth';
import { movieActions } from '../slice/movie';

import publicApi from '../../api/publicApi';
import userApi from '../../api/userApi';
import { ConstructionOutlined } from '@mui/icons-material';

function* handleFetchMovie(action) {
  try {
    const res = yield call(publicApi.getMovieByURL, action.payload);
    yield put(movieActions.selectedSuccess(res.movie));
  } catch (error) {
    yield put(movieActions.selectedFailed);
  }
}

function* handleUpdateLike(action) {
  try {
    // user like or unlike movie
    yield call(userApi.updateLikedMovie, {
      isLike: action.payload.isLike,
      movieID: action.payload.movieID,
    });
    //update likes movie
    const res = yield call(publicApi.getMovie, action.payload.movieID);
    yield put(movieActions.updateMovieSuccess(res.movie));
    const resUser = yield userApi.getProfile();
    const user = resUser.user;
    yield put(authActions.reloadDataSuccess(user));
  } catch (error) {
    yield put(movieActions.updateMovieFailed);
  }
}

function* handleUpdateView(action) {
  try {
    yield call(publicApi.updateViews, action.payload);
    const res = yield call(publicApi.getMovie, action.payload);
    yield put(movieActions.updateMovieSuccess(res.movie));
  } catch (error) {
    yield put(movieActions.updateMovieFailed);
  }
}

function* handleReloadData(action) {
  const res = yield call(publicApi.getMovie, action.payload);
  yield put(movieActions.updateMovieSuccess(res.movie));
}

function* handleCreateNewComment(action) {
  try {
    yield call(userApi.addNewComment, action.payload);
    yield put(movieActions.addNewCommentSuccess);

    const resMovie = yield call(publicApi.getMovie, action.payload.movie);
    yield put(movieActions.reloadData(resMovie.movie));
  } catch (error) {
    console.log(error);
    yield put(movieActions.addNewCommentFailed);
  }
}

function* handleUpdateRate(action) {
  try {
    yield call(publicApi.updateRate, action.payload.movieID, {
      value: action.payload.value,
    });
    const res = yield call(publicApi.getMovie, action.payload.movieID);
    yield put(movieActions.updateMovieSuccess(res.movie));
  } catch (error) {
    yield put(movieActions.updateMovieFailed);
  }
}

export default function* movieSaga() {
  yield takeLatest(movieActions.selecting.type, handleFetchMovie);
  yield takeEvery(movieActions.updateLike.type, handleUpdateLike);
  yield takeEvery(movieActions.updateView.type, handleUpdateView);
  yield takeEvery(movieActions.updateRate.type, handleUpdateRate);
  yield takeEvery(movieActions.addNewComment.type, handleCreateNewComment);
}
