import { useState, useEffect } from "react";

import "./VisitsApp.scss";
import TrackVisit from "./TrackVisit";
import getVisits from "./getVisits";
import VisitCanvas from "./VisitCanvas";

function VisitsApp() {
  const [visits, setVisits] = useState(null);
  const [infoVisible, setInfoVisible] = useState(false);
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
    <main className="main VisitsApp">
      <header className="fixed_kit_header">
      <h1>Representación de visitas a una web <span className="infoToggle" onClick={() => setInfoVisible(!infoVisible)}>[?]</span></h1>
      {visits && <p>{visits.length} visitas registradas a <span className="urlInfo">{window.location.href}</span></p>} <TrackVisit />
      <div className={`info ${infoVisible ? 'expanded' : 'hidden'}`}>
      <h2>Notas</h2>
      <p>
        Cada símbolo representa una visita a esta web.
        </p>
        <ul>
          <li>El tono del color cambia según el mes.</li>
          <li>La luminosidad corresponde a la hora de la visita.</li>
          <li>La forma del símbolo se genera a partir de la IP y el tipo de dispositivo.</li>
      </ul> 
      </div>
      </header>
      

      {visits && (
        <>
          <VisitCanvas palimpsesto={palimpsesto} visits={visits} />
        </>
      )}
    </main>
  );
}

export default VisitsApp;
