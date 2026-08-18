

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// import Reports from "./pages/Reports";
import Profile from "./pages/Profile";

import WasteRegistration from "./pages/WasteRegistration";
import BatchManagement from "./pages/BatchManagement";
import CollectionManagement from "./pages/CollectionManagement";
import WasteSourceTracking from "./pages/WasteSourceTracking";
import InventoryMonitoring from "./pages/InventoryMonitoring";
import AIClassification from "./pages/AIClassification";

import ProtectedRoute from "./components/ProtectedRoute";
import RecyclingEngine from "./pages/RecyclingEngine";
import Sustainability from "./pages/Sustainability";
import SustainabilityDashboard from "./pages/SustainabilityDashboard";
import RecyclingFacilityDashboard from "./pages/RecyclingFacilityDashboard";
import ManufacturerDashboard from "./pages/ManufacturerDashboard";  
import AdminDashboard from "./pages/AdminDashboard";          

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/waste-registration"
          element={
            <ProtectedRoute>
              <WasteRegistration />
            </ProtectedRoute>
          }
        />

        <Route
          path="/batch-management"
          element={
            <ProtectedRoute>
              <BatchManagement />
            </ProtectedRoute>
          }
        />
       
        <Route
          path="/collection-management"
          element={
            <ProtectedRoute>
              <CollectionManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/waste-source-tracking"
          element={
            <ProtectedRoute>
              <WasteSourceTracking />
            </ProtectedRoute>
          }
        />
         
         <Route
  path="/inventory-monitoring"
  element={
    <ProtectedRoute>
      <InventoryMonitoring />
    </ProtectedRoute>
  }
/>

        

        {/* <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
path="/ai-classification"
element={
  <ProtectedRoute>
<AIClassification/>
</ProtectedRoute>}
/>
<Route 
        path="/recycling-engine"
        element={<ProtectedRoute>
        <RecyclingEngine />
        </ProtectedRoute>}
        />
        <Route

        path="/sustainability"

        element={
          <ProtectedRoute>
        <Sustainability/>
        </ProtectedRoute>}

        />
        <Route
path="/sustainability-dashboard"
element={
<ProtectedRoute allowedRoles={["Sustainability Manager"]}>
<SustainabilityDashboard />
</ProtectedRoute>}
/>
<Route
    path="/recycling-facility-dashboard"
    element={
      <ProtectedRoute allowedRoles={["Recycler"]}>
            <RecyclingFacilityDashboard />
        </ProtectedRoute>
    }
/>
<Route
    path="/manufacturer-dashboard"
    element={
      <ProtectedRoute allowedRoles={["Manufacturer"]}>
            <ManufacturerDashboard />
        </ProtectedRoute>
    }
/>
<Route
    path="/admin-dashboard"
    element={
      <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminDashboard />
        </ProtectedRoute>
    }
/>

      </Routes>
      
      
      
    </BrowserRouter>
  );
}

export default App;