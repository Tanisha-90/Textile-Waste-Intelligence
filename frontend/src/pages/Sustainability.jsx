// import {useState} from "react";
import React, { useState, useEffect } from "react";

import API from "../api/api";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


import SustainabilityResult from "../components/sustainability/SustainabilityResult";
import EnvironmentalImpact from "../components/EnvironmentalImpact";
import {
    generateSustainabilityExcel
} from "../services/sustainabilityService";
import WasteScore from "../components/sustainability/WasteScore";
function Sustainability(){
        
const [form,setForm]=useState({

material:"",
weight:"",
condition:"Good",
recovered_weight:"",
reused_weight:""

});
const generateReport = async () => {

    try {

const reportData = {

    sustainability: result,

    environmental: environmentResult,

    waste_score: wasteScore

};


console.log("PDF DATA:", reportData);


// const response = await axios.post(

//     // "http://127.0.0.1:8000/sustainability/generate-pdf",
//    " http://localhost:8000/sustainability/generate-pdf",

//     reportData,

//     {
//         responseType: "blob"
//     }

// );
const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/sustainability/generate-pdf`,
    reportData,
    {
        responseType: "blob"
    }
);


const pdfFile = new Blob(

    [response.data],

    {
        type: "application/pdf"
    }

);


const pdfURL = window.URL.createObjectURL(
    pdfFile
);


const downloadLink =
    document.createElement("a");


downloadLink.href = pdfURL;


downloadLink.download =
    "Sustainability_Report.pdf";


document.body.appendChild(
    downloadLink
);


downloadLink.click();


downloadLink.remove();


window.URL.revokeObjectURL(
    pdfURL
);


}
catch(error){

console.log(
    "PDF ERROR:",
    error
);


alert(
    "Report generation failed"
);

}

};
const handleDownloadExcel = async () => {

    try {

        if (!result || !environmentResult || !wasteScore) {
            alert("Please complete all sustainability analysis first");
            return;
        }

        const reportData = {

            sustainability: result,

            environmental: environmentResult,

            waste_score: wasteScore

        };

        console.log("EXCEL DATA:", reportData);

        const response = await generateSustainabilityExcel(
            reportData
        );

        const blob = new Blob(
            [response.data],
            {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }
        );

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "Sustainability_Report.xlsx";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);

    } catch (error) {

        console.error(
            "EXCEL REPORT ERROR:",
            error
        );

        alert("Failed to generate Excel report");

    }

};

const [result,setResult]=useState(null);
const [history, setHistory] = useState([]);

const [environmentResult,setEnvironmentResult]=useState(null);
const [wasteScore,setWasteScore]=useState(null);

const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};



const analyze=async()=>{


try{


const response = await API.post(

"/sustainability/analyze",

{

    // registration_id:form.registration_id,    

material:form.material,

weight:Number(form.weight),

condition:form.condition,

recovered_weight:Number(form.recovered_weight),

reused_weight:Number(form.reused_weight)

}

);



setResult(response.data);



}

catch(error){

console.log(error);

}


};

const generateWasteScore = async()=>{


    try{
    
    
    const response = await API.post(
    
    "/sustainability/waste-score",
    
    {
    
    material:form.material,
    
    weight:Number(form.weight),
    
    condition:form.condition,
    
    recovered_quantity:Number(form.recovered_weight),
    
    reused_quantity:Number(form.reused_weight)
    
    }
    
    );
    
    
    setWasteScore(response.data);
    
    
    }
    
    catch(error){
    
    console.log(error);
    
    }
    
    
    };
    const saveAnalysis = async()=>{


        try{
            const data={
                material: form.material,
            
                weight: Number(form.weight),
            
                condition: form.condition,
            
                recovered_weight:
                Number(form.recovered_weight || 0),
            
                reused_weight:
                Number(form.reused_weight || 0),
            
            
                // Module 1 Sustainability Intelligence
            
                carbon_footprint:
                result?.carbon_footprint || 0,
            
            
                waste_diversion:
                result?.waste_diversion || 0,
            
            
                resource_recovery:
                result?.resource_recovery || 0,
            
            
                circular_status:
                result?.circular_status || "Unknown",
            
            
                benchmark:
                result?.bench || "Unknown",
            
            
            
                // Module 2 Environmental Impact
            
                co2_savings:
                environmentResult?.co2_savings || 0,
            
            
                water_savings:
                environmentResult?.water_savings || 0,
            
            
                landfill_reduction:
                environmentResult?.landfill_reduction || 0,
            
            
                resource_conservation:
                environmentResult?.resource_conservation || 0,
            
            
                environment_score:
                environmentResult?.sustainability_score || 0,
            
            
            
                // Module 3 Waste Score Engine
            
                recyclability_score:
                wasteScore?.recyclability_score || 0,
            
            
                recyclability_level:
                wasteScore?.recyclability_level ||
                wasteScore?.recyclability_category ||
                "Unknown",
            
            
                reuse_score:
                wasteScore?.reuse_score || 0,
            
            
                reuse_level:
                wasteScore?.reuse_level ||
                wasteScore?.reuse_category ||
                "Unknown",
            
            
                sustainability_score:
                wasteScore?.sustainability_score || 0,
            
            
                sustainability_level:
                wasteScore?.sustainability_level ||
                "Moderate",
            
            
                material_recovery_score:
                wasteScore?.material_recovery_score || 0,
            
            
                circularity_score:
                wasteScore?.circularity_score || 0,
            
            
                circularity_category:
                wasteScore?.circularity_category ||
                "Unknown"
            
            }
              
        
      
        
       
        
        
        
        const response = await API.post(
        
        "/sustainability/save-analysis",
        
        data
        
        );
        
        
        
        alert(
        "Analysis Saved Successfully ID: "
        +
        response.data.id
        );
        fetchHistory();
        
        
        
        }
        
        catch(error){

            console.log(
            "FULL ERROR:",
            error.response?.data
            );
            
            alert(
            JSON.stringify(error.response?.data)
            );
            
            }
        
        
        };  
        const fetchHistory = async () => {

            try{
        
                const response = await API.get(
                    "/sustainability/analysis-history"
                );
        
                setHistory(response.data);
        
            }
            catch(error){
        
                console.log(error);
        
            }
        
        };  
        useEffect(() => {

            fetchHistory();
        
        }, []);
        const deleteAnalysis = async(id)=>{

            try{
            
            await API.delete(
            `/sustainability/delete-analysis/${id}`
            );
            
            fetchHistory();
            
            alert("Analysis Deleted");
            
            }
            
            catch(error){
            
            console.log(error);
            
            }
            
            }



return(

    <div className="flex min-h-screen bg-gray-100">
    
    
    <Sidebar/>
    
    
    <div className="flex-1">
    
    
    <Navbar/>
    
    
    <div className="p-8">
    
    
    <h1 className="text-3xl font-bold text-cyan-900 mb-8">
    
    Sustainability Intelligence Engine
    
    </h1>



<div className="bg-white shadow rounded-xl p-6">


<h2 className="font-semibold mb-4">

Waste Information

</h2>



<select

name="material"

onChange={handleChange}

className="border p-3 rounded w-full mb-4"

>


<option>
Select Material
</option>


<option>
Cotton
</option>


<option>
Polyester
</option>


<option>
Denim
</option>


<option>
Silk
</option>


<option>
Wool
</option>


<option>
Linen
</option>


<option>
Velvet
</option>


<option>
Nylon
</option>


<option>
Fleece
</option>


<option>
Terrycloth
</option>


</select>





<input

name="weight"

placeholder="Waste Weight (Kg)"

onChange={handleChange}

className="border p-3 rounded w-full mb-4"

/>





<select

name="condition"

onChange={handleChange}

className="border p-3 rounded w-full mb-4"

>


<option>
Good
</option>

<option>
Fair
</option>

<option>
Bad
</option>


</select>




<h2 className="font-semibold mb-3">

Optional Recovery Details

</h2>



<input

name="recovered_weight"

placeholder="Recovered Quantity (Kg)"

onChange={handleChange}

className="border p-3 rounded w-full mb-4"

/>




<input

name="reused_weight"

placeholder="Reused Quantity (Kg)"

onChange={handleChange}

className="border p-3 rounded w-full mb-4"

/>




<button

onClick={analyze}

className="bg-teal-700 text-white px-6 py-3 rounded-lg"

>

Analyze Sustainability

</button>



</div>



<SustainabilityResult result={result}/>

{
result && (
    <EnvironmentalImpact

    data={form}

    setEnvironmentResult={setEnvironmentResult}

/>
)
}
<button

onClick={generateWasteScore}

className="bg-teal-700 text-white px-6 py-3 rounded-lg mt-6"

>

Generate Waste Score

</button>
{
wasteScore && (

<WasteScore

data={wasteScore}

/>

)
}
{
result &&
environmentResult &&
wasteScore &&

(

<button

onClick={saveAnalysis}

className="mt-6 bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-500"

>

💾 Save Analysis

</button>

)

}

<button 
    onClick={generateReport}
    className="bg-teal-700 text-white px-4 py-2 rounded-lg mt-3"
>
    Download Sustainability Report
</button>
<button
    onClick={handleDownloadExcel}
    className="ml-3 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold"
>
    Download Excel Report
</button>
<div className="bg-white rounded-xl shadow-lg p-6 mt-10">

<h2 className="text-2xl font-bold text-cyan-700 mb-6">
    📋 Recent Sustainability Analysis
</h2>

<div className="overflow-x-auto">

    <table className="min-w-full border border-gray-300">

    <thead>

<tr className="bg-teal-600 text-white">

<th className="border p-3">Analysis ID</th>

<th className="border p-3">Fabric</th>

<th className="border p-3">Weight</th>

<th className="border p-3">Condition</th>

<th className="border p-3">Carbon</th>

<th className="border p-3">CO₂ Saved</th>

<th className="border p-3">Water Saved</th>



<th className="border p-3">Date</th>

<th className="border p-3">Action</th>

</tr>

</thead>

<tbody>

{history.map((item)=>(

<tr
key={item.id}
className="text-center hover:bg-green-50"
>

<td className="border p-2 font-semibold">
{item.fabric_id}
</td>

<td className="border p-2">
{item.material}
</td>

<td className="border p-2">
{item.weight} kg
</td>

<td className="border p-2">
{item.condition}
</td>

<td className="border p-2">
{item.carbon_footprint} kg
</td>

<td className="border p-2">
{item.co2_savings} kg
</td>

<td className="border p-2">
{item.water_savings} L

</td>
<td className="border p-2">

{new Date(item.created_at).toLocaleDateString()}

</td>

<td className="border p-2">

<button
className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
onClick={()=>deleteAnalysis(item.id)}
>

Delete

</button>

</td>

</tr>

))}

</tbody>

    </table>

</div>

</div>



</div>

</div>

</div>

);

}

export default Sustainability;


