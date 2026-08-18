function RecentActivity() {

    const activities = [
        "50 kg Cotton Waste Added",
        "20 kg Polyester Recycled",
        "Monthly Report Generated",
        "Inventory Updated"
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
                Recent Activity
            </h2>

            {activities.map((activity, index) => (
                <p
                    key={index}
                    className="py-3 border-b"
                >
                    {activity}
                </p>
            ))}
        </div>
    )
}

export default RecentActivity;