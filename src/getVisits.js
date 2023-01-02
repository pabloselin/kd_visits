import axios from "axios";

const getVisits = () => {
    const visitsURL = "/visits_backend/visits_tracking.php?getvisits";
    const visits = axios
        .get(visitsURL)
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