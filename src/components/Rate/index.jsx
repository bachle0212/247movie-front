import React from 'react';
import PropTypes from 'prop-types';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

Rate.propTypes = {
  rate: PropTypes.number,
};

function Rate(props) {
  const starRate = [];
  let fill = Math.floor(props.rate);
  let empty = 5 - Math.ceil(props.rate);
  let half = 5 - fill - empty;
  for (let i = 0; i < fill; i++) starRate.push(<BsStarFill style={{ color: 'orange' }} key={i} />);
  if (half === 1) starRate.push(<BsStarHalf style={{ color: 'orange' }} key={fill + 1} />);
  for (let i = half + fill + 1; i <= 5; i++)
    starRate.push(<BsStar style={{ color: 'orange' }} key={i} />);

  return <>{starRate}</>;
}

export default Rate;
