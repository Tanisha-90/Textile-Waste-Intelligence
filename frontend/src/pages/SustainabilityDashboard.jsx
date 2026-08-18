import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  getDashboardSummary,
  getFabricAnalysis,
  getWasteDiversion,
  getESGReport
} from "../services/sustainabilityService";


function SustainabilityDashboard() {

  const [metrics, setMetrics] = useState({
    total_analysis: 0,
    total_carbon: 0,
    total_co2_saved: 0,
    total_water_saved: 0,
    average_circularity: 0,
    average_sustainability: 0
  });

  const [fabricData, setFabricData] = useState([]);
  const [wasteData, setWasteData] = useState([]);
  const [esg, setESG] = useState(null);


  useEffect(() => {
    loadDashboard();
  }, []);


  const loadDashboard = async () => {

    try {

      const metricResponse = await getDashboardSummary();
      const fabricResponse = await getFabricAnalysis();
      const wasteResponse = await getWasteDiversion();
      const esgResponse = await getESGReport();

      setMetrics(metricResponse.data);
      setFabricData(fabricResponse.data);
      setWasteData(wasteResponse.data);
      setESG(esgResponse.data);

    }

    catch (error) {

      console.log(
        "Sustainability Dashboard Error",
        error
      );

    }

  };


  // ------------------------------------
  // Chart Data
  // ------------------------------------

  const carbonChartData = fabricData.map(item => ({
    fabric: item.fabric,
    carbon: Number(item.carbon) || 0
  }));


  const co2ChartData = fabricData.map(item => ({
    fabric: item.fabric,
    co2_saved: Number(item.co2_saved) || 0
  }));


  const circularityChartData = fabricData.map(item => ({
    fabric: item.fabric,
    circularity: Number(item.circularity) || 0
  }));


  const diversionChartData = wasteData.map(item => ({
    fabric: item.fabric,
    diversion: Number(item.waste_diversion) || 0
  }));


  const recoveryChartData = wasteData.map(item => ({
    fabric: item.fabric,
    recovered: Number(item.recovered) || 0,
    reused: Number(item.reused) || 0
  }));


  const sustainabilityPieData = fabricData.map(item => ({
    name: item.fabric,
    value: Number(item.circularity) || 0
  }));


  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-green-50 min-h-screen">

        <Navbar />

        <div className="p-8">

          {/* =====================================
              HEADER
          ===================================== */}

          <div className="mb-8">

            <h1 className="text-3xl font-bold text-emerald-900">

              🌱 Sustainability Manager Dashboard

            </h1>

            <p className="text-gray-600 mt-2">

              Environmental impact monitoring and ESG sustainability reporting

            </p>

          </div>


          {/* =====================================
              SUSTAINABILITY METRICS
          ===================================== */}

          <h2 className="text-2xl font-bold text-emerald-800 mb-5">

            Sustainability Metrics

          </h2>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-10">


            <MetricCard
              icon="📋"
              title="Total Analysis"
              value={metrics.total_analysis}
            />


            <MetricCard
              icon="🌍"
              title="Carbon Footprint"
              value={`${metrics.total_carbon} kg CO₂`}
            />


            <MetricCard
              icon="♻️"
              title="CO₂ Saved"
              value={`${metrics.total_co2_saved} kg`}
            />


            <MetricCard
              icon="💧"
              title="Water Saved"
              value={`${metrics.total_water_saved} L`}
            />


            <MetricCard
              icon="🔄"
              title="Circularity"
              value={`${metrics.average_circularity}%`}
            />


            <MetricCard
              icon="🌱"
              title="Sustainability"
              value={`${metrics.average_sustainability}%`}
            />


          </div>


          {/* =====================================
              VISUAL ANALYTICS
          ===================================== */}

          <h2 className="text-2xl font-bold text-emerald-800 mb-5">

            📊 Sustainability Visual Analytics

          </h2>


          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">


            {/* Carbon Chart */}

            <ChartCard title="🌍 Carbon Footprint by Fabric">

              <ResponsiveContainer width="100%" height={320}>

                <BarChart data={carbonChartData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="fabric" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="carbon"
                    name="Carbon Footprint (kg CO₂)"
                    fill="#059669"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </ChartCard>


            {/* CO2 Saved Chart */}

            <ChartCard title="♻️ CO₂ Saved by Fabric">

              <ResponsiveContainer width="100%" height={320}>

                <BarChart data={co2ChartData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="fabric" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="co2_saved"
                    name="CO₂ Saved (kg)"
                    fill="#0891b2"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </ChartCard>


            {/* Circularity Chart */}

            <ChartCard title="🔄 Circularity by Fabric">

              <ResponsiveContainer width="100%" height={320}>

                <BarChart data={circularityChartData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="fabric" />

                  <YAxis domain={[0, 100]} />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="circularity"
                    name="Circularity (%)"
                    fill="#16a34a"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </ChartCard>


            {/* Waste Diversion */}

            <ChartCard title="♻️ Waste Diversion by Fabric">

              <ResponsiveContainer width="100%" height={320}>

                <BarChart data={diversionChartData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="fabric" />

                  <YAxis domain={[0, 100]} />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="diversion"
                    name="Waste Diversion (%)"
                    fill="#0d9488"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </ChartCard>


          </div>


          {/* =====================================
              RECOVERY ANALYTICS
          ===================================== */}

          <h2 className="text-2xl font-bold text-emerald-800 mb-5">

            ♻️ Recovery Analytics

          </h2>


          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">


            <ChartCard title="Recovered vs Reused Material">

              <ResponsiveContainer width="100%" height={340}>

                <BarChart data={recoveryChartData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="fabric" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="recovered"
                    name="Recovered (Kg)"
                    fill="#059669"
                    radius={[6, 6, 0, 0]}
                  />

                  <Bar
                    dataKey="reused"
                    name="Reused (Kg)"
                    fill="#2563eb"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </ChartCard>


            <ChartCard title="Circularity Distribution">

              <ResponsiveContainer width="100%" height={340}>

                <PieChart>

                  <Pie
                    data={sustainabilityPieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                  >

                    {sustainabilityPieData.map(
                      (entry, index) => (

                        <Cell
                          key={`cell-${index}`}
                          fill={
                            [
                              "#059669",
                              "#0891b2",
                              "#16a34a",
                              "#2563eb",
                              "#7c3aed",
                              "#d97706"
                            ][index % 6]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </ChartCard>


          </div>


          {/* =====================================
              FABRIC WISE TABLE
          ===================================== */}

          <h2 className="text-2xl font-bold text-emerald-800 mb-5">

            📋 Fabric Wise Sustainability Analysis

          </h2>


          <div className="bg-white rounded-xl shadow overflow-hidden mb-10">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-emerald-700 text-white">

                  <tr>

                    <th className="p-4 text-left">
                      Fabric
                    </th>

                    <th className="p-4">
                      Weight (Kg)
                    </th>

                    <th className="p-4">
                      Carbon
                    </th>

                    <th className="p-4">
                      CO₂ Saved
                    </th>

                    <th className="p-4">
                      Water Saved
                    </th>

                    <th className="p-4">
                      Circularity
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {fabricData.map(
                    (item, index) => (

                      <tr
                        key={index}
                        className="border-b hover:bg-green-50 text-center"
                      >

                        <td className="p-4 text-left font-semibold text-emerald-800">

                          {item.fabric}

                        </td>

                        <td>
                          {item.weight} kg
                        </td>

                        <td>
                          {item.carbon} kg
                        </td>

                        <td className="text-cyan-700 font-semibold">
                          {item.co2_saved} kg
                        </td>

                        <td>
                          {item.water_saved} L
                        </td>

                        <td className="font-bold text-emerald-700">
                          {item.circularity}%
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>


          {/* =====================================
              CARBON REDUCTION REPORT
          ===================================== */}

          <h2 className="text-2xl font-bold text-emerald-800 mb-5">

            🌍 Carbon Reduction Reports

          </h2>


          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">


            {fabricData.map(
              (item, index) => (

                <div
                  key={index}
                  className="bg-white rounded-xl shadow p-6 border-l-4 border-emerald-600"
                >

                  <div className="flex justify-between items-center">

                    <h3 className="text-xl font-bold text-emerald-900">

                      {item.fabric}

                    </h3>

                    <span className="text-2xl">
                      🌱
                    </span>

                  </div>


                  <div className="mt-5 space-y-3">

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Carbon Footprint
                      </span>

                      <b>
                        {item.carbon} kg
                      </b>

                    </div>


                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        CO₂ Saved
                      </span>

                      <b className="text-cyan-700">
                        {item.co2_saved} kg
                      </b>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>


          {/* =====================================
              WASTE DIVERSION
          ===================================== */}

          <h2 className="text-2xl font-bold text-emerald-800 mb-5">

            ♻️ Waste Diversion Analytics

          </h2>


          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">


            {wasteData.map(
              (item, index) => (

                <div
                  key={index}
                  className="bg-white rounded-xl shadow p-6"
                >

                  <div className="flex justify-between">

                    <h3 className="text-xl font-bold text-emerald-700">

                      {item.fabric}

                    </h3>

                    <span>
                      ♻️
                    </span>

                  </div>


                  <div className="mt-5 space-y-3 text-sm">

                    <p className="flex justify-between">

                      <span>Total Waste</span>

                      <b>
                        {item.total_weight} Kg
                      </b>

                    </p>


                    <p className="flex justify-between">

                      <span>Recovered</span>

                      <b className="text-emerald-700">
                        {item.recovered} Kg
                      </b>

                    </p>


                    <p className="flex justify-between">

                      <span>Reused</span>

                      <b className="text-blue-700">
                        {item.reused} Kg
                      </b>

                    </p>


                    <p className="flex justify-between">

                      <span>Waste Diversion</span>

                      <b>
                        {item.waste_diversion}%
                      </b>

                    </p>


                    <p className="flex justify-between">

                      <span>Landfill Reduction</span>

                      <b>
                        {item.landfill_reduction}%
                      </b>

                    </p>

                  </div>


                  {/* Progress bar */}

                  <div className="mt-5">

                    <div className="w-full bg-gray-200 rounded-full h-3">

                      <div
                        className="bg-emerald-600 h-3 rounded-full"
                        style={{
                          width: `${Math.min(
                            Number(item.waste_diversion) || 0,
                            100
                          )}%`
                        }}
                      />

                    </div>

                  </div>

                </div>

              )
            )}

          </div>


          {/* =====================================
              ESG REPORTING
          ===================================== */}

          <h2 className="text-2xl font-bold text-emerald-800 mb-5">

            🌍 ESG Reporting

          </h2>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">


            {/* Environmental */}

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-emerald-600">

              <div className="text-3xl mb-3">
                🌍
              </div>

              <h3 className="text-xl font-bold text-emerald-700 mb-5">

                Environmental

              </h3>


              <div className="space-y-4">

                <ESGRow
                  label="CO₂ Saved"
                  value={`${esg?.environment?.co2_saved ?? 0} kg`}
                />

                <ESGRow
                  label="Water Saved"
                  value={`${esg?.environment?.water_saved ?? 0} L`}
                />

                <ESGRow
                  label="Waste Diversion"
                  value={`${esg?.environment?.waste_diversion ?? 0}%`}
                />

                <ESGRow
                  label="Circularity"
                  value={`${esg?.environment?.circularity ?? 0}%`}
                />

              </div>

            </div>


            {/* Social */}

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600">

              <div className="text-3xl mb-3">
                🧵
              </div>

              <h3 className="text-xl font-bold text-blue-700 mb-5">

                Social

              </h3>


              <div className="space-y-4">

                <ESGRow
                  label="Waste Records Processed"
                  value={esg?.social?.total_analysis ?? 0}
                />

                <ESGRow
                  label="Material Recovered"
                  value={`${esg?.social?.material_recovered ?? 0} Kg`}
                />

              </div>

            </div>


            {/* Governance */}

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-600">

              <div className="text-3xl mb-3">
                📊
              </div>

              <h3 className="text-xl font-bold text-purple-700 mb-5">

                Governance

              </h3>


              <div className="space-y-4">

                <ESGRow
                  label="Reports Generated"
                  value={esg?.governance?.reports_generated ?? 0}
                />

                <ESGRow
                  label="Monitoring"
                  value={esg?.governance?.monitoring ?? "Active"}
                />

              </div>

            </div>


          </div>


        </div>

      </div>

    </div>

  );

}


/* =====================================
   Metric Card
===================================== */

function MetricCard({ icon, title, value }) {

  return (

    <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-emerald-600">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500 text-sm">

            {title}

          </p>

          <p className="text-2xl font-bold text-emerald-800 mt-2">

            {value}

          </p>

        </div>

        <div className="text-3xl">

          {icon}

        </div>

      </div>

    </div>

  );

}


/* =====================================
   Chart Card
===================================== */

function ChartCard({ title, children }) {

  return (

    <div className="bg-white rounded-xl shadow-md p-6">

      <h3 className="text-xl font-bold text-emerald-800 mb-5">

        {title}

      </h3>

      {children}

    </div>

  );

}


/* =====================================
   ESG Row
===================================== */

function ESGRow({ label, value }) {

  return (

    <div className="flex justify-between items-center border-b pb-3">

      <span className="text-gray-600">

        {label}

      </span>

      <b className="text-gray-900">

        {value}

      </b>

    </div>

  );

}


export default SustainabilityDashboard;
