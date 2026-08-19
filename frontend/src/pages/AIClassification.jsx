import { useState } from "react";
import { uploadImage } from "../services/aiClassificationService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// import {generateReport} from "../services/aiClassificationService";
import {
    generateReport,
    generateExcelReport
} from "../services/aiClassificationService";


function AiClassification(){
    const [image,setImage]=useState(null);
    const [preview,setPreview]=useState(null);
    const [result,setResult]=useState(null);
    const [loading,setLoading]=useState(false);

    const handleImageChange=(e)=>{
        const file=e.target.files[0];
        if(file){
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setResult(null);
        }
    };

    const handleAnalyze=async()=>{
        if(!image){
            alert("Please select textile image first");
            return;
        }

        const formData=new FormData();
        formData.append("file",image);

        try{
            setLoading(true);

            const response=await uploadImage(formData);

            setResult(response.data);
        }
        catch(error){
            console.log(error);
            alert("Image upload failed");
        }
        finally{
            setLoading(false);
        }
    };
    const handleDownloadReport=async()=>{

        try{
        
        const response=
        await generateReport(
            result.report
        );
        
        
        const url=
        window.URL.createObjectURL(
            new Blob([response.data])
        );
        
        
        const link=
        document.createElement("a");
        
        
        link.href=url;
        
        
        link.download=
        "textile_waste_report.pdf";
        
        
        link.click();
        
        
        }
        
        catch(error){
        
        console.log(error);
        
        alert("Report generation failed");
        
        }
        
        };
        const downloadExcelReport = async () => {

            try {
        
                if (!result || !result.report) {
                    alert("Report data not available");
                    return;
                }
        
                const response = await generateExcelReport(
                    result.report
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
        
                link.download = "textile_waste_report.xlsx";
        
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
    return(
        <div className="flex min-h-screen bg-gray-100">

        <Sidebar />

        <div className="flex-1">

            <Navbar />
        <div className="p-8">

            <h1 className="text-3xl font-bold text-cyan-800">
                AI Textile Waste Classification
            </h1>

            <p className="mt-2 text-gray-600">
                Upload textile waste image for AI analysis
            </p>

            <div className="mt-8 bg-white shadow-lg rounded-xl p-6">

                <h2 className="text-xl font-semibold mb-4">
                    Upload Textile Image
                </h2>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border p-2 rounded"
                />

                {preview && (
                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">
                            Image Preview
                        </h3>

                        <img
                            src={preview}
                            alt="textile preview"
                            className="w-80 h-80 object-cover rounded-lg border"
                        />
                    </div>
                )}

                <button
                    onClick={handleAnalyze}
                    className="mt-6 bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-3 rounded-lg"
                >
                    {loading?"Analyzing...":"Analyze Image"}
                </button>

            </div>
          
{result?.ai_fabric_prediction && (
  <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mt-6">

    <div className="flex items-center justify-between mb-5">
      <h2 className="text-xl font-bold text-slate-800">
        🧠 AI Fabric Recognition
      </h2>

      <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
        AI Completed
      </span>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      <div className="bg-slate-50 rounded-xl p-4">
        <p className="text-sm text-gray-500">
          Fabric Type
        </p>

        <h3 className="text-2xl font-bold text-blue-600 mt-1">
          {result.ai_fabric_prediction.fabric}
        </h3>
      </div>

      <div className="bg-slate-50 rounded-xl p-4">
        <p className="text-sm text-gray-500">
          AI Confidence
        </p>

        <h3 className="text-2xl font-bold text-green-600 mt-1">
          {result.ai_fabric_prediction.confidence}%
        </h3>
      </div>

      <div className="bg-slate-50 rounded-xl p-4">
        <p className="text-sm text-gray-500">
          Vision Model
        </p>

        <h3 className="font-semibold text-slate-800">
          {result.ai_fabric_prediction.model}
        </h3>
      </div>

      <div className="bg-slate-50 rounded-xl p-4">
        <p className="text-sm text-gray-500">
          Recognition Method
        </p>

        <h3 className="font-semibold text-slate-800">
    Computer Vision Based Classification
</h3>
      </div>

    </div>

  </div>
)}
            {result && (

<div className="mt-8 bg-white rounded-2xl shadow-lg p-8">


    <h2 className="text-3xl font-bold text-cyan-900 mb-8">
        Textile Image Analysis
    </h2>



    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">



        {/* Status */}

        <div className="bg-green-100 rounded-xl p-5 shadow">

            <h3 className="font-bold text-green-800 text-lg">
                Status
            </h3>

            <p className="mt-2 text-gray-700">
                {result.message}
            </p>

        </div>




        {/* Fabric */}

        <div className="bg-blue-100 rounded-xl p-5 shadow">

            <h3 className="font-bold text-blue-800 text-lg">
                Fabric Detection
            </h3>

            <p className="mt-2 text-gray-700">
                {result.fabric_detection}
            </p>

        </div>




        {/* Material */}

        <div className="bg-purple-100 rounded-xl p-5 shadow">

            <h3 className="font-bold text-purple-800 text-lg">
                Material Recognition
            </h3>

            <p className="mt-2 text-gray-700">
                {result.material}
            </p>

        </div>




        {/* Texture */}

        <div className="bg-orange-100 rounded-xl p-5 shadow">

            <h3 className="font-bold text-orange-800 text-lg">
                Fabric Texture
            </h3>

            <p className="mt-2 text-gray-700">
                {result.texture}
            </p>

        </div>




        {/* Pattern */}

        <div className="bg-pink-100 rounded-xl p-5 shadow">

            <h3 className="font-bold text-pink-800 text-lg">
                Fabric Pattern
            </h3>

            <p className="mt-2 text-gray-700">
                {result.pattern}
            </p>

        </div>




        {/* Color */}

        <div className="bg-cyan-100 rounded-xl p-5 shadow">

            <h3 className="font-bold text-cyan-800 text-lg">
                Fabric Color
            </h3>

            <p className="mt-2 text-gray-700">
                {result.color}
            </p>

        </div>




        {/* Damage */}

        <div className="bg-red-100 rounded-xl p-5 shadow">

            <h3 className="font-bold text-red-800 text-lg">
                Damage Detection
            </h3>

            <p className="mt-2 text-gray-700">
                {result.damage}
            </p>

        </div>




        {/* Contamination */}

        <div className="bg-yellow-100 rounded-xl p-5 shadow">

            <h3 className="font-bold text-yellow-800 text-lg">
                Contamination Detection
            </h3>

            <p className="mt-2 text-gray-700">
                {result.contamination}
            </p>

        </div>



    </div>


</div>

)}
{result && (

<div className="mt-8 bg-white rounded-2xl shadow-lg p-8">


    <h2 className="text-3xl font-bold text-cyan-900 mb-8">
        Material Classification
    </h2>


    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">


        <div className="bg-blue-100 rounded-xl p-5 shadow">
            <h3 className="font-bold text-blue-800 text-lg">
                Fabric Type
            </h3>
            <p className="mt-2 text-gray-700">
                {result.fabric_detection}
            </p>
        </div>


        <div className="bg-purple-100 rounded-xl p-5 shadow">
            <h3 className="font-bold text-purple-800 text-lg">
                Fiber Composition
            </h3>
            <p className="mt-2 text-gray-700">
                {result.fiber_composition}
            </p>
        </div>


        <div className="bg-cyan-100 rounded-xl p-5 shadow">
            <h3 className="font-bold text-cyan-800 text-lg">
                Blend Identification
            </h3>
            <p className="mt-2 text-gray-700">
                {result.blend}
            </p>
        </div>


        <div className="bg-green-100 rounded-xl p-5 shadow">
            <h3 className="font-bold text-green-800 text-lg">
                Material Quality
            </h3>
            <p className="mt-2 text-gray-700">
                {result.quality}
            </p>
        </div>


        <div className="bg-orange-100 rounded-xl p-5 shadow">
            <h3 className="font-bold text-orange-800 text-lg">
                Fabric Category
            </h3>
            <p className="mt-2 text-gray-700">
                {result.category}
            </p>
        </div>


    </div>

</div>

)}
{result && (

<div className="mt-8 bg-white rounded-2xl shadow-lg p-8">


<h2 className="text-3xl font-bold text-cyan-900 mb-8">
    Textile Waste Classification
</h2>


<div className="grid grid-cols-2 md:grid-cols-3 gap-6">


<div className="bg-red-100 rounded-xl p-5 shadow">
<h3 className="font-bold text-red-800 text-lg">
Waste Category
</h3>

<p className="mt-2 text-gray-700">
{result.waste_category}
</p>
</div>



<div className="bg-green-100 rounded-xl p-5 shadow">
<h3 className="font-bold text-green-800 text-lg">
Recyclability
</h3>

<p className="mt-2 text-gray-700">
{result.recyclability}
</p>
</div>



<div className="bg-blue-100 rounded-xl p-5 shadow">
<h3 className="font-bold text-blue-800 text-lg">
Reuse Potential
</h3>

<p className="mt-2 text-gray-700">
{result.reuse_potential}
</p>
</div>



<div className="bg-yellow-100 rounded-xl p-5 shadow">
<h3 className="font-bold text-yellow-800 text-lg">
Disposal Recommendation
</h3>

<p className="mt-2 text-gray-700">
{result.disposal_recommendation}
</p>
</div>



<div className="bg-purple-100 rounded-xl p-5 shadow">
<h3 className="font-bold text-purple-800 text-lg">
Sustainability Status
</h3>

<p className="mt-2 text-gray-700">
{result.sustainability_status}
</p>
</div>


</div>

</div>

)}
{result && (

<div className="mt-8 bg-white rounded-2xl shadow-lg p-8">


<h2 className="text-3xl font-bold text-cyan-900 mb-8">
    Recycling Recommendation
</h2>


<div className="grid grid-cols-2 md:grid-cols-3 gap-6">



<div className="bg-green-100 rounded-xl p-5 shadow">

<h3 className="font-bold text-green-800 text-lg">
Primary Action
</h3>

<p className="mt-2 text-gray-700">
{result.primary_action}
</p>

</div>



<div className="bg-blue-100 rounded-xl p-5 shadow">

<h3 className="font-bold text-blue-800 text-lg">
Material Recovery
</h3>

<p className="mt-2 text-gray-700">
{result.recovery_method}
</p>

</div>




<div className="bg-orange-100 rounded-xl p-5 shadow">

<h3 className="font-bold text-orange-800 text-lg">
Waste Reduction Strategy
</h3>

<p className="mt-2 text-gray-700">
{result.reduction_strategy}
</p>

</div>


<div className="bg-purple-100 rounded-xl p-5 shadow col-span-2">


<h3 className="font-bold text-purple-800 text-lg">
Recycling Methods
</h3>


<ul className="list-disc ml-5 mt-2 text-gray-700">

{
result.recycling_methods?.map(
(method,index)=>(
<li key={index}>
{method}
</li>
))
}

</ul>

</div>



<div className="bg-pink-100 rounded-xl p-5 shadow col-span-2">

<h3 className="font-bold text-pink-800 text-lg">
Reuse Options
</h3>


<ul className="list-disc ml-5 mt-2 text-gray-700">

{
result.reuse_options?.map(
(option,index)=>(
<li key={index}>
{option}
</li>
))
}

</ul>


</div>


</div>


</div>

)}
{result && result.report && (

<div className="mt-8 bg-white rounded-2xl shadow-lg p-8">


<h2 className="text-3xl font-bold text-cyan-900 mb-8">
Textile Waste Intelligence Report
</h2>


<div className="grid grid-cols-2 md:grid-cols-3 gap-6">


<div className="bg-blue-100 rounded-xl p-5 shadow">
<h3 className="font-bold text-blue-800 text-lg">
Fabric Type
</h3>

<p className="mt-2 text-gray-700">
{/* {result.report.fabric_information.fabric_type} */}
{result.report["Material Classification"]["Fabric Type"]}
</p>
</div>



<div className="bg-purple-100 rounded-xl p-5 shadow">
<h3 className="font-bold text-purple-800 text-lg">
Material
</h3>

<p className="mt-2 text-gray-700">
{/* {result.report.fabric_information.material} */}
{result.report["Textile Image Analysis"]["Material Recognition"]}
</p>
</div>



<div className="bg-cyan-100 rounded-xl p-5 shadow">
<h3 className="font-bold text-cyan-800 text-lg">
Color
</h3>

<p className="mt-2 text-gray-700">
{/* {result.report.fabric_information.color} */}
{result.report["Textile Image Analysis"]["Fabric Color"]}
</p>
</div>



<div className="bg-green-100 rounded-xl p-5 shadow">
<h3 className="font-bold text-green-800 text-lg">
Quality Analysis
</h3>

<p className="mt-2 text-gray-700">
{/* {result.report.quality_analysis.quality} */}
{result.report["Material Classification"]["Material Quality"]}
</p>
</div>



<div className="bg-red-100 rounded-xl p-5 shadow">
<h3 className="font-bold text-red-800 text-lg">
Damage Status
</h3>

<p className="mt-2 text-gray-700">
{/* {result.report.quality_analysis.damage_status} */}
{result.report["Textile Image Analysis"]["Damage Detection"]}
</p>
</div>



<div className="bg-yellow-100 rounded-xl p-5 shadow">
<h3 className="font-bold text-yellow-800 text-lg">
Contamination
</h3>

<p className="mt-2 text-gray-700">
{/* {result.report.quality_analysis.contamination_status} */}
{result.report["Textile Image Analysis"]["Contamination Detection"]}
</p>
</div>



<div className="bg-orange-100 rounded-xl p-5 shadow">
<h3 className="font-bold text-orange-800 text-lg">
Waste Category
</h3>

<p className="mt-2 text-gray-700">
{/* {result.report.waste_analysis.waste_category} */}
{result.report["Textile Waste Classification"]["Waste Category"]}
</p>
</div>



<div className="bg-green-100 rounded-xl p-5 shadow">
<h3 className="font-bold text-green-800 text-lg">
Recommended Action
</h3>

<p className="mt-2 text-gray-700">
{/* {result.report.sustainability.recommended_action} */}
{result.report["Recycling Recommendation"]["Primary Action"]}
</p>
</div>



<div className="bg-purple-100 rounded-xl p-5 shadow">
<h3 className="font-bold text-purple-800 text-lg">
Recovery Method
</h3>

<p className="mt-2 text-gray-700">
{/* {result.report.sustainability.recovery_method} */}
{result.report["Recycling Recommendation"]["Material Recovery"]}
</p>
</div>


</div>

</div>

)}



           
<button

onClick={handleDownloadReport}

className="mt-5 bg-cyan-700 text-white px-5 py-3 rounded-lg"

>

Download PDF Report

</button>
<button
    onClick={downloadExcelReport}
    className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
>
    Download Excel Report
</button>

            
          </div>
          </div>

</div>
        
        
    );
}

export default AiClassification;