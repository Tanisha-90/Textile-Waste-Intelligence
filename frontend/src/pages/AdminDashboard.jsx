import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
    getAdminDashboard,
    getFabricAnalysis,
    getWasteCategory,
    getCollectionLocations,
    getWasteSources,
    getBatchAnalysis
} from "../services/adminService";

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


function AdminDashboard() {

    const [dashboard, setDashboard] = useState({
        total_waste_records: 0,
        total_batches: 0,
        total_collections: 0,
        total_sources: 0,
        total_weight: 0,
        total_quantity: 0
    });

    const [fabricData, setFabricData] = useState([]);

    const [categoryData, setCategoryData] = useState([]);

    const [locationData, setLocationData] = useState([]);

    const [sourceData, setSourceData] = useState([]);

    const [batchData, setBatchData] = useState([]);


    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            const dashboardResponse =
                await getAdminDashboard();

            const fabricResponse =
                await getFabricAnalysis();

            const categoryResponse =
                await getWasteCategory();

            const locationResponse =
                await getCollectionLocations();

            const sourceResponse =
                await getWasteSources();

            const batchResponse =
                await getBatchAnalysis();


            setDashboard(
                dashboardResponse.data
            );

            setFabricData(
                fabricResponse.data
            );

            setCategoryData(
                categoryResponse.data
            );

            setLocationData(
                locationResponse.data
            );

            setSourceData(
                sourceResponse.data
            );

            setBatchData(
                batchResponse.data
            );

        }

        catch (error) {

            console.log(
                "Admin Dashboard Error:",
                error
            );

        }

    };


    return (

        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />


            <div className="flex-1">

                <Navbar />


                <div className="p-8">


                    {/* ================================= */}
                    {/* HEADER */}
                    {/* ================================= */}

                    <h1 className="text-3xl font-bold text-slate-900">

                        🛡️ Admin Dashboard

                    </h1>


                    <p className="text-gray-600 mt-2 mb-8">

                        Centralized monitoring of textile waste,
                        inventory, collections and processing activities

                    </p>



                    {/* ================================= */}
                    {/* OVERVIEW CARDS */}
                    {/* ================================= */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-5 mb-10">


                        <DashboardCard
                            title="Waste Records"
                            value={dashboard.total_waste_records}
                            icon="📋"
                        />


                        <DashboardCard
                            title="Batches"
                            value={dashboard.total_batches}
                            icon="📦"
                        />


                        <DashboardCard
                            title="Collections"
                            value={dashboard.total_collections}
                            icon="🚚"
                        />


                        <DashboardCard
                            title="Waste Weight"
                            value={`${dashboard.total_weight} Kg`}
                            icon="⚖️"
                        />


                        <DashboardCard
                            title="Waste Sources"
                            value={dashboard.total_sources}
                            icon="📍"
                        />


                        <DashboardCard
                            title="Quantity"
                            value={dashboard.total_quantity}
                            icon="🧵"
                        />


                    </div>



                    {/* ================================= */}
                    {/* FABRIC + CATEGORY */}
                    {/* ================================= */}

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">


                        {/* Fabric Chart */}

                        <div className="bg-white rounded-2xl shadow p-6">

                            <h2 className="text-xl font-bold text-slate-800 mb-5">

                                🧵 Fabric-wise Waste Distribution

                            </h2>


                            <ResponsiveContainer
                                width="100%"
                                height={350}
                            >

                                <BarChart data={fabricData}>

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
                                        name="Weight (Kg)"
                                        fill="#0f766e"
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>



                        {/* Waste Category */}

                        <div className="bg-white rounded-2xl shadow p-6">

                            <h2 className="text-xl font-bold text-slate-800 mb-5">

                                ♻️ Waste Category Distribution

                            </h2>


                            <ResponsiveContainer
                                width="100%"
                                height={350}
                            >

                                <PieChart>

                                    <Pie
                                        data={categoryData}
                                        dataKey="count"
                                        nameKey="category"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={120}
                                        label
                                    >

                                        {
                                            categoryData.map(
                                                (entry, index) => (

                                                    <Cell
                                                        key={index}
                                                        fill={
                                                            [
                                                                "#059669",
                                                                "#2563eb",
                                                                "#f59e0b",
                                                                "#dc2626",
                                                                "#7c3aed"
                                                            ][index % 5]
                                                        }
                                                    />

                                                )
                                            )
                                        }

                                    </Pie>

                                    <Tooltip />

                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>


                    </div>



                    {/* ================================= */}
                    {/* COLLECTION + BATCH */}
                    {/* ================================= */}

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">


                        {/* Collection Locations */}

                        <div className="bg-white rounded-2xl shadow p-6">

                            <h2 className="text-xl font-bold text-slate-800 mb-5">

                                📍 Collection Location Analytics

                            </h2>


                            <ResponsiveContainer
                                width="100%"
                                height={350}
                            >

                                <BarChart data={locationData}>

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis
                                        dataKey="location"
                                    />

                                    <YAxis />

                                    <Tooltip />

                                    <Bar
                                        dataKey="count"
                                        name="Collections"
                                        fill="#2563eb"
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>



                        {/* Batch Analysis */}

                        <div className="bg-white rounded-2xl shadow p-6">

                            <h2 className="text-xl font-bold text-slate-800 mb-5">

                                📦 Batch-wise Waste Quantity

                            </h2>


                            <ResponsiveContainer
                                width="100%"
                                height={350}
                            >

                                <BarChart data={batchData}>

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis
                                        dataKey="fabric"
                                    />

                                    <YAxis />

                                    <Tooltip />

                                    <Bar
                                        dataKey="quantity"
                                        name="Quantity (Kg)"
                                        fill="#7c3aed"
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>


                    </div>



                    {/* ================================= */}
                    {/* WASTE SOURCES */}
                    {/* ================================= */}

                    <div className="bg-white rounded-2xl shadow p-6 mb-10">


                        <h2 className="text-xl font-bold text-slate-800 mb-5">

                            🚚 Waste Source Analytics

                        </h2>


                        <ResponsiveContainer
                            width="100%"
                            height={350}
                        >

                            <BarChart data={sourceData}>

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="source"
                                />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Bar
                                    dataKey="count"
                                    name="Waste Records"
                                    fill="#0891b2"
                                />

                            </BarChart>

                        </ResponsiveContainer>


                    </div>



                    {/* ================================= */}
                    {/* DATA TABLE */}
                    {/* ================================= */}

                    <div className="bg-white rounded-2xl shadow p-6">


                        <h2 className="text-xl font-bold text-slate-800 mb-5">

                            📊 Fabric Inventory Summary

                        </h2>


                        <div className="overflow-x-auto">

                            <table className="w-full border">


                                <thead className="bg-slate-800 text-white">

                                    <tr>

                                        <th className="p-3">
                                            Fabric
                                        </th>

                                        <th className="p-3">
                                            Waste Weight (Kg)
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {
                                        fabricData.map(
                                            (item, index) => (

                                                <tr
                                                    key={index}
                                                    className="border-b text-center"
                                                >

                                                    <td className="p-3 font-semibold">

                                                        {item.fabric}

                                                    </td>


                                                    <td className="p-3">

                                                        {item.weight} Kg

                                                    </td>

                                                </tr>

                                            )
                                        )
                                    }

                                </tbody>


                            </table>

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

            <div className="text-3xl mb-3">

                {icon}

            </div>


            <p className="text-gray-500 text-sm">

                {title}

            </p>


            <h2 className="text-2xl font-bold text-slate-900 mt-2">

                {value}

            </h2>

        </div>

    );

}


export default AdminDashboard;