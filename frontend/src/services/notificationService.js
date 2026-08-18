import api from "../api/api";

export const getNotifications = () => {
    return api.get("/notifications/");
};

export const getUnreadNotifications = () => {
    return api.get("/notifications/unread");
};

export const markNotificationRead = (id) => {
    return api.put(`/notifications/${id}/read`);
};

export const markNotificationUnread = (id) => {
    return api.put(`/notifications/${id}/unread`);
};

export const markAllNotificationsRead = () => {
    return api.put("/notifications/read-all");
};