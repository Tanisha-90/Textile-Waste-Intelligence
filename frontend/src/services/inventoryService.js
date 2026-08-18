import api from "../api/api";

export const getDashboard = async () => {
    return await api.get("/inventory/dashboard");
};

export const getFabricSummary = async () => {
    return await api.get("/inventory/fabric-summary");
};

export const getLocationSummary = async () => {
    return await api.get("/inventory/location-summary");
};

export const getSourceSummary = async () => {
    return await api.get("/inventory/source-summary");
};

export const getRecentRegistrations = async () => {
    return await api.get("/inventory/recent-registrations");
};

export const getRecentCollections = async () => {
    return await api.get("/inventory/recent-collections");
};

export const getRecentSources = async () => {
    return await api.get("/inventory/recent-sources");
};

export const getBatchActivity = async () => {
    return await api.get("/inventory/batch-activity");
};

