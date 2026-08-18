function StatusBadge({ status }) {

    let color = "bg-yellow-500";

    if (status === "Analysed") {
        color = "bg-blue-600";
    }

    if (status === "Recycled") {
        color = "bg-green-600";
    }

    return (
        <span
            className={`${color} text-white px-3 py-1 rounded-full text-sm`}
        >
            {status}
        </span>
    );
}

export default StatusBadge;