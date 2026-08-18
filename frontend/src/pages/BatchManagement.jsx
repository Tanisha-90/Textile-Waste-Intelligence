import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  addBatch,
  getBatches,
  deleteBatch
} from "../services/batchService";

function BatchManagement() {

  const navigate = useNavigate();

  const [batchType, setBatchType] = useState("");
  const [batchFabric, setBatchFabric] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");

  const [batches, setBatches] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {

      const response = await getBatches();

      setBatches(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = {

      batch_type: batchType,

      batch_fabric: batchFabric,

      total_quantity: Number(totalQuantity)

    };

    try {

      const response = await addBatch(data);

alert(
  `${response.data.message}\nBatch ID : ${response.data.batch_id}`
);

      setBatchType("");
      setBatchFabric("");
      setTotalQuantity("");

      fetchBatches();

    } catch (error) {

      alert("Unable to Add Batch");

      console.log(error);

    }

  };

  
  const handleDelete = async (id) => {

    try {

        await deleteBatch(id);

        alert("Deleted Successfully");

        fetchBatches();

    }

    catch (error) {

        alert("Unable to delete batch.");

    }

};

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-blue-100  min-h-screen">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl text-sky-900 font-bold mb-8">
            Batch Management
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow grid grid-cols-2 gap-6"
          >

            <div>

              <label className="block mb-2 font-medium">
                Batch Type
              </label>

              <select
                value={batchType}
                onChange={(e) => setBatchType(e.target.value)}
                className="w-full border rounded-lg p-3"
                required
              >

                <option value="">Select</option>

                <option>Cotton Batch</option>

                <option>Polyester Batch</option>

                <option>Denim Batch</option>

                <option>Silk Batch</option>

                <option>Wool Batch</option>

              </select>

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Batch Fabric
              </label>

              <select
                value={batchFabric}
                onChange={(e) => setBatchFabric(e.target.value)}
                className="w-full border rounded-lg p-3"
                required
              >

                <option value="">Select</option>

                <option>Cotton</option>

                <option>Polyester</option>

                <option>Silk</option>

                <option>Denim</option>

                <option>Wool</option>

                <option>Mixed</option>

              </select>

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Total Quantity (kg)
              </label>

              <input
                type="number"
                value={totalQuantity}
                onChange={(e) => setTotalQuantity(e.target.value)}
                className="w-full border rounded-lg p-3"
                required
              />

            </div>

            <div className="col-span-2 flex justify-between mt-4">

              <button
                type="button"
                onClick={() => navigate("/waste-registration")}
                className="bg-gray-600 hover:bg-gray-400 text-white px-8 py-3 rounded-lg"
              >
                ← Previous
              </button>

              <button
                type="submit"
                className="bg-blue-900 hover:bg-blue-700  text-white px-8 py-3 rounded-lg"
              >
                Save Batch
              </button>

              <button
                type="button"
                onClick={() => navigate("/collection-management")}
                className="bg-emerald-800 hover:bg-emerald-600  text-white px-8 py-3 rounded-lg"
              >
                Next →
              </button>

            </div>

          </form>

          <div className="bg-white mt-10 rounded-xl shadow p-6">

            <h2 className="text-2xl text-mist-700 font-bold mb-5">
              Batch Records
            </h2>

            <table className="w-full border">

              <thead className="bg-teal-700 text-white">

                <tr>

                  <th className="p-3">Batch ID</th>

                  <th className="p-3">Type</th>

                  <th className="p-3">Fabric</th>

                  <th className="p-3">Quantity</th>

                  <th className="p-3">Action</th>

                </tr>

              </thead>

              <tbody>

                {batches.map((batch) => (

                  <tr
                    key={batch.id}
                    className="text-center border-b"
                  >

                    <td className="p-3">
                      {batch.batch_id}
                    </td>

                    <td>
                      {batch.batch_type}
                    </td>

                    <td>
                      {batch.batch_fabric}
                    </td>

                    <td>
                      {batch.total_quantity}
                    </td>

                    <td>

                    {role === "Admin" && (
                    <button
                    type="button"
                    onClick={() => handleDelete(batch.id)}
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

export default BatchManagement;