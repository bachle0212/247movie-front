import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BsFillEyeFill, BsFillHandThumbsUpFill, BsFillPlayFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { movieActions } from '../../redux-toolkit/slice/movie';
import convertToUrl from '../../utils/convertToUrl';
import Rating from '../Rating';

import './style.scss';

function InformationMovie(props) {
  const [isLike, setIsLike] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state) => state.public.countries);
  const currentMovie = useSelector((state) => state.movie.currentMovie);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handlePlay = () => {
    dispatch(movieActions.updateView(currentMovie._id));
    navigate(`/xem-phim/${currentMovie.name_URL}/${currentMovie.episodes[0].name_URL}`);
  };

  useEffect(() => {
    if (currentUser && currentMovie) {
      let newTypeLike = true;

      currentUser?.liked_movies.forEach((movie) => {
        if (movie === currentMovie._id.toString()) {
          newTypeLike = false;
        }
      });
      setIsLike(newTypeLike);
    }
  }, [currentUser, currentMovie]);

  const handleLikeMovie = async () => {
    if (isLoggedIn) {
      dispatch(movieActions.updateLike({ isLike, movieID: currentMovie._id }));
    }

    if (!isLoggedIn) {
      alert('Bạn chưa đăng nhập. Vui lòng đăng nhập trước');
      navigate('/dang-nhap');
    }
  };

  const handleChangeEpisode = (e) => {
    currentMovie.episodes.map((episode) => {
      if (episode.name === e.target.innerText) {
        dispatch(movieActions.updateView(currentMovie._id));
        window.scrollTo(0, 0);
      }
    });
  };

  const section = currentMovie ? (
    props.type === 'full' ? (
      <div className="information-section">
        <Container>
          <Row className="movie-detail mt-3">
            <Col md={4} xs={12} className=" movie-detail-left">
              <img className="movie-image" src={currentMovie.URL_image} alt={currentMovie.name} />
            </Col>
            <Col md={8} xs={12} className="movie-detail-right">
              <div className="movie-detail-info">
                <h2 className="movie-name">{currentMovie.name}</h2>
                <h4 className="movie-other_name">
                  {currentMovie.other_name} ({currentMovie.year})
                </h4>
                <div className="detail-info-popular row">
                  <div className="detail-info-view col-md-2 col-6">
                    <BsFillEyeFill className="icon" />
                    <span>{currentMovie.views}</span>
                  </div>
                  <div className="detail-info-view col-md-2 col-6">
                    <BsFillHandThumbsUpFill className="icon" />
                    <span>{currentMovie.likes}</span>
                  </div>
                </div>
              </div>

              <Row className="">
                <Col xs={6} md={3} className="">
                  <button className="bth-play" onClick={handlePlay}>
                    <BsFillPlayFill className="icon-play" />
                    PLAY
                  </button>
                </Col>
              </Row>

              <div className="movie-des">
                <p>{currentMovie.description}</p>
              </div>
              <Row className="">
                <Col xs={12} md={6} className="">
                  <ul className="more-info">
                    <li>
                      <span>Thời lượng:</span> {currentMovie.duration} phút
                    </li>
                    <li>
                      <span>Đạo diễn:</span> {currentMovie.director}
                    </li>
                    <li>
                      <span>Quốc gia:</span>{' '}
                      {countries?.map((country) =>
                        country._id === currentMovie.country ? country.name : ''
                      )}
                    </li>
                    <li>
                      <span>Thể loại:</span>
                      {currentMovie.genres?.map((item) => `${item.name}, `)}
                    </li>
                    <li>
                      <span>Năm phát hành:</span> {currentMovie.year}
                    </li>
                    <li>
                      <span>Diễn viên:</span> {currentMovie.casts}
                    </li>
                  </ul>
                </Col>
              </Row>
              <Row className="liking-movie ">
                <Col xs={12} md={3}>
                  <button onClick={handleLikeMovie}>{isLike ? 'Like' : 'Unlike'}</button>
                </Col>
                <Col xs={12} md={9}>
                  <Rating
                    movieID={currentMovie._id}
                    amount={currentMovie.rate.amount}
                    total={currentMovie.rate.total}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <div className="episode-section">
            <div className="episode-section-title">
              <h3>Tập phim</h3>
            </div>
            <ul className="list-movie-episodes">
              {currentMovie.episodes?.map((item, index) => (
                <li className={'movie-episode '} key={index}>
                  <Link
                    onClick={handleChangeEpisode}
                    // to={`/xem-phim/${currentMovie.name_URL}/`}
                    to={`/xem-phim/${currentMovie.name_URL}/` + convertToUrl(item.name)}
                  >
                    {' '}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    ) : (
      <div className="information-section">
        <Container>
          <Row className="movie-detail mt-3">
            <div className="movie-detail-right">
              <div className="movie-detail-info">
                <h2 className="movie-name">{currentMovie.name}</h2>
                <h4 className="movie-other_name">
                  {currentMovie.other_name} ({currentMovie.year})
                </h4>
                <div className="detail-info-popular row">
                  <div className="detail-info-view col-md-2 col-6">
                    <BsFillEyeFill className="icon" />
                    <span>{currentMovie.views}</span>
                  </div>
                  <div className="detail-info-view col-md-2 col-6">
                    <BsFillHandThumbsUpFill className="icon" />
                    <span>{currentMovie.likes}</span>
                  </div>
                </div>
              </div>

              <div className="movie-des">
                <p>{currentMovie.description}</p>
              </div>

              <Row className="liking-movie ">
                <Col xs={12} md={3}>
                  <button onClick={handleLikeMovie}>{isLike ? 'Like' : 'Unlike'}</button>
                </Col>
                <Col xs={12} md={9}>
                  <Rating
                    movieID={currentMovie._id}
                    amount={currentMovie.rate.amount}
                    total={currentMovie.rate.total}
                  />
                </Col>
              </Row>
            </div>
          </Row>

          <div className="episode-section">
            <div className="episode-section-title">
              <h3>Tập phim</h3>
            </div>
            <ul className="list-movie-episodes">
              {currentMovie.episodes?.map((item, index) => (
                <li className={'movie-episode '} key={index}>
                  <Link
                    onClick={handleChangeEpisode}
                    // to={`/xem-phim/${currentMovie.name_URL}/`}
                    to={`/xem-phim/${currentMovie.name_URL}/` + convertToUrl(item.name)}
                  >
                    {' '}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    )
  ) : (
    <></>
  );

  return section;
}

export default InformationMovie;
