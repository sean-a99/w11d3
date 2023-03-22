import './LightSwitch.css';
import { useContext } from 'react';
import { useTheme } from '../../context/ThemeContext';

function LightSwitch() {
  const { themeName, setThemeName } = useTheme();

  function changeTheme(time) {
    if (time === 'day') {
      setThemeName('day');
    } else {
      setThemeName('night');
    }
  }

  return (
    <div className="light-switch day">
      <div className="on" onClick={() => changeTheme('day')}>DAY</div>
      <div className="off" onClick={() => changeTheme('night')}>NIGHT</div>
    </div>
  );
}

export default LightSwitch;