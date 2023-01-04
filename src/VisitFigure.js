import { useState, useRef, useEffect } from "react";
import Konva from "konva";
import { Line, Text, Rect, Group } from "react-konva";

const randomPos = () => {
  return [
    Math.random() * (window.innerWidth - 15) + 15,
    Math.random() * (window.innerHeight - 15) + 15,
  ];
};

const VisitFigure = (props) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [pos, setPos] = useState(randomPos());
  
  const hour = props.time.getHours();
  const month = props.time.getMonth();
  const IP = props.data.ip.split(",")[0];
  const UserAgent = props.data.visitor_data.visitor_data.userAgent;
  
  const UserType = () => {
    if (UserAgent.includes("Android")) {
      return "Android";
    } else if(UserAgent.includes("iPhone")) {
      return "iOS";
    } else if(UserAgent.includes("Windows") || UserAgent.includes("Win")) {
      return "Windows";
    } else if(UserAgent.includes("Macintosh")) {
      return "Macintosh";
    } else {
      return "Unknown";
    }
  }

  let isMobile = false;

  if (UserType() === "Android" || UserType() === "iOS") {
    isMobile = true;
  } else {
    isMobile = false;
  }

  const LineRef = useRef();

  const randomMovement = (isMoving) => {
    if (LineRef.current) {
      console.log(LineRef);
      LineRef.current.to({
        x: randomPos()[0],
        y: randomPos()[1],
        easing: Konva.Easings.EaseInOut,
        points: randomPoints(),
        rotate: 10,
        duration: isMoving ? 1 : 5 + Math.random() * 2,
        onFinish: () => {
          randomMovement();
        },
      });
    }
  };

  const randomPoints = () => {
    const newPoints = [];

    shapePoints().map((point) => {
      newPoints.push(point + Math.random() * 1);
    });

    return newPoints;
  };

  const IpMultiplier = (point, pointIndex) => {
    const ipArr = IP.split(".");
    return [point[0] + ipArr[pointIndex] * 0.04, point[1] + ipArr[pointIndex] * 0.04];
  };
  
  const shapePoints = () => {
    let pos1,
      pos2,
      pos3,
      pos4,
      pos5 = new Array();
    

    pos1 = IpMultiplier([0, 7.5], 0);
    pos2 = IpMultiplier([7.5, 0], 1);
    pos3 = IpMultiplier([15, 7.5], 2);
    pos4 = IpMultiplier([10, 15], 3);
    pos5 = IpMultiplier([5, 15], 1);    

    return [...pos1, ...pos2, ...pos3, ...pos4, ...pos5];
  };
  

  const hourToLuminosity = (hour) => {
    return 100 - (100 / 23) * hour;
  };

  const monthToTone = (month) => {
    return (360 / 12) * month;
  };

  const handleMouseOver = (e) => {
    console.log(e.target.index);
    //setIsMouseOver(true);
  };

  useEffect(() => {
    setPos(randomPos());
    randomMovement(props.isMoving);
    randomPoints();
  }, [props.isMoving]);

  return (
    <>
      <Line
        ref={LineRef}
        x={pos[0]}
        y={pos[1]}
        width={15}
        height={15}
        closed
        points={shapePoints()}
        fill={`hsl(${monthToTone(month)}, 100%, ${hourToLuminosity(hour)}%)`}
        tension={0.4}
        opacity={1}
        scaleX={isMobile ? 1 : 0.8}
        scaleY={isMobile ? 1 : 0.8}
        onMouseOver={handleMouseOver}
        onMouseOut={() => setIsMouseOver(false)}
      />
      {isMouseOver && (
        <Group>
          <Rect
            x={pos[0] + 15}
            y={pos[1] + 15}
            width={20}
            height={20}
            fill="white"
          />
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
