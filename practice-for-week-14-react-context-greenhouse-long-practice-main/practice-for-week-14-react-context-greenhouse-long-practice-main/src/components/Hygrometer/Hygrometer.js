import ReactSlider from "react-slider";
import "./Hygrometer.css";
import { useClimate } from "../../context/ClimateContext";
import { useState, useEffect } from "react";

function Hygrometer() {
  const { humidity, setHumidity } = useClimate();
  const [desiredHum, setDesiredHum] = useState(humidity);

  useEffect(() => {
    let timeout1;
    let timeout2;
    if (desiredHum < humidity) {
      timeout1 = setTimeout(() => {
        setDesiredHum(oldDesiredHum => oldDesiredHum += 2)
      }, 1000)      
    } else  if (desiredHum > humidity) {
      timeout2 = setTimeout(() => {
        setDesiredHum(oldDesiredHum => oldDesiredHum -= 2)
      }, 1000)
    }

    return () => {
      clearInterval(timeout1);
      clearInterval(timeout2);
    }

  }, [humidity, desiredHum])


  return (
    <section>
      <h2>Hygrometer</h2>
      <div className="actual-humid">Actual Humidity: {desiredHum}%</div>
      <ReactSlider
        value={humidity}
        onAfterChange={(humidity) => {setHumidity(humidity)}}
        className="hygrometer-slider"
        thumbClassName="hygrometer-thumb"
        trackClassName="hygrometer-track"
        ariaLabel={"Hygrometer"}
        orientation="vertical"
        min={0}
        max={100}
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

export default Hygrometer;