import React,{useState} from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


function RecyclingEngine(){

const [formData,setFormData]=useState({
    material:"",
    condition:"",
    quantity:""
});

const [result,setResult]=useState(null);


const handleChange=(e)=>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    });
};


const handleSubmit=async(e)=>{
    e.preventDefault();

    try{

        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/recycling/recommend`,
            formData
        );

        setResult(response.data);

    }
    catch(error){
        console.log(error);
    }
};


return(
<div className="flex min-h-screen bg-gray-100">

<Sidebar/>

<div className="flex-1">

<Navbar/>

<div className="p-8">


<h1 className="text-3xl font-bold text-cyan-900 mb-8">
Recycling Recommendation Engine
</h1>


<div className="bg-white rounded-2xl shadow-lg p-8">

<h2 className="text-xl font-bold text-cyan-800 mb-6">
Textile Waste Information
</h2>


<form 
onSubmit={handleSubmit}
className="grid grid-cols-1 md:grid-cols-3 gap-6"
>


<div>

<label className="font-semibold">
Material Type
</label>

<select
name="material"
value={formData.material}
onChange={handleChange}
className="w-full mt-2 p-3 border rounded-xl"
>

<option value="">
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
Mixed Fabric
</option>

<option>
Wool
</option>

</select>

</div>


<div>

<label className="font-semibold">
Material Condition
</label>

<select
name="condition"
value={formData.condition}
onChange={handleChange}
className="w-full mt-2 p-3 border rounded-xl"
>

<option value="">
Select Condition
</option>

<option>
Good Condition
</option>

<option>
Slightly Damaged
</option>

<option>
Damaged
</option>

<option>
Torn
</option>

<option>
Contaminated
</option>

</select>

</div>


<div>

<label className="font-semibold">
Waste Quantity
</label>

<select
name="quantity"
value={formData.quantity}
onChange={handleChange}
className="w-full mt-2 p-3 border rounded-xl"
>

<option value="">
Select Quantity
</option>

<option>
Small
</option>

<option>
Medium
</option>

<option>
Large
</option>

</select>

</div>


<button
className="md:col-span-3 bg-cyan-700 text-white py-3 rounded-xl font-bold hover:bg-cyan-800"
>

Generate Recommendation

</button>


</form>

</div>


{result && (

<div className="mt-8 bg-white rounded-2xl shadow-lg p-8">


<h2 className="text-3xl font-bold text-cyan-900 mb-8">
AI Recycling Recommendation
</h2>


<div className="grid grid-cols-1 md:grid-cols-3 gap-6">


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
Recommended Action
</h3>

<p className="mt-2 text-gray-700">
{result.recommended_action}
</p>

</div>


<div className="bg-blue-100 rounded-xl p-5 shadow">

<h3 className="font-bold text-blue-800 text-lg">
Available Options
</h3>

<ul className="list-disc ml-5 mt-2 text-gray-700">

{
result.available_options?.map(
(option,index)=>(
<li key={index}>
{option}
</li>
)
)
}

</ul>

</div>


<div className="bg-purple-100 rounded-xl p-5 shadow md:col-span-3">

<h3 className="font-bold text-purple-800 text-lg">
Suggestions
</h3>

<ul className="list-disc ml-5 mt-2 text-gray-700">

{
result.suggestions?.map(
(item,index)=>(
<li key={index}>
{item}
</li>
)
)
}

</ul>

</div>


</div>

</div>

)}


</div>

</div>

</div>
);

}

export default RecyclingEngine;