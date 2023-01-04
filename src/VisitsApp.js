import { useState, useEffect } from "react";

import "./VisitsApp.scss";
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
            time: new Date(visit.time),
          });
        });

        setVisits(visitsArr);
      });
    }
  }, [visits]);

  return (
    <main className="main">
      <h1>Representación de visitas a una web</h1>
      <p>
        Cada símbolo representa una visita a esta web.
        <ul>
          <li>El tono del color cambia según el mes.</li>
          <li>La luminosidad corresponde a la hora de la visita.</li>
          <li>La forma del símbolo se genera a partir de la IP y el tipo de dispositivo.</li>
      </ul> 
      </p>
      

      {visits && (
        <>
          {visits.length} visitas registradas. <TrackVisit />
          <VisitCanvas palimpsesto={palimpsesto} visits={visits} />
        </>
      )}
    </main>
  );
}

export default VisitsApp;
