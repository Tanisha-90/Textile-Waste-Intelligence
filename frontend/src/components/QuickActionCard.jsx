function QuickActionCard({ title }) {
    return (
        <button className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl duration-300">
            <h3 className="font-semibold">
                {title}
            </h3>
        </button>
    )
}

export default QuickActionCard;