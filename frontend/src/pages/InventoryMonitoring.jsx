import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import InventoryCharts from "../components/InventoryCharts";

import {
  getDashboard,
  getFabricSummary,
  getLocationSummary,
  getSourceSummary,
  getRecentRegistrations,
  getRecentCollections,
  getRecentSources,
  getBatchActivity
} from "../services/inventoryService";

function InventoryMonitoring() {

  const navigate = useNavigate();

  // ==========================
  // Dashboard Summary
  // ==========================

  const [dashboard, setDashboard] = useState({
    total_registrations: 0,
    total_batches: 0,
    total_quantity: 0,
    total_weight: 0,
    total_locations: 0
  });

  // ==========================
  // Tables
  // ==========================

  const [fabricSummary, setFabricSummary] = useState([]);

  const [locationSummary, setLocationSummary] = useState([]);

  const [sourceSummary, setSourceSummary] = useState([]);

  const [recentRegistrations, setRecentRegistrations] = useState([]);

  const [recentCollections, setRecentCollections] = useState([]);

  const [recentSources, setRecentSources] = useState([]);

  const [batchActivity, setBatchActivity] = useState([]);

  // ==========================
  // Load Dashboard
  // ==========================

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const dashboardRes = await getDashboard();

      const fabricRes = await getFabricSummary();

      const locationRes = await getLocationSummary();

      const sourceRes = await getSourceSummary();

      const registrationRes = await getRecentRegistrations();

      const collectionRes = await getRecentCollections();

      const recentSourceRes = await getRecentSources();

      const batchRes = await getBatchActivity();

      setDashboard(dashboardRes.data);

      setFabricSummary(fabricRes.data);

      setLocationSummary(locationRes.data);

      setSourceSummary(sourceRes.data);

      setRecentRegistrations(registrationRes.data);

      setRecentCollections(collectionRes.data);

      setRecentSources(recentSourceRes.data);

      setBatchActivity(batchRes.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-blue-100 min-h-screen">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl  text-sky-900 font-bold mb-8">

            Inventory Monitoring Dashboard

          </h1>

          {/* ========================== */}
          {/* Dashboard Cards */}
          {/* ========================== */}

          <div className="grid grid-cols-5 gap-6 mb-10">

            <div className="bg-white rounded-xl shadow p-6 text-center">

              <h2 className="text-gray-700 mb-2">

                Total Registrations

              </h2>

              <p className="text-4xl font-bold text-blue-950">

                {dashboard.total_registrations}

              </p>

            </div>

            <div className="bg-white rounded-xl shadow p-6 text-center">

              <h2 className="text-gray-700 mb-2">

                Total Batches

              </h2>

              <p className="text-4xl font-bold text-blue-950">

                {dashboard.total_batches}

              </p>

            </div>

            <div className="bg-white rounded-xl shadow p-6 text-center">

              <h2 className="text-gray-700 mb-2">

                Total Quantity

              </h2>

              <p className="text-4xl font-bold text-blue-950">

                {dashboard.total_quantity}

              </p>

            </div>

            <div className="bg-white rounded-xl shadow p-6 text-center">

              <h2 className="text-gray-700 mb-2">

                Total Weight (Kg)

              </h2>

              <p className="text-4xl font-bold text-blue-950">

                {dashboard.total_weight}

              </p>

            </div>

            <div className="bg-white rounded-xl shadow p-6 text-center">

              <h2 className="text-gray-700 mb-2">

                Collection Locations

              </h2>

              <p className="text-4xl font-bold text-blue-950">

                {dashboard.total_locations}

              </p>

            </div>

          </div>

                    {/* ========================== */}
          {/* Fabric Summary */}
          {/* ========================== */}

          <div className="bg-white rounded-xl shadow p-6 mb-8 max-w-5xl mx-auto">

            <h2 className="text-2xl text-mist-700 font-bold mb-5">
              Fabric-wise Summary
            </h2>

            <table className="w-full border">

              <thead className="bg-emerald-700 text-white">

                <tr>

                  <th className="p-3">Fabric Type</th>

                  <th className="p-3">Total Quantity</th>

                </tr>

              </thead>

              <tbody>

                {fabricSummary.map((item, index) => (

                  <tr
                    key={index}
                    className="border-b text-center"
                  >

                    <td className="p-3">
                      {item.fabric}
                    </td>

                    <td>
                      {item.quantity}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* ========================== */}
          {/* Collection Location Summary */}
          {/* ========================== */}

          <div className="bg-white rounded-xl shadow p-6 mb-8 max-w-5xl mx-auto">

            <h2 className="text-2xl text-mist-700 font-bold mb-5">
              Collection Location Summary
            </h2>

            <table className="w-full border">

              <thead className="bg-teal-700 text-white">

                <tr>

                  <th className="p-3">Location</th>

                  <th className="p-3">Collections</th>

                </tr>

              </thead>

              <tbody>

                {locationSummary.map((item, index) => (

                  <tr
                    key={index}
                    className="border-b text-center"
                  >

                    <td className="p-3">
                      {item.location}
                    </td>

                    <td>
                      {item.collections}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* ========================== */}
          {/* Waste Source Summary */}
          {/* ========================== */}

          <div className="bg-white rounded-xl shadow p-6 mb-8 max-w-5xl mx-auto">

            <h2 className="text-2xl text-mist-700 font-bold mb-5">
              Waste Source Summary
            </h2>

            <table className="w-full border">

              <thead className="bg-sky-800 text-white">

                <tr>

                  <th className="p-3">Source</th>

                  <th className="p-3">Count</th>

                </tr>

              </thead>

              <tbody>

                {sourceSummary.map((item, index) => (

                  <tr
                    key={index}
                    className="border-b text-center"
                  >

                    <td className="p-3">
                      {item.source}
                    </td>

                    <td>
                      {item.count}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
          
{/* Inventory Insights */}


<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

<div className="bg-gradient-to-r from-teal-600 to-cyan-700 rounded-xl shadow-lg p-6 text-white">

  <div className="text-3xl mb-3">🧵</div>

  <p className="text-sm opacity-90">
    Most Common Fabric
  </p>

  <h2 className="text-2xl font-bold mt-2">
    {fabricSummary.length > 0
      ? fabricSummary.reduce((a, b) => a.quantity > b.quantity ? a : b).fabric
      : "-"}
  </h2>

  <p className="text-sm mt-2">
    Highest Quantity
  </p>

</div>

<div className="bg-white rounded-xl shadow-lg border-l-4 border-cyan-500 p-6">

  <div className="text-3xl mb-3">📍</div>

  <p className="text-gray-500 text-sm">
    Top Collection Location
  </p>

  <h2 className="text-2xl font-bold text-cyan-700 mt-2">
    {locationSummary.length > 0
      ? locationSummary.reduce((a, b) => a.collections > b.collections ? a : b).location
      : "-"}
  </h2>

  <p className="text-gray-500 mt-2">
    Highest Collections
  </p>

</div>

<div className="bg-white rounded-xl shadow-lg border-l-4 border-teal-500 p-6">

  <div className="text-3xl mb-3">🚚</div>

  <p className="text-gray-500 text-sm">
    Main Waste Source
  </p>

  <h2 className="text-2xl font-bold text-teal-700 mt-2">
    {sourceSummary.length > 0
      ? sourceSummary.reduce((a, b) => a.count > b.count ? a : b).source
      : "-"}
  </h2>

  <p className="text-gray-500 mt-2">
    Most Frequent Source
  </p>

</div>

<div className="bg-gradient-to-r from-teal-600 to-cyan-700 rounded-xl shadow-lg p-6 text-white">

  <div className="text-3xl mb-3">📦</div>

  <p className="text-sm opacity-90">
    Total Inventory
  </p>

  <h2 className="text-2xl font-bold mt-2">
    {dashboard.total_quantity} Kg
  </h2>

  <p className="text-sm mt-2">
    Registered Quantity
  </p>

</div>

</div>
          
         

          
          


          {/* ========================== */}
          {/* Navigation Buttons */}
          {/* ========================== */}

          <div className="flex justify-between mt-10">

            <button
              type="button"
              onClick={() => navigate("/waste-source-tracking")}
              className="bg-gray-600  hover:bg-gray-500 text-white px-8 py-3 rounded-lg"
            >
              ← Previous
            </button>

            <button
              type="button"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg"
            >
              Dashboard Completed
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default InventoryMonitoring;
