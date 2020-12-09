import React from 'react';

const Rating = ({ value, numReviews, color }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (value - i >= 1) {
      stars.push(<i style={{ color }} className='fas fa-star' />);
    } else if (value - i >= 0.5) {
      stars.push(<i style={{ color }} className='fas fa-star-half-alt' />);
    } else {
      stars.push(<i style={{ color }} className='far fa-star' />);
    }
  }

  return (
    <div className='rating my-3'>
      {stars}
      <span>{`${numReviews} reviews`}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

export default Rating;
