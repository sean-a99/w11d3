import ReactSlider from "react-slider";
import './Thermometer.css';
import { useClimate } from "../../context/ClimateContext";
import { useState, useEffect } from "react";

function Thermometer() {
  const { temperature, setTemperature } = useClimate();
  const [desiredTemp, setDesiredTemp] = useState(temperature);
  const [myInterval, setMyInterval] = useState(null);
  useEffect(() => {
    if (myInterval !== null) {
      clearInterval(myInterval)
    }

    let currTemp = temperature
    let interval = setInterval(() => {
      if (currTemp < desiredTemp) {
        setTemperature(oldTemp => oldTemp + 1)
        currTemp += 1;
      } else if (currTemp > desiredTemp) {
        setTemperature(oldTemp => oldTemp - 1)
        currTemp -= 1;
      } else {
        clearInterval(interval)
      }
    }, 1000)

    setMyInterval(interval)
  }, [desiredTemp])

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