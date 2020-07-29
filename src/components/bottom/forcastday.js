import React from 'react';

const Forcastday = (props) => {
  return (
    <div className="forcast-container">
      <>
        <div className="image">
          <i className="fa fa-moon-o" aria-hidden="true"></i>
        </div>
        <div className="text">
          <p>Moon phase: {props.moon_phase}</p>
          <p>Moonrise: {props.moonrise}</p>
        </div>
      </>
      <>
        <div className="image">
          <i className="fa fa-sun-o" aria-hidden="true"></i>
        </div>
        <div className="text">
          <p>Sunrise: {props.sunrise}</p>
          <p>Sunset: {props.sunset}</p>
        </div>
      </>
    </div>
  );
};

export default Forcastday;
