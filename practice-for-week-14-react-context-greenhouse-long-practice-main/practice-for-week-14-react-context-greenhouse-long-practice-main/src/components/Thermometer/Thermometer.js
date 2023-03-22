import ReactSlider from "react-slider";
import './Thermometer.css';
import { useClimate } from "../../context/ClimateContext";
import { useState, useEffect } from "react";

function Thermometer() {
  const { temperature, setTemperature } = useClimate();
  const [desiredTemp, setDesiredTemp] = useState(temperature);

  useEffect(() => {
    let timeout1;
    let timeout2;
    if (desiredTemp < temperature) {
      timeout1 = setTimeout(() => {
        setDesiredTemp(oldDesiredTemp => oldDesiredTemp += 1)
      }, 1000)      
    } else  if (desiredTemp > temperature) {
      timeout2 = setTimeout(() => {
        setDesiredTemp(oldDesiredTemp => oldDesiredTemp -= 1)
      }, 1000)
    }

    return () => {
      clearInterval(timeout1);
      clearInterval(timeout2);
    }

  }, [desiredTemp])

  useEffect(() => {
    if (desiredTemp < temperature) {
      setDesiredTemp(oldDesiredTemp => oldDesiredTemp += 1)
    } else if (desiredTemp > temperature) {
      setDesiredTemp(oldDesiredTemp => oldDesiredTemp -= 1)
    }
  }, [temperature])

  return (
    <section>
      <h2>Thermometer</h2>
      <div className="actual-temp">Actual Temperature: {desiredTemp}°F</div>
      <ReactSlider
        value={temperature}
        onAfterChange={(temperature) => {setTemperature(temperature)}}
        className="thermometer-slider"
        thumbClassName="thermometer-thumb"
        trackClassName="thermometer-track"
        ariaLabel={"Thermometer"}
        orientation="vertical"
        min={0}
        max={120}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        renderTrack={(props, state) => (
          <div {...props} index={state.index}></div>
        )}
        invert
        pearling
        minDistance={1}
      />
    </section>
  );
}

export default Thermometer;