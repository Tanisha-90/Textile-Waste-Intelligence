import {useEffect,useState} from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {getDashboardStats} from "../services/dashboardService";

function Dashboard() {
    const [stats,setStats]=useState(null);



useEffect(()=>{


    fetchStats();


},[]);



const fetchStats=async()=>{


    try{

        const data =
        await getDashboardStats();

        setStats(data);


    }
    catch(error){

        console.log(error);

    }


}

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-olive-100 min-h-screen">

                <Navbar />

                <div className="p-8">

                    {/* Hero Section */}

                    <div className="bg-gradient-to-r from-teal-900 to-sky-800 text-white rounded-2xl shadow-lg p-10">

                        <h1 className="text-5xl font-bold mb-4">
                            EcoWeave AI
                        </h1>

                        <p className="text-xl leading-8">
                            Welcome to the Textile Waste Intelligence System.
                            Our platform helps industries digitally manage textile
                            waste from registration to inventory monitoring while
                            promoting sustainable recycling and waste utilization.
                        </p>

                    </div>
                    {/* AI Statistics */}


{/* <div className="grid grid-cols-3 gap-6 mt-8">


<div className="bg-white rounded-xl shadow-lg p-6">


<h2 className="text-xl font-bold text-cyan-900">
Total AI Analysis
</h2>


<p className="text-4xl font-bold mt-3">
{
stats?.total_analysis || 0
}
</p>


</div>



<div className="bg-white rounded-xl shadow-lg p-6">


<h2 className="text-xl font-bold text-green-700">
Recyclable Waste
</h2>


<p className="text-4xl font-bold mt-3">
{
stats?.recyclable || 0
}
</p>


</div>



<div className="bg-white rounded-xl shadow-lg p-6">


<h2 className="text-xl font-bold text-purple-700">
Reusable Waste
</h2>


<p className="text-4xl font-bold mt-3">
{
stats?.reusable || 0
}
</p>


</div>



</div> */}


                   


                    {/* Workflow */}

                    <div className="bg-mist-200 rounded-xl shadow-lg p-8 mt-8">

                        <h2 className="text-3xl font-bold text-indigo-900 mb-8 text-center">

                            System Workflow

                        </h2>

                        <div className="grid grid-cols-5 gap-6 text-center">

                            <div className="bg-purple-300 rounded-xl p-6">

                                <div className="text-5xl mb-3">
                                    📝
                                </div>

                                <h3 className="font-bold">
                                    Waste Registration
                                </h3>

                            </div>

                            <div className="bg-purple-300
 rounded-xl p-6">

                                <div className="text-5xl mb-3">
                                    📦
                                </div>

                                <h3 className="font-bold">
                                    Batch Management
                                </h3>

                            </div>

                            <div className="bg-purple-300
 rounded-xl p-6">

                                <div className="text-5xl mb-3">
                                    🚚
                                </div>

                                <h3 className="font-bold">
                                    Collection
                                </h3>

                            </div>

                            <div className="bg-purple-300 rounded-xl p-6">

                                <div className="text-5xl mb-3">
                                    📍
                                </div>

                                <h3 className="font-bold">
                                    Source Tracking
                                </h3>

                            </div>

                            <div className="bg-purple-300 rounded-xl p-6">

                                <div className="text-5xl mb-3">
                                    📊
                                </div>

                                <h3 className="font-bold">
                                    Inventory Monitoring
                                </h3>

                            </div>

                        </div>

                    </div>


                    {/* Why Choose */}

                    <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

                        <h2 className="text-3xl font-bold text-cyan-900 mb-5">

                            Why EcoWeave AI?

                        </h2>

                        <div className="grid grid-cols-2 gap-6">

                            <div className="bg-gray-100 rounded-lg p-5">

                                ♻️ Promotes sustainable textile waste management.

                            </div>

                            <div className="bg-gray-100 rounded-lg p-5">

                                📁 Maintains organized digital records.

                            </div>

                            <div className="bg-gray-100 rounded-lg p-5">

                                ⚡ Reduces manual work and improves efficiency.

                            </div>

                            <div className="bg-gray-100 rounded-lg p-5">

                                🌍 Supports environmentally responsible manufacturing.

                            </div>

                        </div>

                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">


                <h2 className="text-3xl font-bold text-cyan-900 mb-6">
                    Recent Textile Analysis
                </h2>



                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                {/* {
stats?.recent.map((item)=>(        */}
                {
                stats?.recent.slice(0,4).map((item)=>(

             
                <div
                key={item.id}
                className="border rounded-xl p-6 shadow-md hover:shadow-xl transition bg-gradient-to-br from-white to-cyan-50"
                >


                <div className="flex items-center justify-between mb-5">


                <div>


                <h3 className="text-xl font-bold text-cyan-900">

                {item.material}

                </h3>


                <p className="text-gray-500 text-sm">

                {item.image}

                </p>


                </div>



                <div
                className={`px-4 py-2 rounded-full text-sm font-bold

                ${
                item.status==="Poor"

                ?
                "bg-red-100 text-red-700"

                :

                item.status==="Average"

                ?
                "bg-yellow-100 text-yellow-700"

                :

                "bg-green-100 text-green-700"

                }

                `}
                >

                {item.status}

                </div>


                </div>




                <div className="space-y-3">


                <div className="bg-gray-100 rounded-lg p-3">

                <p className="font-semibold">
                Waste Category
                </p>

                <p className="text-gray-700">
                {item.waste}
                </p>


                </div>



                <div className="bg-cyan-50 rounded-lg p-3">

                <p className="font-semibold">
                Material Type
                </p>

                <p>
                {item.material}
                </p>

                </div>



                </div>


                </div>


                ))

                }


                </div>


                </div>
                    


                    {/* Footer */}

                    <div className="bg-blue-950 text-white rounded-xl shadow-lg p-8 mt-10 text-center">

                        <h2 className="text-3xl font-bold mb-3">

                            Building a Greener Future Together ♻️

                        </h2>

                        <p className="text-lg">

                            Every textile waste record contributes to a cleaner,
                            smarter and more sustainable future for the textile
                            industry.

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;