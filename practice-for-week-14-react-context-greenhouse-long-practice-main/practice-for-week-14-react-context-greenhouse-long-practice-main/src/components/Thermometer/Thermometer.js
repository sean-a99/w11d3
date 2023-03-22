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
    if (temperature < desiredTemp) {
      timeout1 = setTimeout(() => {
        setTemperature(oldTemp => oldTemp += 1)
      }, 1000)      
    } else  if (temperature > desiredTemp) {
      timeout2 = setTimeout(() => {
        setTemperature(oldTemp => oldTemp -= 1)
      }, 1000)
    }

    return () => {
      clearInterval(timeout1);
      clearInterval(timeout2);
    }

  }, [temperature, desiredTemp])

  return (
    <section>
      <h2>Thermometer</h2>
      <div className="actual-temp">Actual Temperature: {temperature}°F</div>
      <ReactSlider
        value={desiredTemp}
        onAfterChange={(desiredTemp) => {setDesiredTemp(desiredTemp)}}
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