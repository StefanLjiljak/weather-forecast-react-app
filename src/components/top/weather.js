import React from 'react';

const Weather = ({ ...props }) => {
  return (
    <div className="weather-container">
      <div className="header">
        {props.location}, {props.region}
      </div>
      <div className="inner-container">
        <div className="image">
          <img src={props.iconURL} alt="Sun" />
        </div>
        <div className="current-weather">{props.temp_c}°</div>
      </div>
      <div className="footer">{props.text}</div>
    </div>
  );
};

export default Weather;
