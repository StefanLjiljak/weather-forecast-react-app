import React from 'react';
import './style.scss';
import Forcastday from './forcastday';

const BottomSection = (props) => {
  return (
    <div className="bottom-container">
      <Forcastday
        moon_phase={props.forcastDays.moon_phase}
        moonrise={props.forcastDays.moonrise}
        sunrise={props.forcastDays.sunrise}
        sunset={props.forcastDays.sunset}
      />
    </div>
  );
};

export default BottomSection;
