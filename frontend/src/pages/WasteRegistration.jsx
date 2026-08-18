import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
    addWasteRegistration,
    getWasteRegistrations,
    deleteWasteRegistration,
} from "../services/wasteRegistrationService";

function WasteRegistration() {

    const [wasteList, setWasteList] = useState([]);

    const [formData, setFormData] = useState({
        fabric_type: "",
        waste_category: "",
        color: "",
        condition: "",
        quantity: "",
        weight_kg: "",
        status: "Pending"
    });

    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWaste();
    }, []);
    const [preview, setPreview] = useState("");
    const role = localStorage.getItem("role");

    const fetchWaste = async () => {
        try {
            const response = await getWasteRegistrations();
            setWasteList(response.data);
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleImage = (event) => {
        const file = event.target.files[0];
      
        if (file) {
          setImage(file);
          setPreview(URL.createObjectURL(file));
        }
      };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData();

        data.append("fabric_type", formData.fabric_type);
        data.append("waste_category", formData.waste_category);
        data.append("color", formData.color);
        data.append("condition", formData.condition);
        data.append("quantity", formData.quantity);
        data.append("weight_kg", formData.weight_kg);
        data.append("status", formData.status);
        data.append("image", image);

        try {
            const response = await addWasteRegistration(data);

            alert(response.data.message);

            setFormData({
                fabric_type: "",
                waste_category: "",
                color: "",
                condition: "",
                quantity: "",
                weight_kg: "",
                status: "Pending"
            });

            setImage(null);
            setPreview("");

            fetchWaste();
        }
        catch (error) {
            console.log(error);
            alert("Unable to Register Waste");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this record?")) {
            return;
        }

        await deleteWasteRegistration(id);

        fetchWaste();
    };
    
    

    
   
    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 bg-blue-100 min-h-screen">
                <Navbar />

                <div className="p-8">
                    <h1 className="text-3xl text-sky-900 font-bold mb-6">
                        Waste Registration
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-xl shadow-lg p-8 grid grid-cols-2 gap-5"
                    >
                        <div>
                            <label>Fabric Type</label>
                            <input
                                type="text"
                                name="fabric_type"
                                value={formData.fabric_type}
                                onChange={handleChange}
                                className="w-full border rounded p-3"
                                required
                            />
                        </div>

                        <div>
                            <label>Waste Category</label>
                            <input
                                type="text"
                                name="waste_category"
                                value={formData.waste_category}
                                onChange={handleChange}
                                className="w-full border rounded p-3"
                                required
                            />
                        </div>

                        <div>
                            <label>Color</label>
                            <input
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="w-full border rounded p-3"
                                required
                            />
                        </div>

                        <div>
                            <label>Condition</label>
                            <input
                                type="text"
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                className="w-full border rounded p-3"
                                required
                            />
                        </div>

                        <div>
                            <label>Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full border rounded p-3"
                                required
                            />
                        </div>

                        <div>
                            <label>Weight (Kg)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="weight_kg"
                                value={formData.weight_kg}
                                onChange={handleChange}
                                className="w-full border rounded p-3"
                                required
                            />
                        </div>

                        <div className="col-span-2">
  <label className="block font-medium mb-2">
    Upload Textile Image
  </label>

  <div className="border-2 border-dashed border-cyan-500 rounded-xl p-6 text-center bg-green-50">

    {preview ? (
      <img
        src={preview}
        alt="Preview"
        className="w-52 h-52 object-cover mx-auto rounded-lg shadow"
      />
    ) : (
      <>
        <p className="text-gray-700 text-lg">
          📷 No Image Selected
        </p>

        <p className="text-gray-600 mt-2">
          Choose a textile waste image
        </p>
      </>
    )}

    <label className="mt-5 inline-block bg-gray-600 hover:bg-gray-400 text-white px-6 py-3 rounded-lg cursor-pointer ">
      Choose Image

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="hidden"
        required
      />
    </label>

  </div>
</div>

                        <div>
                            
                        </div>

                        <div className="col-span-2 flex justify-between mt-4">

  <button
    type="submit"
    className="bg-blue-900 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
  >
    Register Waste
  </button>

  <button
    type="button"
    onClick={() => navigate("/batch-management")}
    className="bg-emerald-800 hover:bg-emerald-600
 text-white px-8 py-3 rounded-lg"
  >
    Next →
  </button>

</div>
                    </form>

                    {/* Waste Records Table */}
                    <div className="bg-white shadow-lg rounded-xl mt-10 p-6">

    <h2 className="text-2xl text-mist-700 font-bold mb-5">
        Registered Waste Records
    </h2>

    <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-400">
            <thead className="bg-teal-700 text-white">
                <tr>
                    <th className="p-3 border">Registration ID</th>
                    <th className="p-3 border">Fabric</th>
                    <th className="p-3 border">Category</th>
                    <th className="p-3 border">Color</th>
                    <th className="p-3 border">Condition</th>
                    <th className="p-3 border">Quantity</th>
                    <th className="p-3 border">Weight</th>
                    <th className="p-3 border">Image</th>
                    {/* <th className="p-3 border">Status</th> */}
                    <th className="p-3 border">Action</th>
                </tr>
            </thead>

            <tbody>
                {
                    wasteList.length === 0 ?
                    (
                        <tr>
                            <td
                                colSpan="11"
                                className="text-center py-6"
                            >
                                No Waste Registered Yet
                            </td>
                        </tr>
                    )
                    :
                    (
                        wasteList.map((item) => (
                            <tr
                                key={item.id}
                                className="text-center"
                            >
                                <td className="border p-3">
                                    {item.waste_registration_id}
                                </td>
                                
                                <td className="border p-3">
                                    {item.fabric_type}
                                </td>
                                <td className="border p-3">
                                    {item.waste_category}
                                </td>
                                <td className="border p-3">
                                    {item.color}
                                </td>
                                <td className="border p-3">
                                    {item.condition}
                                </td>
                                <td className="border p-3">
                                    {item.quantity}
                                </td>
                                <td className="border p-3">
                                    {item.weight_kg} Kg
                                </td>
                                <td className="border p-3">
                                    {
                                        item.image ?
                                        (
                                            <img
                                                // src={`http://localhost:8000/uploads/waste_images/${item.image}`}
                                                // alt="Waste"
                                                src={`${import.meta.env.VITE_API_URL}/uploads/waste_images/${item.image}`}
                                                alt="Waste"    
                                                className="w-20 h-20 object-cover rounded mx-auto"
                                            />
                                        )
                                        :
                                        "No Image"
                                    }
                                </td>
                                {/* <td className="border p-3">
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                        {item.status}
                                    </span>
                                </td> */}
                                <td className="border p-3">

    {role === "Admin" ? (

        <div className="flex gap-2 justify-center">

            {item.status === "Pending" && (

                <>
                   
                </>

            )}

            <button
                onClick={() => handleDelete(item.id)}
                className="bg-amber-800 text-white px-3 py-2 rounded"
            >
                Delete
            </button>

        </div>

    ) : (

        <span className="text-gray-600">
            -
        </span>

    )}

</td>
                            </tr>
                        ))
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

export default WasteRegistration;