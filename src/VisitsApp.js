import { useState, useEffect } from "react";

import "./VisitsApp.scss";
import TrackVisit from "./TrackVisit";
import getVisits from "./getVisits";
import VisitCanvas from "./VisitCanvas";

function VisitsApp(props) {
  const [visits, setVisits] = useState(null);
  const [palimpsesto, setPalimpsesto] = useState(false);

  useEffect(() => {
    if (visits === null) {
      const visitsData = getVisits(props.siteid);
    
      visitsData.then((visits) => {
        const visitsArr = [];
        visits.data.forEach((visit) => {
          visitsArr.push({
            id: visit.id,
            visitor_data: visit.data,
            ip: visit.ip,
            time: new Date(visit.time),
            carbon_intensity: JSON.parse(visit.carbon_intensity),
          });
        });

        setVisits(visitsArr);
      });
    }
  }, [visits]);

  return (
    <main className="main VisitsApp">
      <header className="fixed_kit_header">
        <div>
        <h1>
          Rastro de visitas
          
        </h1>
        {visits && (
          <p>
            {visits.length} visitas registradas a{" "}
            <span className="urlInfo">{window.location.href}</span>
            <TrackVisit siteid={1} trackurl={window.location.href} />
          </p>
        )}
      
        </div>
       
        <div className={`info expanded`}>
          <p><strong>Cada una de las figuras moviéndose representa una visita a esta web.</strong></p>
          <p>La forma se genera según los datos que deja la persona (o bot) al acceder al sitio.</p>
          <ul>
            <li>El tono del color cambia según el mes.</li>
            <li>La luminosidad corresponde a la hora de la visita.</li>
            <li>
              La forma de la figura se genera a partir de la IP y el tipo de
              dispositivo.
            </li>
            <li>
              El ruido sobre la figura corresponde al índice de intensidad de carbono de la
              matriz energética del país de origen de la visita.
            </li>
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
