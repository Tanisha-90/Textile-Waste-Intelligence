import { useEffect, useState } from "react";
import {
    getNotifications,
    markNotificationRead,
    markNotificationUnread,
    markAllNotificationsRead
} from "../services/notificationService";

function Navbar() {
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");

    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        try {
            const response = await getNotifications();
            setNotifications(response.data);
        } catch (error) {
            console.log("Notification Error", error);
        }
    };

    const handleRead = async (id) => {
        try {
            await markNotificationRead(id);

            setNotifications(
                notifications.map((notification) =>
                    notification.id === id
                        ? { ...notification, is_read: true }
                        : notification
                )
            );
        } catch (error) {
            console.log("Read Notification Error", error);
        }
    };

    const handleUnread = async (id) => {
        try {
            await markNotificationUnread(id);

            setNotifications(
                notifications.map((notification) =>
                    notification.id === id
                        ? { ...notification, is_read: false }
                        : notification
                )
            );
        } catch (error) {
            console.log("Unread Notification Error", error);
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await markAllNotificationsRead();

            setNotifications(
                notifications.map((notification) => ({
                    ...notification,
                    is_read: true
                }))
            );
        } catch (error) {
            console.log("Mark All Read Error", error);
        }
    };

    const unreadCount = notifications.filter(
        (notification) => !notification.is_read
    ).length;

    const getNotificationIcon = (title) => {
        if (title?.includes("Collection")) {
            return "🚚";
        }

        if (title?.includes("Recycling")) {
            return "♻️";
        }

        if (title?.includes("Sustainability")) {
            return "🌱";
        }

        if (title?.includes("Inventory")) {
            return "⚠️";
        }

        return "📢";
    };

    return (
        <div className="bg-mist-300 shadow flex justify-between items-center px-8 py-4">
            <h2 className="text-2xl text-cyan-700 font-semibold">
                Textile Waste Intelligence Platform
            </h2>

            <div className="flex items-center gap-6">
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative text-2xl hover:scale-110 transition"
                    >
                        🔔

                        {unreadCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-xl border z-50">
                            <div className="p-4 border-b flex justify-between items-center">
                                <h3 className="font-bold text-lg">
                                    Notifications
                                </h3>

                                {unreadCount > 0 && (
                                    <button
                                        onClick={handleMarkAllRead}
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Mark all read
                                    </button>
                                )}
                            </div>

                            <div className="max-h-96 overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <p className="p-6 text-center text-gray-500">
                                        No notifications 🔔
                                    </p>
                                ) : (
                                    notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-4 border-b transition ${
                                                notification.is_read
                                                    ? "bg-white"
                                                    : "bg-blue-50"
                                            }`}
                                        >
                                            <div className="flex gap-3 items-start">
                                                <span className="text-xl">
                                                    {getNotificationIcon(
                                                        notification.title
                                                    )}
                                                </span>

                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <h4 className="font-semibold">
                                                            {notification.title}
                                                        </h4>

                                                        {!notification.is_read && (
                                                            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                                                                New
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {notification.message}
                                                    </p>

                                                    <div className="mt-3">
                                                        {notification.is_read ? (
                                                            <button
                                                                onClick={() =>
                                                                    handleUnread(
                                                                        notification.id
                                                                    )
                                                                }
                                                                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                                            >
                                                                Mark as unread
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() =>
                                                                    handleRead(
                                                                        notification.id
                                                                    )
                                                                }
                                                                className="text-xs text-green-600 hover:text-green-800 font-medium"
                                                            >
                                                                Mark as read
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="text-right">
                    <h3 className="font-semibold">{name}</h3>
                    <p className="text-gray-500 text-sm">{role}</p>
                </div>
            </div>
        </div>
    );
}

export default Navbar;