/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import Admin from './layout/Admin';
import Client from './layout/Client';
import { movieActions } from './redux-toolkit/slice/movie';
import { publicActions } from './redux-toolkit/slice/public';
import { PrivateRoutes, PublicRoutes } from './Router';

function App() {
  const location = useLocation();

  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const isSelected = useSelector((state) => state.movie.isSelected);
  useEffect(() => {
    const selectMovie = () => {
      if (
        location.pathname.split('/')[1] === 'phim' ||
        location.pathname.split('/')[1] === 'xem-phim'
      )
        dispatch(movieActions.selecting(location.pathname.split('/')[2]));

      if (
        isSelected &&
        (location.pathname.split('/')[1] !== 'phim' ||
          location.pathname.split('/')[1] !== 'xem-phim')
      )
        dispatch(movieActions.unSelected());
    };
    selectMovie();
  }, [location]);

  useEffect(() => {
    const fetchPublicData = () => {
      dispatch(publicActions.loadingData());
    };
    fetchPublicData();
  }, []);

  return (
    <div className="app">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Client />}>
          {PublicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route path={route.path} key={index} element={<Page />} />;
          })}
        </Route>

        {/* Admin routes */}
        {role && role === 'admin' ? (
          <Route path="/admin" element={<Admin />}>
            {PrivateRoutes.map((route, index) => {
              const Page = route.component;
              return <Route path={route.path} key={index} element={<Page />} />;
            })}
          </Route>
        ) : (
          <></>
        )}
      </Routes>
    </div>
  );
}

export default App;
