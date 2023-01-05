import { useEffect, useState } from "react";
import { Stage, Layer } from "react-konva";
import VisitFigure from "./VisitFigure";

const VisitsCanvas = (props) => {

  const [size, setSize] = useState([10, 10]); 
  
  useEffect(() => {
    if(props.palimpsesto === true) {
      setSize([100, 100]);
    } else {
      setSize([10, 10]);
    }
  }, [props.palimpsesto]);

  return (
    <Stage className="kd_konva_canvas" width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {props.visits.map((visit, index) => {
          return (
            <VisitFigure
              isMoving={props.palimpsesto}
              data={visit}
              time={visit.time}
              key={index}
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
