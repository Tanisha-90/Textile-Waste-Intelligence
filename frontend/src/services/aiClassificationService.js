import api from "../api/api";


export const uploadImage = async (formData) => {

    return await api.post(
        "/ai/upload-image",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

};



export const generateReport = async (report) => {

    return await api.post(

        "/ai/generate-report",

        {
            report: report
        },

        {
            responseType: "blob"
        }

    );

};
export const generateExcelReport = (report) => {
    return api.post(
        "/ai/generate-excel",
        {
            report: report
        },
        {
            responseType: "blob"
        }
    );
};


