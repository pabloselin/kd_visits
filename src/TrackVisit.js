import axios from "axios";
import { useEffect, useState } from "react";

const TrackVisit = () => {
  const [isPosted, setIsPosted] = useState(false);

  const visitorData = {
    platform: window.navigator.platform,
    userAgent: window.navigator.userAgent,
    languages: window.navigator.languages,
    cookiesEnabled: window.navigator.cookieEnabled
  };

  const performanceData = window.performance;
  const postURL = "/visits_backend/visits_tracking.php?appendvisit";
  
  useEffect(() => {
    if (isPosted === false) {
      console.log(isPosted);
      axios
        .post(postURL, {
          visitor_data: visitorData,
          performance_data: performanceData,
        })
        .then((response) => {
          console.log(response);
          setIsPosted(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isPosted, visitorData, performanceData]);

  return <p className="tracked">Visita registrada</p>;
};

export default TrackVisit;
