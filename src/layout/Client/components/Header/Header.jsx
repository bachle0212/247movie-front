import React from 'react';
import './style.scss';
import convertToUrl from '../../../../utils/convertToUrl';
// react-redux
import { useDispatch, useSelector } from 'react-redux';
// react-router-dom
import { Link } from 'react-router-dom';
import { useNavigate, createSearchParams } from 'react-router-dom';
// react-icon
import { GoSearch } from 'react-icons/go';
import { FaUserCircle } from 'react-icons/fa';
// react-hook-form
import { useForm } from 'react-hook-form';
// react-bootstrap
import { Button, Form, FormControl, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
// Components
import { authActions } from '../../../../redux-toolkit/slice/auth';
// img
import logo from '../../../../assets/photos/logo.svg';

// import { years, genres, countries } from '../../../../assets/category/index';

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const genres = useSelector((state) => state.public.genres);
  const countries = useSelector((state) => state.public.countries);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const years = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

  // Default list series movie
  const phimBo = [
    { name: 'Phim bộ Anh', name_URL: 'anh' },
    { name: 'Phim bộ Hàn Quốc', name_URL: 'han-quoc' },
    { name: 'Phim bộ Mỹ', name_URL: 'my' },
    { name: 'Phim bộ Trung Quốc', name_URL: 'trung-quoc' },
    { name: 'Phim bộ Nhật Bản', name_URL: 'anh' },
    { name: 'Phim bộ Thái Lan', name_URL: 'han-quoc' },
  ];
  const handleSubmitSearch = (data) => {
    let name = data.name;
    reset();
    navigate({
      pathname: '/tim-kiem',
      search: `?${createSearchParams({
        name: convertToUrl(name),
      })}`,
    });
  };

  const handleUserLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" variant="dark" className="header">
      {/* Navbar brand */}
      <Link to="/" style={{ marginLeft: '15px' }}>
        <Navbar.Brand>
          <img
            src={logo}
            className="d-inline-block align-top header__brand"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
      </Link>

      {/* Navbar toggle  */}
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        {/* Navbar menu */}
        <Nav className="header__menu">
          <NavDropdown title="Phim lẻ" id="phimle-dropdown" className=" header__menu-item">
            {years.map((item, index) => {
              return (
                <Link
                  to={`/phim-le/${item}`}
                  type_movie="phimle"
                  year={item}
                  key={index}
                  className="dropdown-item"
                >
                  Phim lẻ {item}
                </Link>
              );
            })}
          </NavDropdown>
          <NavDropdown title="Phim bộ" id="phimbo-dropdown" className="header__menu-item">
            {phimBo.map((item, index) => {
              return (
                <Link
                  to={`/phim-bo/${item.name_URL}`}
                  type_movie="phimbo"
                  key={index}
                  className="dropdown-item"
                >
                  {item.name}
                </Link>
              );
            })}
          </NavDropdown>
          <NavDropdown title="Quốc gia" id="quociga-dropdown" className="header__menu-item">
            {countries ? (
              countries.map((item, index) => {
                return (
                  <Link to={`/quoc-gia/${item.name_URL}`} key={index} className="dropdown-item">
                    {item.name}
                  </Link>
                );
              })
            ) : (
              <></>
            )}
          </NavDropdown>
          <NavDropdown title="Thể loại" id="theloai-dropdown" className="header__menu-item">
            {genres ? (
              genres.map((item, index) => {
                return (
                  <Link to={`/the-loai/${item.name_URL}`} key={index} className="dropdown-item">
                    {item.name}
                  </Link>
                );
              })
            ) : (
              <></>
            )}
          </NavDropdown>
          <NavItem
            title="Tin tức"
            className="header__menu-item"
            style={{ alignSelf: 'center', color: '#818181', cursor: 'pointer' }}
          >
            <Link to={'/news'} style={{ color: '#818181' }}>
              Tin tức
            </Link>
          </NavItem>
        </Nav>

        {/* Navbar search */}
        <Form onSubmit={handleSubmit(handleSubmitSearch)} className="d-flex form-search">
          <FormControl
            type="search"
            {...register('name')}
            placeholder="Nhập từ khóa"
            className="search-input"
          />
          <div onClick={handleSubmit(handleSubmitSearch)} className="search-submit">
            <GoSearch />
          </div>
        </Form>

        {/* Navbar account */}
        <Nav className="me-auto navbar__account">
          <div className="navbar__account-avatar ">
            {currentUser?.URL_avatar ? (
              <img src={currentUser.URL_avatar} />
            ) : (
              <FaUserCircle className="account__icon" />
            )}
          </div>
          <NavDropdown
            menuVariant="dark"
            title={currentUser?.username ? currentUser.username : 'Tài khoản'}
            id="account-dropdown"
            className=" nav-item"
          >
            {isLoggedIn ? (
              <>
                <Link to="/tai-khoan" className="dropdown-item">
                  Tài khoản
                </Link>
                <Link to="/phim-yeu-thich" className="dropdown-item">
                  Phim yêu thích
                </Link>
                <Link to="/" className="dropdown-item" onClick={handleUserLogout}>
                  Đăng xuất
                </Link>
              </>
            ) : (
              <>
                <Link to="/dang-nhap" className="dropdown-item">
                  Đăng nhập
                </Link>
                <Link to="/dang-ky" className="dropdown-item">
                  Đăng ký
                </Link>
              </>
            )}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
