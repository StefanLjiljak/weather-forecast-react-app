import React, { useEffect, useState } from 'react';
import './sass/app.scss';
import TopSection from './components/top/index';
import BottomSection from './components/bottom/index';
import Axios from 'axios';

const WEATHER_KEY = '361aa3228c477ed3d205d8c2950b57b2';

function App(props) {
  const year = new Date().getFullYear();
  const [temp_c, setTemp_c] = useState(10);
  const [isDay, setIsDay] = useState('');
  const [text, setText] = useState('');
  const [iconURL, setIconURL] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [cityName, setCityName] = useState('Belgrade');
  const [region, setregion] = useState('Central Serbia');
  const [forcastDays, setforcastDays] = useState({});

  useEffect(() => {
    const { eventEmitter } = props;

    const updateWeather = () => {
      const URL = `http://api.weatherstack.com/forecast?access_key=${WEATHER_KEY}&query=${cityName}`;
      Axios(URL)
        .then((res) => {
          if (res.data.success === false) {
            setCityName('Belgrade');
            setregion('Central Serbia');
            alert('Unknown City or Region');
          }
          return res.data;
        })
        .then((data) => {
          if (data.request.type === 'LatLon') {
            setCityName(data.location.name);
          }
          setIsLoading(false);
          setTemp_c(data.current.temperature);
          setIsDay(data.current.is_day);
          setText(data.current.weather_descriptions);
          setIconURL(data.current.weather_icons);
          setregion(data.location.region);
          setforcastDays(Object.values(data.forecast)[0].astro);
        })
        .catch((err) => console.error(`Can't fetch data from API ${err}`));
    };

    updateWeather();

    eventEmitter.on('updateWeather', (data) => {
      setCityName(data);
    });
  }, [cityName, props]);

  return (
    <>
      <div className="app-container">
        <div className="main-container">
          {isLoading && <h3>Loading Weather Forecast...</h3>}
          {!isLoading && (
            <div className="top-section">
              <TopSection
                location={cityName}
                region={region}
                temp_c={temp_c}
                isDay={isDay}
                text={text}
                iconURL={iconURL}
                eventEmitter={props.eventEmitter}
              />
            </div>
          )}
          <div className="bottom-section">
            <BottomSection forcastDays={forcastDays} />
          </div>
        </div>
      </div>
      <footer>
        Stefan
        <span role="img" aria-label=".">
          😈
        </span>{' '}
        Ljiljak &copy; <span>{year}</span>
      </footer>
    </>
  );
}

export default App;
