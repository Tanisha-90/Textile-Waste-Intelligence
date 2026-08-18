import api from "../api/api";


export const getAdminDashboard = async () => {
    return await api.get("/admin/dashboard");
};


export const getFabricAnalysis = async () => {
    return await api.get("/admin/fabric-analysis");
};


export const getWasteCategory = async () => {
    return await api.get("/admin/waste-category");
};


export const getCollectionLocations = async () => {
    return await api.get("/admin/collection-locations");
};


export const getWasteSources = async () => {
    return await api.get("/admin/waste-sources");
};


export const getBatchAnalysis = async () => {
    return await api.get("/admin/batch-analysis");
};