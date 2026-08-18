

import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    alert("Logged out successfully.");

    navigate("/");
  };

  return (
    <div className="w-64 bg-cyan-800 text-white min-h-screen flex flex-col">

      <div className="p-6">
        <h1 className="text-4xl font-extrabold mb-10">
          EcoWeave AI
        </h1>

        <nav className="space-y-4">

          <Link to="/dashboard" className="block hover:text-blue-300">
            Home
          </Link>

          {(role === "Admin" || role === "Manufacturer" ||
            role === "Recycler") && (

            <Link
              to="/waste-registration"
              className="block hover:text-blue-300"
            >
              Waste Registration
            </Link>

          )}

          {(role === "Admin" || role === "Manufacturer" ||
            role === "Recycler") && (

            <Link
              to="/batch-management"
              className="block hover:text-blue-300"
            >
              Batch Management
            </Link>

          )}

          {(role === "Admin" || role === "Manufacturer" ||
            role === "Recycler") && (

            <Link
              to="/collection-management"
              className="block hover:text-blue-300"
            >
              Collection Management
            </Link>

          )}

          {(role === "Admin" || role === "Manufacturer" ||
            role === "Recycler") && (

            <Link
              to="/waste-source-tracking"
              className="block hover:text-blue-300"
            >
              Waste Source Tracking
            </Link>

          )}

          {(
            role === "Admin" ||
            role === "Manufacturer" ||
            role === "Recycler" ||
            role === "Sustainability Manager"
          ) && (

            <Link
              to="/inventory-monitoring"
              className="block hover:text-blue-300"
            >
              Inventory Monitoring
            </Link>

          )}
          {(
            role === "Admin" ||
            role === "Manufacturer" ||
            role === "Recycler" ||
            role === "Sustainability Manager"
          ) && (

          <Link
            to="/ai-classification"
            className="block hover:text-blue-300"
          >
            AI Textile Classification
          </Link>

)}
<Link to="/recycling-engine"className="block hover:text-blue-300">

Recycling Engine


</Link>
<Link
to="/sustainability"
className="sidebar-link block hover:text-blue-300"
>
 
Sustainability Intelligence

</Link>
{/* <button  className="sidebar-link block hover:text-blue-300"
onClick={()=>navigate("/sustainability-dashboard")}
>
 Sustainability Dashboard
</button> */}
{role === "Sustainability Manager" && (
<Link
to="/sustainability-dashboard"
className="sidebar-link block hover:text-blue-300"
>
 
 Sustainability Dashboard

</Link>
)}

{/* Recycling Facility Dashboard */}
{role === "Recycler" && (
<Link to="/recycling-facility-dashboard"
className="sidebar-link block hover:text-blue-300">
     Recycling Facility Dashboard
</Link>
)}
{/* Manufacturer Dashboard */}
{role === "Manufacturer" && (
<Link to="/manufacturer-dashboard"
className="sidebar-link block hover:text-blue-300">
     Manufacturer Dashboard
</Link>
)}
{/* Admin Dashboard */}
{role === "Admin" && (
<Link
    to="/admin-dashboard"
    className="sidebar-link block hover:text-blue-300"
>
     Admin Dashboard
</Link>
)}

          <Link to="/profile" className="block hover:text-blue-300">

            Profile
          </Link>

        </nav>
      </div>

      <div className="mt-auto p-6">
        <button
          onClick={handleLogout}
          className="w-full bg-teal-500 hover:bg-teal-600 py-3 rounded-lg font-semibold transition"
        >
          Logout
        </button>
        
      </div>

    </div>
  );
}

export default Sidebar;