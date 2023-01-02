import { useEffect, useState } from "react";
import { Stage, Layer } from "react-konva";
import VisitFigure from "./VisitFigure";

const VisitsCanvas = (props) => {

  const [size, setSize] = useState([10, 10]); 

  const timingToPosition = (timing) => {
    return timing * 0.00000000001;
  };

  const setX = (initialX, timing) => {
    if (props.palimpsesto === true) {
        return 0;
    } else {
        return initialX * 10;
    }
  };

  useEffect(() => {
    if(props.palimpsesto === true) {
      setSize([100, 100]);
    } else {
      setSize([10, 10]);
    }
  }, [props.palimpsesto]);

  return (
    <Stage width={window.innerWidth - 100} height={window.innerHeight - 100}>
      <Layer>
        {props.visits.map((visit, index) => {
          return (
            <VisitFigure
              data={visit}
              time={visit.time}
              key={index}
              x={setX(
                index,
                visit.visitor_data.performance_data.timing.domInteractive
              )}
              y={
                index *
                timingToPosition(
                  visit.visitor_data.performance_data.timing.domInteractive
                )
              }
              width={size[0]}
              height={size[1]}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default VisitsCanvas;