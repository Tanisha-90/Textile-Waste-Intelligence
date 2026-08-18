import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  addWasteSource,
  getWasteSources,
  deleteWasteSource
} from "../services/wasteSourceService";

import { getBatches } from "../services/batchService";

function WasteSourceTracking() {

  const navigate = useNavigate();

  const [batchId, setBatchId] = useState("");
  const [batches, setBatches] = useState([]);

  const [source, setSource] = useState("");
  const [remarks, setRemarks] = useState("");

  const [records, setRecords] = useState([]);
  const role = localStorage.getItem("role");

  // LOAD DATA
  useEffect(() => {
    fetchBatches();
    fetchRecords();
  }, []);

  // GET BATCHES
  const fetchBatches = async () => {
    try {
      const res = await getBatches();
      setBatches(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // GET WASTE SOURCES
  const fetchRecords = async () => {
    try {
      const res = await getWasteSources();
      setRecords(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      role !== "Admin" &&
      role !== "Manufacturer" &&
      role !== "Recycler"
  ) {
      alert("Access Denied");
      return;
  }

    const data = {
      batch_id: batchId,
      source: source,
      remarks: remarks
    };

    try {
      await addWasteSource(data);

      alert("Waste Source Saved Successfully");

      setBatchId("");
      setSource("");
      setRemarks("");

      fetchRecords();
    } catch (err) {
      alert("Error saving waste source");
      console.log(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    await deleteWasteSource(id);
    fetchRecords();
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-blue-100  min-h-screen">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl  text-sky-900 font-bold mb-8">
            Waste Source Tracking
          </h1>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow grid grid-cols-2 gap-6"
          >

            {/* BATCH ID */}
            <div>
              <label className="block mb-2 font-medium">
                Batch ID
              </label>

              <select
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className="w-full border rounded-lg p-3"
                required
              >
                <option value="">Select Batch</option>

                {batches.map((b) => (
                  <option key={b.id} value={b.batch_id}>
                    {b.batch_id} ({b.batch_fabric})
                  </option>
                ))}
              </select>
            </div>

            {/* SOURCE */}
            <div>
              <label className="block mb-2 font-medium">
                Source
              </label>

              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            {/* REMARKS */}
            <div className="col-span-2">
              <label className="block mb-2 font-medium">
                Remarks
              </label>

              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full border rounded-lg p-3"
                rows="3"
                required
              />
            </div>

            {/* BUTTONS */}
            <div className="col-span-2 flex justify-between">
              <button
                type="button"
                onClick={() => navigate("/collection-management")}
                className="bg-gray-600 hover:bg-gray-400 text-white px-8 py-3 rounded-lg"
              >
                ← Previous
              </button>

             
              {(role === "Admin" || role === "Manufacturer"|| role === "Recycler") && (

              <button
                  type="submit"
                  className="bg-blue-900 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
              >
                  Save
              </button>

              )}

              <button
                  type="button"
                  onClick={() => navigate("/inventory-monitoring")}
                  className="bg-emerald-800 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg"
                >
                  Finish →
                </button>
            </div>

          </form>

          {/* TABLE */}
          <div className="bg-white mt-10 rounded-xl shadow p-6">

            <h2 className="text-2xl text-mist-700 font-bold mb-5">
              Waste Source Records
            </h2>

            <table className="w-full border">

              <thead className="bg-teal-700 text-white">
                <tr>
                  <th className="p-3">Batch ID</th>
                  <th className="p-3">Source</th>
                  <th className="p-3">Remarks</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {records.map((item) => (
                  <tr key={item.id} className="border-b text-center">

                    <td className="p-3">{item.batch_id}</td>
                    <td>{item.source}</td>
                    <td>{item.remarks}</td>

                    <td>
                    {role === "Admin" && (
                    <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-amber-800 text-white px-4 py-2 rounded"
                    >
                    Delete
                    </button>
                    )}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>
      </div>
    </div>
  );
}

export default WasteSourceTracking;