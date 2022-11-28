import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { movieActions } from '../../../redux-toolkit/slice/movie';
import { BsPlayCircle, BsFillEyeFill, BsStarFill } from 'react-icons/bs';
import './style.scss';
import Rate from '../../Rate';

Movie.propTypes = {
  movie: PropTypes.object,
};

function Movie(props) {
  const dispatch = useDispatch();

  const handleOpenMovie = () => {
    dispatch(movieActions.isSelected, props.movie._id);
  };

  return (
    <div className="movie col-lg-2 col-md-3 col-sm-4 col-6">
      <Link className="movie-url" to={`/phim/${props.movie.name_URL}`} onClick={handleOpenMovie}>
        <div className="img-4-6">
          <div className="inline">
            <img src={props.movie.URL_image} alt={props.movie.other_name} />
            <BsPlayCircle className="icon-play" />
          </div>
          <span className="movie-episode">full</span>
        </div>
        <h3 className="movie-name">{props.movie.name}</h3>
        <p className="movie-other_name">{props.movie.other_name}</p>
      </Link>
      <div className="func">
        <div className="views">
          <BsFillEyeFill className="icon-views" />
          {props.movie.views}
        </div>
        <div className="rating">
          <Rate
            rate={
              props.movie.rate.total === 0 && props.movie.rate.amount === 0
                ? 0
                : props.movie.rate.total / props.movie.rate.amount
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Movie;
