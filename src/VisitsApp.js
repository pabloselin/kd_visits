import { useState, useEffect } from "react";
import TrackVisit from "./TrackVisit";
import getVisits from "./getVisits";
import VisitCanvas from "./VisitCanvas";

function VisitsApp() {
  const [visits, setVisits] = useState(null);
  const [palimpsesto, setPalimpsesto] = useState(false);

  useEffect(() => {
    if (visits === null) {
      const visitsData = getVisits();
      console.log(visitsData);
      visitsData.then((visits) => {
        const visitsArr = [];
        visits.data.forEach((visit) => {
          visitsArr.push({
            id: visit.id,
            visitor_data: visit.data,
            ip: visit.ip,
            time: new Date(visit.time)
          });
        });

        setVisits(visitsArr);
      });
    }
  }, [visits]);

  return (
    <div>
      <button onClick={() => setPalimpsesto(!palimpsesto)}>{palimpsesto === true? "Desactivar" : "Activar"}</button>
      {visits && (
        <>
          {visits.length} visitas registradas. <TrackVisit />
          <VisitCanvas palimpsesto={palimpsesto} visits={visits} />
        </>
      )}
    </div>
  );
}

export default VisitsApp;