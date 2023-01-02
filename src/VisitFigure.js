import { useState, useRef, useEffect } from "react";
import { Line, Text, Rect, Group } from "react-konva";

const VisitFigure = (props) => {
  const [hour, setHour] = useState(props.time.getHours());
  const [month, getMonth] = useState(props.time.getMonth());
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [pos, setPos] = useState([0, 0]);

  const LineRef = useRef(null);

  useEffect(() => {
    setPos(randomPos());
  }, []);

  const reduceTime = (time) => {
    return time * 0.0000000001;
  };

  const shapePoints = () => {
    let pos1, pos2, pos3, pos4, pos5 = new Array();
    
    pos1 = [0, 0];
    pos2 = [5, -5];
    pos3 = [15, 0];
    pos4 = [7.5, 15];
    pos5 = [2.5, 15];

    return [...pos1, ...pos2, ...pos3, ...pos4, ...pos5];
  }

  const hourToLuminosity = (hour) => {
    console.log(hour);
    return 100 - (100 / 23) * hour;
  };

  const monthToTone = (month) => {
    return (360 / 12) * month;
  };

  const randomPos = () => {
    return [
      Math.random() * (window.innerWidth - 15) + 15,
      Math.random() * (window.innerHeight - 15) + 15,
    ];
  };

  const handleMouseOver = (e) => {
    console.log(e.target.index);
    setIsMouseOver(true);
  };

  return (
    <>
      <Line
        x={pos[0]}
        y={pos[1]}
        width={15}
        height={15}
        closed
        points={shapePoints()}
        fill={`hsl(${monthToTone(month)}, 100%, ${hourToLuminosity(hour)}%)`}
        opacity={props.palimpsesto === true ? 0.3 : 1}
        scaleX={isMouseOver ? 1.5 : 1}
        scaleY={isMouseOver ? 1.5 : 1}
        onMouseOver={handleMouseOver}
        onMouseOut={() => setIsMouseOver(false)}
      />
      {isMouseOver && (
        <Group>
          <Rect x={pos[0] + 15} y={pos[1] + 15} width={20} height={20} fill="white" />
          <Text
            x={pos[0] + 15}
            y={pos[1] + 15}
            text={`Hora: ${hour}`}
            fontSize={9}
          />
        </Group>
      )}
    </>
  );
};

export default VisitFigure;