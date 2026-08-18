import { useEffect, useState } from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
    getFacilitySummary,
    getFacilityInventory,
    getRecyclingOpportunities,
    getProcessingAnalytics,
    getRecoveryStatistics
} from "../services/recyclingFacilityDashboardService";


function RecyclingFacilityDashboard() {

    const [summary, setSummary] = useState({
        total_registrations: 0,
        total_batches: 0,
        total_weight: 0,
        total_quantity: 0,
        collected_batches: 0
    });

    const [inventory, setInventory] = useState([]);

    const [opportunities, setOpportunities] = useState({
        total: 0,
        recyclable: 0,
        reusable: 0,
        other: 0
    });

    const [processing, setProcessing] = useState({
        recyclable: 0,
        reusable: 0,
        other: 0
    });

    const [recovery, setRecovery] = useState({
        total_weight: 0,
        recovered: 0,
        reused: 0,
        total_recovered: 0,
        recovery_percentage: 0
    });


    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            const [
                summaryRes,
                inventoryRes,
                opportunityRes,
                processingRes,
                recoveryRes
            ] = await Promise.all([

                getFacilitySummary(),

                getFacilityInventory(),

                getRecyclingOpportunities(),

                getProcessingAnalytics(),

                getRecoveryStatistics()

            ]);


            setSummary(summaryRes.data);

            setInventory(inventoryRes.data);

            setOpportunities(opportunityRes.data);

            setProcessing(processingRes.data);

            setRecovery(recoveryRes.data);

        }

        catch (error) {

            console.log(
                "Recycling Facility Dashboard Error:",
                error
            );

        }

    };


    const opportunityChart = [

        {
            name: "Recyclable",
            value: opportunities.recyclable
        },

        {
            name: "Reusable",
            value: opportunities.reusable
        },

        {
            name: "Other",
            value: opportunities.other
        }

    ];


    const processingChart = [

        {
            name: "Recyclable",
            quantity: processing.recyclable
        },

        {
            name: "Reusable",
            quantity: processing.reusable
        },

        {
            name: "Other",
            quantity: processing.other
        }

    ];


    const recoveryChart = [

        {
            name: "Recovered",
            quantity: recovery.recovered
        },
    
        {
            name: "Reused",
            quantity: recovery.reused
        }
    
    ];

    return (

        <div className="flex min-h-screen">

            <Sidebar />

            <div className="flex-1 bg-slate-50">

                <Navbar />

                <div className="p-8">


                    {/* HEADER */}

                    <h1 className="text-3xl font-bold text-cyan-900">

                        ♻️ Recycling Facility Dashboard

                    </h1>

                    <p className="text-gray-600 mt-2 mb-8">

                        Waste inventory, recycling opportunities,
                        processing analytics and recovery statistics

                    </p>


                    {/* ================================================= */}
                    {/* SUMMARY CARDS */}
                    {/* ================================================= */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 mb-10">


                        <DashboardCard
                            title="Total Waste Records"
                            value={summary.total_registrations}
                            icon="📋"
                        />


                        <DashboardCard
                            title="Total Batches"
                            value={summary.total_batches}
                            icon="📦"
                        />


                        <DashboardCard
                            title="Total Waste Weight"
                            value={`${summary.total_weight} Kg`}
                            icon="⚖️"
                        />


                        <DashboardCard
                            title="Collected Batches"
                            value={summary.collected_batches}
                            icon="🚚"
                        />


                        <DashboardCard
                            title="Recovery Rate"
                            value={`${recovery.recovery_percentage}%`}
                            icon="♻️"
                        />

                    </div>


                    {/* ================================================= */}
                    {/* WASTE INVENTORY */}
                    {/* ================================================= */}

                    <div className="bg-white rounded-2xl shadow p-6 mb-8">

                        <h2 className="text-2xl font-bold text-cyan-900 mb-6">

                            📦 Waste Inventory

                        </h2>


                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


                            {/* FABRIC CHART */}

                            <div>

                                <h3 className="font-bold text-gray-700 mb-4">

                                    Fabric-wise Waste Inventory

                                </h3>

                                <ResponsiveContainer
                                    width="100%"
                                    height={320}
                                >

                                    <BarChart data={inventory}>

                                        <CartesianGrid strokeDasharray="3 3" />

                                        <XAxis
                                            dataKey="fabric"
                                        />

                                        <YAxis />

                                        <Tooltip />

                                        <Legend />

                                        <Bar
                                            dataKey="weight"
                                            name="Weight (Kg)"
                                            fill="#0891b2"
                                        />

                                    </BarChart>

                                </ResponsiveContainer>

                            </div>


                            {/* INVENTORY TABLE */}

                            <div>

                                <h3 className="font-bold text-gray-700 mb-4">

                                    Current Waste Inventory

                                </h3>

                                <div className="overflow-x-auto">

                                    <table className="w-full border">

                                        <thead className="bg-cyan-700 text-white">

                                            <tr>

                                                <th className="p-3">
                                                    Fabric
                                                </th>

                                                <th className="p-3">
                                                    Weight
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {inventory.map(
                                                (item, index) => (

                                                    <tr
                                                        key={index}
                                                        className="border-b text-center"
                                                    >

                                                        <td className="p-3 font-semibold">
                                                            {item.fabric}
                                                        </td>

                                                        <td>
                                                            {item.weight} Kg
                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* RECYCLING OPPORTUNITIES */}
                    {/* ================================================= */}

                    <div className="bg-white rounded-2xl shadow p-6 mb-8">

                        <h2 className="text-2xl font-bold text-cyan-900 mb-6">

                            ♻️ Recycling Opportunities

                        </h2>


                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


                            <div>

                                <h3 className="font-bold text-gray-700 mb-4">

                                    Waste Opportunity Distribution

                                </h3>


                                <ResponsiveContainer
                                    width="100%"
                                    height={320}
                                >

                                    <PieChart>

                                        <Pie
                                            data={opportunityChart}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={110}
                                            label
                                        >

                                            {opportunityChart.map(
                                                (entry, index) => (

                                                    <Cell
                                                        key={index}
                                                        fill={
                                                            [
                                                                "#16a34a",
                                                                "#2563eb",
                                                                "#94a3b8"
                                                            ][index]
                                                        }
                                                    />

                                                )
                                            )}

                                        </Pie>

                                        <Tooltip />

                                        <Legend />

                                    </PieChart>

                                </ResponsiveContainer>

                            </div>


                            <div className="grid grid-cols-1 gap-4">


                                <OpportunityCard
                                    title="Recycling Opportunities"
                                    value={opportunities.recyclable}
                                    text="Batches suitable for recycling"
                                    icon="♻️"
                                />


                                <OpportunityCard
                                    title="Reuse Opportunities"
                                    value={opportunities.reusable}
                                    text="Batches suitable for reuse"
                                    icon="🔄"
                                />


                                <OpportunityCard
                                    title="Other Processing"
                                    value={opportunities.other}
                                    text="Requires further processing"
                                    icon="⚙️"
                                />

                            </div>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* PROCESSING ANALYTICS */}
                    {/* ================================================= */}

                    <div className="bg-white rounded-2xl shadow p-6 mb-8">

                        <h2 className="text-2xl font-bold text-cyan-900 mb-6">

                            ⚙️ Processing Analytics

                        </h2>


                        <ResponsiveContainer
                            width="100%"
                            height={350}
                        >

                            <BarChart data={processingChart}>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="name" />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Bar
                                    dataKey="quantity"
                                    name="Waste Quantity (Kg)"
                                    fill="#0f766e"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>


                    {/* ================================================= */}
                    {/* RECOVERY STATISTICS */}
                    {/* ================================================= */}

                    <div className="bg-white rounded-2xl shadow p-6 mb-8">

                        <h2 className="text-2xl font-bold text-cyan-900 mb-6">

                            📊 Recovery Statistics

                        </h2>


                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


                            <div>

                                <ResponsiveContainer
                                    width="100%"
                                    height={330}
                                >

                                    <PieChart>

                                        <Pie
                                            data={recoveryChart}
                                            dataKey="quantity"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={110}
                                            label
                                        >

                                            {recoveryChart.map(
                                                (entry, index) => (

                                                    <Cell
                                                        key={index}
                                                        fill={
                                                            [
                                                                "#16a34a",
                                                                "#2563eb",
                                                                "#cbd5e1"
                                                            ][index]
                                                        }
                                                    />

                                                )
                                            )}

                                        </Pie>

                                        <Tooltip />

                                        <Legend />

                                    </PieChart>

                                </ResponsiveContainer>

                            </div>


                            <div className="grid grid-cols-2 gap-5">


                                <StatCard
                                    title="Total Waste"
                                    value={`${recovery.total_weight} Kg`}
                                />


                                <StatCard
                                    title="Recovered"
                                    value={`${recovery.recovered} Kg`}
                                />


                                <StatCard
                                    title="Reused"
                                    value={`${recovery.reused} Kg`}
                                />


<StatCard
    title="Recovery Rate"
    value={`${recovery.recovery_percentage}%`}
/>

                            </div>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* FINAL FACILITY SUMMARY */}
                    {/* ================================================= */}

                    <div className="bg-cyan-900 text-white rounded-2xl p-8">

                        <h2 className="text-2xl font-bold mb-4">

                            ♻️ Facility Processing Overview

                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            <div>

                                <p className="text-cyan-200">
                                    Waste Received
                                </p>

                                <p className="text-3xl font-bold mt-2">
                                    {summary.total_weight} Kg
                                </p>

                            </div>


                            <div>
                            <p className="text-cyan-200">
    Material Recovered
</p>

<p className="text-3xl font-bold mt-2">
    {recovery.recovered} Kg
</p>

                              

                            </div>


                            <div>

                                <p className="text-cyan-200">
                                    Recovery Efficiency
                                </p>

                                <p className="text-3xl font-bold mt-2">
                                    {recovery.recovery_percentage}%
                                </p>

                            </div>

                        </div>

                    </div>


                </div>

            </div>

        </div>

    );

}


function DashboardCard({
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

            <p className="text-2xl font-bold text-cyan-900 mt-2">
                {value}
            </p>

        </div>

    );

}


function OpportunityCard({
    title,
    value,
    text,
    icon
}) {

    return (

        <div className="border rounded-xl p-5">

            <div className="flex justify-between">

                <div>

                    <p className="text-gray-500">
                        {title}
                    </p>

                    <p className="text-3xl font-bold text-cyan-900 mt-2">
                        {value}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                        {text}
                    </p>

                </div>

                <span className="text-3xl">
                    {icon}
                </span>

            </div>

        </div>

    );

}


function StatCard({
    title,
    value
}) {

    return (

        <div className="bg-slate-50 rounded-xl p-5">

            <p className="text-gray-500">
                {title}
            </p>

            <p className="text-2xl font-bold text-cyan-900 mt-2">
                {value}
            </p>

        </div>

    );

}


export default RecyclingFacilityDashboard;