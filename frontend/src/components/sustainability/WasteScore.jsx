// import React from "react";


// function WasteScore({data}) {


// return (

// <div className="bg-white rounded-xl shadow-lg p-6 mt-8 border">


// <h2 className="text-2xl font-bold text-blue-700 mb-6">

// ♻️ Waste Scoring Engine

// </h2>



// <div className="grid md:grid-cols-2 gap-4">



// <div className="bg-gray-50 rounded-lg shadow p-5">

// <p className="text-teal-900 font-bold">
// Recyclability Score
// </p>

// <h3 className="text-xl">
// {data.recyclability_score} %
// </h3>

// </div>




// <div className="bg-gray-50 rounded-lg shadow p-5">

// <p className="text-teal-900 font-bold">
// Reuse Score
// </p>

// <h3 className="text-xl">
// {data.reuse_score} %
// </h3>

// </div>




// <div className="bg-gray-50 rounded-lg shadow p-5">

// <p className="text-teal-900 font-bold">
// Sustainability Score
// </p>

// <h3 className="text-xl">
// {data.sustainability_score} %
// </h3>

// </div>




// <div className="bg-gray-50 rounded-lg shadow p-5">

// <p className="text-teal-900 font-bold">
// Material Recovery Score
// </p>

// <h3 className="text-xl">
// {data.material_recovery_score} %
// </h3>

// </div>




// </div>




// <div className="mt-6 bg-green-50 rounded-lg p-5">


// <h3 className="text-xl font-bold text-green-700">

// Circularity Score:
// {data.circularity_score} %

// </h3>



// <p className="mt-2 text-lg">

// Category:
// <b>
// {data.category}
// </b>

// </p>


// </div>


// </div>

// )

// }


// export default WasteScore;

import React from "react";


function WasteScore({data}) {


return (

<div className="bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-200">


<h2 className="text-2xl font-bold text-green-700 mb-6">

♻️ Waste Scoring Engine

</h2>



<div className="grid md:grid-cols-2 gap-4">



<div className="bg-gray-50 rounded-lg shadow p-5 border border-gray-200">

<p className="text-2xl font-bold text-teal-900 mt-2">

Recyclability Score

</p>

<h3 className="text-gray-500 text-sm mt-2">

{data.recyclability_score} %

</h3>
<p className="text-green-600 font-bold mt-2">

{data.recyclability_level}

</p>

</div>





<div className="bg-gray-50 rounded-lg shadow p-5 border border-gray-200">

<p className="text-2xl font-bold text-teal-900 mt-2">

Reuse Score

</p>

<h3 className="text-gray-500 text-sm mt-2">

{data.reuse_score} %

</h3>
<p className="text-green-600 font-bold mt-2">

{data.reuse_level}

</p>

</div>





<div className="bg-gray-50 rounded-lg shadow p-5 border border-gray-200">

<p className="text-2xl font-bold text-teal-900 mt-2">

Sustainability Score

</p>

<h3 className="text-gray-500 text-sm mt-2">

{data.sustainability_score} %

</h3>
<p className="text-green-600 font-bold mt-2">

{data.sustainability_level}

</p>

</div>





<div className="bg-gray-50 rounded-lg shadow p-5 border border-gray-200">

<p className="text-2xl font-bold text-teal-900 mt-2">

Material Recovery Score

</p>

<h3 className="text-gray-500 text-sm mt-2">

{data.material_recovery_score} %

</h3>
<p className="text-green-600 font-bold mt-2">

{data.material_recovery_level}

</p>

</div>



</div>





<div className="bg-green-50 rounded-lg shadow p-5 border border-green-200 mt-5">


<p className="text-2xl font-bold text-green-700">

Circularity Score

</p>


<h3 className="text-xl font-bold text-gray-700 mt-2">

{data.circularity_score} %

</h3>



<p className="text-xl font-bold text-cyan-700 mt-3">

{data.category}

</p>


</div>



</div>

)

}


export default WasteScore;