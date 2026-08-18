// import api from "../api/api";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
});

// const api = axios.create({
//     baseURL: API_URL,
// });
// const API="http://{}:8000";


export const getDashboardSummary=()=>{

return api.get(
`${API_URL}/sustainability/dashboard-summary`
);

}



export const getFabricAnalysis=()=>{

return api.get(
`${API_URL}/sustainability/fabric-analysis`
);

}
export const getWasteDiversion = () => {

    return api.get(
        "/sustainability/waste-diversion"
    );

};
export const getESGReport = () => {

    return api.get(
        "/sustainability/esg-report"
    );

};
export const generateSustainabilityExcel = (report) => {
    return api.post(
        "/sustainability/generate-excel",
        {
            report: report
        },
        {
            responseType: "blob"
        }
    );
};