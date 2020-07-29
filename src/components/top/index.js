import React, { useState } from 'react';
import './style.scss';
import Weather from './weather';
import { Manager, Reference, Popper } from 'react-popper';

const TopSection = (props) => {
  const [isSelectLocationOpen, setisSelectLocationOpen] = useState(false);

  const [locationName, setlocationName] = useState('');

  const onLocationNameChange = (e) => {
    setlocationName(e.target.value);
  };

  const onSelectCity = () => {
    const { eventEmitter } = props;
    eventEmitter.emit('updateWeather', locationName);
    setisSelectLocationOpen(false);
  };

  const onToggleSelectLocation = () => {
    setisSelectLocationOpen(!isSelectLocationOpen);
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert('Geolocation is not supported by this browser.');
    }

    function showPosition(position) {
      setlocationName(
        `${position.coords.latitude},${position.coords.longitude}`
      );
      const { eventEmitter } = props;
      if (locationName !== null) {
        eventEmitter.emit('updateWeather', locationName);
      }
    }
  }

  return (
    <div className="top-container">
      <div className="title">Weather Forecast App</div>
      <Weather {...props} />
      <Manager>
        <Reference>
          {({ ref }) => (
            <>
              <button
                className="btn btn-select-location"
                ref={ref}
                onClick={onToggleSelectLocation}
              >
                Select Location
              </button>
              <button
                className="btn btn-select-location"
                ref={ref}
                onClick={getLocation}
              >
                Your Location
              </button>
            </>
          )}
        </Reference>
        <Popper placement="top">
          {({ ref, style, placement, arrowProps }) =>
            isSelectLocationOpen && (
              <div
                className="popup-container"
                ref={ref}
                style={style}
                data-placement={placement}
              >
                <div className="form-container">
                  <label htmlFor="location-name">Location Name</label>
                  <input
                    id="location-name"
                    type="text"
                    placeholder="City Name"
                    onChange={onLocationNameChange}
                  />
                  <button
                    className="btn btn-select-location"
                    onClick={onSelectCity}
                  >
                    Select
                  </button>
                </div>
                <div ref={arrowProps.ref} style={arrowProps.style} />
              </div>
            )
          }
        </Popper>
      </Manager>
    </div>
  );
};

export default TopSection;
