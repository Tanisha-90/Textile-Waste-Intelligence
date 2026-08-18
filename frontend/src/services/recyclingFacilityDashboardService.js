import api from "../api/api";


export const getFacilitySummary = async () => {
    return await api.get(
        "/recycling-facility-dashboard/summary"
    );
};


export const getFacilityInventory = async () => {
    return await api.get(
        "/recycling-facility-dashboard/inventory"
    );
};


export const getRecyclingOpportunities = async () => {
    return await api.get(
        "/recycling-facility-dashboard/opportunities"
    );
};


export const getProcessingAnalytics = async () => {
    return await api.get(
        "/recycling-facility-dashboard/processing"
    );
};


export const getRecoveryStatistics = async () => {
    return await api.get(
        "/recycling-facility-dashboard/recovery"
    );
};