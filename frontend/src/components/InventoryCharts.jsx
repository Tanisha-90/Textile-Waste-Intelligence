import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    ResponsiveContainer
} from "recharts";

const inventoryData = [
    { month: "Jan", inventory: 120 },
    { month: "Feb", inventory: 180 },
    { month: "Mar", inventory: 240 },
    { month: "Apr", inventory: 300 },
    { month: "May", inventory: 380 },
];

const fabricData = [
    { name: "Cotton", value: 40 },
    { name: "Polyester", value: 25 },
    { name: "Denim", value: 15 },
    { name: "Silk", value: 10 },
    { name: "Wool", value: 10 },
];

const wasteData = [
    { category: "Cutting", quantity: 120 },
    { category: "Damaged", quantity: 90 },
    { category: "Mixed", quantity: 70 },
    { category: "Yarn", quantity: 50 },
];

const COLORS = [
    "#10B981",
    "#3B82F6",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6"
];

function InventoryCharts() {

    return (

        <div className="grid grid-cols-2 gap-8 mt-10">

            {/* Inventory Trend */}

            <div className="bg-white rounded-xl shadow p-5">

                <h2 className="text-xl font-bold mb-4">
                    Inventory Trend
                </h2>

                <ResponsiveContainer width="100%" height={280}>

                    <LineChart data={inventoryData}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="inventory"
                            stroke="#16a34a"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

            {/* Fabric Distribution */}

            <div className="bg-white rounded-xl shadow p-5">

                <h2 className="text-xl font-bold mb-4">
                    Fabric Distribution
                </h2>

                <ResponsiveContainer width="100%" height={280}>

                    <PieChart>

                        <Pie
                            data={fabricData}
                            dataKey="value"
                            outerRadius={90}
                            label
                        >

                            {fabricData.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />

                            ))}

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

            {/* Waste Category */}

            <div className="bg-white rounded-xl shadow p-5 col-span-2">

                <h2 className="text-xl font-bold mb-4">
                    Waste Category Distribution
                </h2>

                <ResponsiveContainer width="100%" height={300}>

                    <BarChart data={wasteData}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="category" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="quantity"
                            fill="#16a34a"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default InventoryCharts;