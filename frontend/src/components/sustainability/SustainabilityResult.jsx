import SustainabilityCard from "./SustainabilityCard";

function SustainabilityResult({ result }) {

    if (!result) return null;

    return (

        <div className="mt-8 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

            <h2 className="text-2xl font-bold text-green-700 mb-6">
                Sustainability Analysis Result
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                <SustainabilityCard
                    title="Carbon Footprint"
                    value={result.carbon_footprint}
                    unit="kg CO₂"
                />

                <SustainabilityCard
                    title="Waste Diversion"
                    value={result.waste_diversion}
                    unit="%"
                />

                <SustainabilityCard
                    title="Resource Recovery"
                    value={result.resource_recovery}
                    unit="%"
                />

            </div>

            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-5">

                <div className="flex justify-between border-b border-gray-200 pb-3">

                    <span className="font-semibold text-gray-700">
                        Circular Economy Status
                    </span>

                    <span className="font-medium text-green-600">
                        {result.circular_status}
                    </span>

                </div>

                <div className="flex justify-between pt-3">

                    <span className="font-semibold text-gray-700">
                        Benchmark
                    </span>

                    <span className="font-medium text-blue-600">
                        {result.benchmark}
                    </span>

                </div>

            </div>

        </div>

    );

}

export default SustainabilityResult;
