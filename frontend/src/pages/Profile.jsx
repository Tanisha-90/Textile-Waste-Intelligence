import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Profile() {

    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    return (

        <div className="flex">

            <Sidebar />

            {/* <div className="flex-1 bg-gray-100 min-h-screen">

                <Navbar />

                <div className="p-8">

                    <h1 className="text-3xl font-bold mb-8">
                        My Profile
                    </h1>

                    <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl">

                        <div className="flex justify-center mb-6">

                            <div className="w-24 h-24 rounded-full bg-green-700 text-white flex items-center justify-center text-4xl font-bold">

                                {name ? name.charAt(0).toUpperCase() : "U"}

                            </div>

                        </div>

                        <div className="space-y-5">

                            <div>
                                <label className="font-semibold text-gray-600">
                                    Name
                                </label>

                                <p className="border rounded-lg p-3 mt-1">
                                    {name}
                                </p>
                            </div>

                            <div>
                                <label className="font-semibold text-gray-600">
                                    Email
                                </label>

                                <p className="border rounded-lg p-3 mt-1">
                                    {email}
                                </p>
                            </div>

                            <div>
                                <label className="font-semibold text-gray-600">
                                    Role
                                </label>

                                <p className="border rounded-lg p-3 mt-1">
                                    {role}
                                </p>
                            </div>

                        </div>

                    </div>

                </div> */}

            {/* </div> */}
            <div className="bg-gray-200 rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">

    <div className="flex items-center gap-8">

        <div className="w-32 h-32 rounded-full bg-teal-950 flex items-center justify-center text-white text-5xl font-bold">

            {name.charAt(0).toUpperCase()}

        </div>

        <div>

            <h2 className="text-3xl font-bold">
                {name}
            </h2>

            <p className="text-gray-800 text-lg">
                {role}
            </p>

            <span className="inline-block mt-3 bg-emerald-100 text-gemerald-700 px-4 py-2 rounded-full">
                Active User
            </span>

        </div>

    </div>

    <hr className="my-8"/>

    <div className="grid grid-cols-2 gap-6">

        <div className="bg-gray-50 p-5 rounded-xl shadow">

            <h3 className="text-gray-600 text-sm">
                Full Name
            </h3>

            <p className="text-xl font-semibold">
                {name}
            </p>

        </div>

        <div className="bg-gray-50 p-5 rounded-xl shadow">

            <h3 className="text-gray-600  text-sm">
                Email Address
            </h3>

            <p className="text-xl font-semibold">
                {email}
            </p>

        </div>

        <div className="bg-gray-50 p-5 rounded-xl shadow">

            <h3 className="text-gray-600  text-sm">
                User Role
            </h3>

            <p className="text-xl font-semibold">
                {role}
            </p>

        </div>

        <div className="bg-gray-50 p-5 rounded-xl shadow">

            <h3 className="text-gray-600 text-sm">
                Platform
            </h3>

            <p className="text-xl font-semibold">
                EcoWeave AI
            </p>

        </div>

    </div>

 

</div>

        </div>

    );

}

export default Profile;