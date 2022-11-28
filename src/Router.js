// components
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Profile from './pages/User/Profile';
import PageMovieList from './pages/Movies';
import WatchMovie from './pages/WatchMovie';
import AdminHome from './pages/AdminHome';
import AdminCreateMovie from './pages/AdminCreateMovie';
import AdminCreateSlide from './pages/AdminCreateSlide';
import AdminNews from './pages/AdminNews';

import MovieList from './pages/AdminMovieList';
import UserList from './pages/AdminUserList';
import NotFound from './pages/NotFound';
import LikedMovie from './pages/User/LikedMovie';
import Movie from './pages/Movie';
import Actor from './pages/Actor';
import Watch from './pages/Watch';
import News from './pages/News';
import NewsCategory from './pages/News/NewsCategory';
import NewsDetails from './pages/News/NewsDetails';
const PublicRoutes = [
  { path: '/', component: Home },
  { path: 'dang-ky', component: SignUp },
  { path: 'dang-nhap', component: SignIn },
  { path: 'tai-khoan', component: Profile },
  { path: 'tim-kiem', component: PageMovieList },
  { path: 'phim-yeu-thich', component: LikedMovie },
  { path: 'phim-bo/:genres', component: PageMovieList },
  { path: 'phim-le/:year', component: PageMovieList },
  { path: 'quoc-gia/:country', component: PageMovieList },
  { path: 'the-loai/:genres', component: PageMovieList },
  { path: 'phim/:movie_url', component: WatchMovie },
  { path: 'xem-phim/:movieUrl/:episode_url', component: Watch },
  // test
  { path: 'movie', component: Movie },
  { path: 'actor', component: Actor },
  { path: 'watch/:movie_url/:episode', component: Watch },
  { path: 'news', component: News },
  { path: 'news/:category', component: NewsCategory },
  { path: 'news/:category/:slug', component: NewsDetails },

  //
  { path: '/*', component: NotFound },
];

const PrivateRoutes = [
  { path: '', component: AdminHome },
  { path: 'danh-sach-phim', component: MovieList },
  { path: 'danh-sach-tai-khoan', component: UserList },
  { path: 'trang-chu', component: AdminHome },
  { path: 'tao-phim', component: AdminCreateMovie },
  { path: 'tao-slide', component: AdminCreateSlide },
  { path: 'tao-tin-tuc', component: AdminNews },
];

export { PrivateRoutes, PublicRoutes };
