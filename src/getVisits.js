import axios from "axios";

const getVisits = (siteid) => {
  const visitsURL = `/visits_backend/visits_tracking.php?getvisits&siteid=${siteid}`;
  const visits = axios({
    method: "get",
    url: visitsURL,
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  return visits;
};

export default getVisits;