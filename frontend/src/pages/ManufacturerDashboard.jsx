import { useEffect, useState } from "react";

import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
    getManufacturerSummary,
    getProductionWaste,
    getWasteCategory,
    getCircularEconomy,
    getManufacturerScores,
    getFabricPerformance
} from "../services/manufacturerDashboardService";


function ManufacturerDashboard() {

    const [summary, setSummary] = useState({
        total_records: 0,
        total_weight: 0,
        total_carbon: 0,
        total_co2_saved: 0,
        total_water_saved: 0,
        average_circularity: 0,
        average_sustainability: 0
    });

    const [productionWaste, setProductionWaste] = useState([]);

    const [wasteCategory, setWasteCategory] = useState([]);

    const [circular, setCircular] = useState({
        recovered: 0,
        reused: 0,
        waste_diversion: 0
    });

    const [scores, setScores] = useState({
        recyclability: 0,
        reuse: 0,
        recovery: 0,
        sustainability: 0,
        circularity: 0
    });

    const [fabricPerformance, setFabricPerformance] = useState([]);


    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            const [
                summaryRes,
                productionRes,
                categoryRes,
                circularRes,
                scoresRes,
                performanceRes
            ] = await Promise.all([

                getManufacturerSummary(),

                getProductionWaste(),

                getWasteCategory(),

                getCircularEconomy(),

                getManufacturerScores(),

                getFabricPerformance()

            ]);


            setSummary(summaryRes.data);

            setProductionWaste(
                productionRes.data
            );

            setWasteCategory(
                categoryRes.data
            );

            setCircular(
                circularRes.data
            );

            setScores(
                scoresRes.data
            );

            setFabricPerformance(
                performanceRes.data
            );

        }

        catch (error) {

            console.log(
                "Manufacturer Dashboard Error:",
                error
            );

        }

    };


    const circularChart = [

        {
            name: "Recovered",
            value: circular.recovered
        },

        {
            name: "Reused",
            value: circular.reused
        }

    ];


    const scoreChart = [

        {
            name: "Recyclability",
            score: scores.recyclability
        },

        {
            name: "Reuse",
            score: scores.reuse
        },

        {
            name: "Recovery",
            score: scores.recovery
        },

        {
            name: "Sustainability",
            score: scores.sustainability
        },

        {
            name: "Circularity",
            score: scores.circularity
        }

    ];


    return (

        <div className="flex min-h-screen">

            <Sidebar />

            <div className="flex-1 bg-slate-50">

                <Navbar />

                <div className="p-8">


                    {/* HEADER */}

                    <h1 className="text-3xl font-bold text-indigo-900">

                        🏭 Manufacturer Dashboard

                    </h1>

                    <p className="text-gray-600 mt-2 mb-8">

                        Production waste analysis, circular economy
                        insights and sustainability performance

                    </p>


                    {/* ================================================= */}
                    {/* SUMMARY */}
                    {/* ================================================= */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-5 mb-10">


                        <MetricCard
                            title="Waste Records"
                            value={summary.total_records}
                            icon="📋"
                        />


                        <MetricCard
                            title="Total Waste"
                            value={`${summary.total_weight} Kg`}
                            icon="♻️"
                        />


                        <MetricCard
                            title="Carbon Footprint"
                            value={`${summary.total_carbon} Kg`}
                            icon="🌍"
                        />


                        <MetricCard
                            title="CO₂ Saved"
                            value={`${summary.total_co2_saved} Kg`}
                            icon="🌱"
                        />


                        <MetricCard
                            title="Water Saved"
                            value={`${summary.total_water_saved} L`}
                            icon="💧"
                        />


                        <MetricCard
                            title="Circularity"
                            value={`${summary.average_circularity}%`}
                            icon="🔄"
                        />

                    </div>


                    {/* ================================================= */}
                    {/* PRODUCTION WASTE */}
                    {/* ================================================= */}

                    <section className="bg-white rounded-2xl shadow p-6 mb-8">

                        <h2 className="text-2xl font-bold text-indigo-900 mb-6">

                            🏭 Production Waste Analysis

                        </h2>


                        <ResponsiveContainer
                            width="100%"
                            height={350}
                        >

                            <BarChart
                                data={productionWaste}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="fabric"
                                />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Bar
                                    dataKey="weight"
                                    name="Waste Weight (Kg)"
                                    fill="#4f46e5"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </section>


                    {/* ================================================= */}
                    {/* WASTE CATEGORY */}
                    {/* ================================================= */}

                    <section className="bg-white rounded-2xl shadow p-6 mb-8">

                        <h2 className="text-2xl font-bold text-indigo-900 mb-6">

                            🧵 Waste Category Analysis

                        </h2>


                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <BarChart
                                data={wasteCategory}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="category"
                                />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="count"
                                    name="Waste Records"
                                    fill="#7c3aed"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </section>


                    {/* ================================================= */}
                    {/* CIRCULAR ECONOMY */}
                    {/* ================================================= */}

                    <section className="bg-white rounded-2xl shadow p-6 mb-8">

                        <h2 className="text-2xl font-bold text-indigo-900 mb-6">

                            🔄 Circular Economy Insights

                        </h2>


                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


                            <ResponsiveContainer
                                width="100%"
                                height={320}
                            >

                                <PieChart>

                                    <Pie
                                        data={circularChart}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={110}
                                        label
                                    >

                                        <Cell fill="#16a34a" />

                                        <Cell fill="#2563eb" />

                                    </Pie>

                                    <Tooltip />

                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>


                            <div className="grid grid-cols-1 gap-5">


                                <InsightCard
                                    title="Material Recovered"
                                    value={`${circular.recovered} Kg`}
                                    text="Waste material recovered for circular processing"
                                />


                                <InsightCard
                                    title="Material Reused"
                                    value={`${circular.reused} Kg`}
                                    text="Waste redirected toward reuse"
                                />


                                <InsightCard
                                    title="Waste Diversion"
                                    value={`${circular.waste_diversion}%`}
                                    text="Average waste diversion performance"
                                />

                            </div>

                        </div>

                    </section>


                    {/* ================================================= */}
                    {/* SCORES */}
                    {/* ================================================= */}

                    <section className="bg-white rounded-2xl shadow p-6 mb-8">

                        <h2 className="text-2xl font-bold text-indigo-900 mb-6">

                            ♻️ Reuse • Recycle • Recover Scores

                        </h2>


                        <ResponsiveContainer
                            width="100%"
                            height={350}
                        >

                            <BarChart data={scoreChart}>

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="name"
                                />

                                <YAxis
                                    domain={[0, 100]}
                                />

                                <Tooltip />

                                <Legend />

                                <Bar
                                    dataKey="score"
                                    name="Score (%)"
                                    fill="#059669"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </section>


                    {/* ================================================= */}
                    {/* FABRIC PERFORMANCE */}
                    {/* ================================================= */}

                    <section className="bg-white rounded-2xl shadow p-6 mb-8">

                        <h2 className="text-2xl font-bold text-indigo-900 mb-6">

                            🌱 Material & Sustainability Performance

                        </h2>


                        <div className="overflow-x-auto">

                            <table className="w-full border">

                                <thead className="bg-indigo-700 text-white">

                                    <tr>

                                        <th className="p-3">
                                            Material
                                        </th>

                                        <th className="p-3">
                                            Carbon
                                        </th>

                                        <th className="p-3">
                                            CO₂ Saved
                                        </th>

                                        <th className="p-3">
                                            Water Saved
                                        </th>

                                        <th className="p-3">
                                            Circularity
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {fabricPerformance.map(
                                        (item, index) => (

                                            <tr
                                                key={index}
                                                className="border-b text-center"
                                            >

                                                <td className="p-3 font-semibold">
                                                    {item.material}
                                                </td>

                                                <td>
                                                    {item.carbon} Kg
                                                </td>

                                                <td>
                                                    {item.co2_saved} Kg
                                                </td>

                                                <td>
                                                    {item.water_saved} L
                                                </td>

                                                <td className="font-bold text-green-700">
                                                    {item.circularity}%
                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </section>


                    {/* ================================================= */}
                    {/* SUSTAINABILITY PERFORMANCE */}
                    {/* ================================================= */}

                    <section className="bg-indigo-900 text-white rounded-2xl p-8">

                        <h2 className="text-2xl font-bold mb-6">

                            🌍 Sustainability Performance

                        </h2>


                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


                            <Performance
                                title="Sustainability Score"
                                value={`${summary.average_sustainability}%`}
                            />


                            <Performance
                                title="Circularity Score"
                                value={`${summary.average_circularity}%`}
                            />


                            <Performance
                                title="Waste Diversion"
                                value={`${circular.waste_diversion}%`}
                            />

                        </div>

                    </section>


                </div>

            </div>

        </div>

    );

}


function MetricCard({
    title,
    value,
    icon
}) {

    return (

        <div className="bg-white rounded-2xl shadow p-5">

            <div className="text-3xl">
                {icon}
            </div>

            <p className="text-gray-500 text-sm mt-3">
                {title}
            </p>

            <p className="text-2xl font-bold text-indigo-900 mt-2">
                {value}
            </p>

        </div>

    );

}


function InsightCard({
    title,
    value,
    text
}) {

    return (

        <div className="border rounded-xl p-5">

            <p className="text-gray-500">
                {title}
            </p>

            <p className="text-3xl font-bold text-indigo-900 mt-2">
                {value}
            </p>

            <p className="text-sm text-gray-500 mt-2">
                {text}
            </p>

        </div>

    );

}


function Performance({
    title,
    value
}) {

    return (

        <div>

            <p className="text-indigo-200">
                {title}
            </p>

            <p className="text-3xl font-bold mt-2">
                {value}
            </p>

        </div>

    );

}


export default ManufacturerDashboard;