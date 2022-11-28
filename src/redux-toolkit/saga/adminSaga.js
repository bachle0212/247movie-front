import { call, put, takeEvery } from 'redux-saga/effects';
import adminApi from '../../api/adminApi';
import publicApi from '../../api/publicApi';
import { adminActions } from '../slice/admin';

function* handleFetchMovieList(action) {
  try {
    const res = yield call(publicApi.getMovies, {});
    yield put(adminActions.fetchMovieListSuccess(res.movies));
  } catch (error) {
    console.log(error);
    yield put(adminActions.fetchMovieListFailed);
  }
}

function* handleFetchUserList(action) {
  try {
    const res = yield call(adminApi.getAllUsers);
    yield put(adminActions.fetchUserListSuccess(res.users));
  } catch (error) {
    yield put(adminActions.fetchUserListFailed());
  }
}

function* handleFetchSlideList(action) {
  try {
    const res = yield call(adminApi.getAllUsers);
    yield put(adminActions.fetchSlideListSuccess(res.users));
  } catch (error) {
    yield put(adminActions.fetchSlideListFailed());
  }
}

function* handleUpdateMovie(action) {
  try {
    yield call(adminApi.updateMovie, action.payload.movieID, action.payload.update);
    const resMovies = yield call(publicApi.getMovies, {});
    console.log(resMovies);
    yield put(adminActions.updateMovieSuccess(resMovies.movies));
  } catch (error) {
    yield put(adminActions.updateMovieFailed);
  }
}

function* handleAddNewEpisode(action) {}

export default function* adminSaga() {
  yield takeEvery(adminActions.fetchMovieList.type, handleFetchMovieList);
  yield takeEvery(adminActions.fetchUserList.type, handleFetchUserList);
  yield takeEvery(adminActions.fetchSlideList.type, handleFetchSlideList);
  yield takeEvery(adminActions.updateMovie.type, handleUpdateMovie);
}
