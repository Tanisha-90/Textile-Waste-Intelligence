import React, { useState } from "react";
import API from "../api/api";


// function EnvironmentalImpact({ data }) {
    function EnvironmentalImpact({ data,setEnvironmentResult }) {  


    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);



    const analyzeEnvironment = async () => {


        try {

            setLoading(true);


            const response = await API.post(
                "/environmental/analyze",
                {

                    material: data.material,

                    weight: Number(data.weight),

                    recovered_weight:
                    Number(data.recovered_weight || 0),

                    reused_weight:
                    Number(data.reused_weight || 0)

                }
            );


            setResult(response.data);

            setEnvironmentResult(response.data);


        } catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }

    };



    return (

        // <div className="mt-8 p-6 rounded-xl bg-slate-900 border border-green-500">
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-200">


            {/* <h2 className="text-xl font-bold text-green-400 mb-5"> */}
            <h2 className="text-2xl font-bold text-green-700 mb-6">

                🌱 Environmental Impact Assessment

            </h2>



            {!result && (

                <button

                onClick={analyzeEnvironment}

                className="px-5 py-2 rounded-lg bg-teal-700 text-white hover:bg-teal-600"

                >

                {
                    loading 
                    ? "Analyzing..."
                    :
                    "Analyze Environmental Impact"
                }


                </button>

            )}




            {
                result && (

                <div className="grid md:grid-cols-2 gap-4">


                    {/* <div className="p-4 bg-slate-800 rounded-lg"> */}
                    <div className="bg-gray-50 rounded-lg shadow p-5 border border-gray-200">

                        {/* <p className="text-gray-400"> */}
                        <p className="text-2xl font-bold text-teal-900 mt-2">
                        CO₂ Savings
                        </p>

                        {/* <h3 className="text-2xl font-bold text-green-300"> */}
                        <h3 className="text-gray-500 text-sm">

                        {result.co2_savings} kg CO₂

                        </h3>

                    </div>




                    <div className="bg-gray-50 rounded-lg shadow p-5 border border-gray-200">


                    <p className="text-2xl font-bold text-teal-900 mt-2">

                        Water Savings

                        </p>


                        <h3 className="text-gray-500 text-sm">

                        {result.water_savings} Litres

                        </h3>


                    </div>




                    <div className="bg-gray-50 rounded-lg shadow p-5 border border-gray-200">


                    <p className="text-2xl font-bold text-teal-900 mt-2">

                        Landfill Reduction

                        </p>


                        <h3 className="text-gray-500 text-sm">

                        {result.landfill_reduction} %

                        </h3>


                    </div>





                    <div className="bg-gray-50 rounded-lg shadow p-5 border border-gray-200">


                    <p className="text-2xl font-bold text-teal-900 mt-2">

                        Resource Conservation

                        </p>


                        <h3 className="text-gray-500 text-sm">

                        {result.resource_conservation} kg

                        </h3>


                    </div>




                    <div className="bg-gray-50 rounded-lg shadow p-5 border border-gray-200">


                    <p className="text-2xl font-bold text-teal-900 mt-2">

                        Sustainability Score

                        </p>


                        <h3 className="text-gray-500 text-sm">

                        {result.sustainability_score} %

                        </h3>


                        <p className="text-2xl font-bold text-cyan-700 mt-2">

                        {result.recommendation}

                        </p>


                    </div>



                </div>

                )
            }



        </div>

    )

}



export default EnvironmentalImpact;