import api from "../api/api";


export const getManufacturerSummary = async () => {

    return await api.get(
        "/manufacturer-dashboard/summary"
    );

};


export const getProductionWaste = async () => {

    return await api.get(
        "/manufacturer-dashboard/production-waste"
    );

};


export const getWasteCategory = async () => {

    return await api.get(
        "/manufacturer-dashboard/waste-category"
    );

};


export const getCircularEconomy = async () => {

    return await api.get(
        "/manufacturer-dashboard/circular-economy"
    );

};


export const getManufacturerScores = async () => {

    return await api.get(
        "/manufacturer-dashboard/scores"
    );

};


export const getFabricPerformance = async () => {

    return await api.get(
        "/manufacturer-dashboard/fabric-performance"
    );

};