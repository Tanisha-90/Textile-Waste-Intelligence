function SustainabilityCard({ title, value, unit }) {

    return (

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300">

            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                {title}
            </h3>

            <div className="mt-4">

                <span className="text-3xl font-bold text-green-600">
                    {value}
                </span>

                <span className="ml-2 text-gray-500 text-base">
                    {unit}
                </span>

            </div>

        </div>

    );

}

export default SustainabilityCard;
