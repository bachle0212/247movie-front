import React, { useState } from 'react';
import { BsStarFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { movieActions } from '../../redux-toolkit/slice/movie';
import './style.scss';

Rating.propTypes = {};

function Rating(props) {
  const dispatch = useDispatch();
  const stars = [1, 2, 3, 4, 5];

  const [hoverValue, setHoverValue] = useState(0);

  const handleOnClick = (rate) => {
    // setCurrentValue(rate);

    dispatch(movieActions.updateRate({ movieID: props.movieID, value: rate }));
  };

  const handleOnMouseOver = (index) => {
    setHoverValue(index);
  };

  const handleOnMouseLeave = () => {
    setHoverValue(0);
  };

  return (
    <div>
      {stars.map((star, index) => {
        return (
          <BsStarFill
            className={`star 
              ${Math.round(props.total / props.amount) >= star ? 'star-rated' : ' '}
              ${hoverValue >= star ? 'star-on' : 'star-off'}
              `}
            key={star}
            onClick={() => handleOnClick(star)}
            onMouseOver={() => handleOnMouseOver(star)}
            onMouseLeave={() => handleOnMouseLeave()}
          />
        );
      })}
      {props.amount === 0 ? 0 : (props.total / props.amount).toFixed(1)}/5 ({props.amount} bình chọn
      )
    </div>
  );
}

export default Rating;
