import dayImage from './images/greenhouse-day.jpg';
import nightImage from './images/greenhouse-night.jpg';
import './Greenhouse.css';
import { useTheme } from '../../context/ThemeContext';
import { useContext } from 'react';

import LightSwitch from './LightSwitch';
import ClimateStats from './ClimateStats';

function Greenhouse() {

  const { themeName, setThemeName } = useTheme();

  function showTheme() {
    if (themeName === 'day') {
      return dayImage;
    } else {
      return nightImage;
    }
  }

  return (
    <section>
      <img  className='greenhouse-img'
            src={showTheme()}
            alt='greenhouse' 
      />
      <LightSwitch />
      <ClimateStats />
    </section>
  );
}

export default Greenhouse;