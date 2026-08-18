import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  addCollection,
  getCollections,
  deleteCollection
} from "../services/collectionService";

// import { getBatches } from "../services/batchService";
import { getBatches } from "../services/batchService";

function CollectionManagement() {
  const navigate = useNavigate();

  // STATES
  const [batchId, setBatchId] = useState("");
  const [batches, setBatches] = useState([]);
  const [source, setSource] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const [collections, setCollections] = useState([]);
  const role = localStorage.getItem("role");

  // LOAD DATA ON PAGE LOAD
  useEffect(() => {
    fetchBatches();
    fetchCollections();
  }, []);
  const fetchBatches = async () => {

    try {

        const res = await getBatches();

        console.log("Batches received:", res.data);

        setBatches(res.data);

    }
    catch (err) {
        console.log("Full Error:", err);
        console.log("Response:", err.response);
    }};
  
  // GET COLLECTIONS
  const fetchCollections = async () => {
    try {
      const res = await getCollections();
      setCollections(res.data);
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
      source_of_waste: source,
      collection_location: location,
      collection_date: date
    };

    try {
      await addCollection(data);

      alert("Collection Added Successfully");

      setBatchId("");
      setSource("");
      setLocation("");
      setDate("");

      fetchCollections();
    } catch (err) {
      alert("Unable to Add Collection");
      console.log(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    await deleteCollection(id);
    fetchCollections();
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-blue-100  min-h-screen">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl text-sky-900 font-bold mb-8">
            Collection Management
          </h1>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow grid grid-cols-2 gap-6"
          >
            {/* BATCH ID DROPDOWN */}
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
        <option
            key={b.id}
            value={b.batch_id}
        >
            {b.batch_id} ({b.batch_fabric})
        </option>
    ))}

</select>
             
            </div> 

            {/* SOURCE */}
            <div>
              <label className="block mb-2 font-medium">
                Source of Waste
              </label>

              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            {/* LOCATION */}
            <div>
              <label className="block mb-2 font-medium">
                Collection Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            {/* DATE */}
            <div>
              <label className="block mb-2 font-medium">
                Collection Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            {/* BUTTONS */}
            <div className="col-span-2 flex justify-between">
              <button
                type="button"
                onClick={() => navigate("/batch-management")}
                className="bg-gray-600 hover:bg-gray-400 text-white px-8 py-3 rounded-lg"
              >
                ← Previous
              </button>
              
              {(role === "Admin"  ||  role === "Manufacturer"|| role === "Recycler") && (

              <button
                type="submit"
                className="bg-blue-900 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
              >
                Save Collection
              </button>

              )}

              <button
                type="button"
                onClick={() => navigate("/waste-source-tracking")}
                className="bg-emerald-800 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg"
              >
                Next →
              </button>
            </div>
          </form>

          {/* TABLE */}
          <div className="bg-white mt-10 rounded-xl shadow p-6">
            <h2 className="text-2xl text-mist-700 font-bold mb-5">
              Collection Records
            </h2>

            <table className="w-full border">
              <thead className="bg-teal-700 text-white">
                <tr>
                  <th className="p-3">Batch ID</th>
                  <th className="p-3">Source</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {collections.map((item) => (
                  <tr key={item.id} className="border-b text-center">
                    <td className="p-3">{item.batch_id}</td>
                    <td>{item.source_of_waste}</td>
                    <td>{item.collection_location}</td>
                    <td>{item.collection_date}</td>
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

export default CollectionManagement;