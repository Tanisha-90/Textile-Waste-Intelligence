// Register.jsx

// React Hook
import { useState } from "react";

// React Router
import { Link, useNavigate } from "react-router-dom";

// Backend API
import { registerUser } from "../services/authServices";

// Components
import LeftSide from "../components/LeftSide";
import AuthCard from "../components/AuthCard";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Footer from "../components/Footer";

// Background Image
import registerImage from "../assets/register-bg.jpg";

function Register() {
    const navigate = useNavigate();

    // Form Data
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Admin");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Register Button
    const handleRegister = async () => {

        // Check password
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Data to send to FastAPI
        const userData = {
            full_name: fullName,
            email: email,
            password: password,
            role: role
        };

        try {
            const response = await registerUser(userData);

            alert(response.data.message);

            // Redirect to Login Page
            navigate("/");
        }
        catch (error) {
            if (error.response) {
                alert(error.response.data.detail);
            }
            else {
                alert("Server not responding.");
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">

            {/* Main Section */}
            <div className="flex flex-1">

                {/* Left Side */}
                <LeftSide
                    image={registerImage}
                    title="Join EcoWeave AI"
                    subtitle="Manage textile waste intelligently and contribute to a sustainable future."
                />

                {/* Right Side */}
                <div className="w-full lg:w-1/2 flex justify-center items-center p-10">
                    <AuthCard>
                        <Logo />

                        <h2 className="text-3xl font-bold text-center mt-6">
                            Create Account
                        </h2>

                        <p className="text-center text-gray-500 mb-8">
                            Register to start your sustainability journey
                        </p>

                        {/* Full Name */}
                        <InputField
                            label="Full Name"
                            type="text"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                        />

                        {/* Email */}
                        <InputField
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        {/* Role */}
                        <div className="mb-5">
                            <label className="block mb-2 font-medium text-gray-700">
                                Select Role
                            </label>

                            <select
                                value={role}
                                onChange={(event) => setRole(event.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-green-700"
                            >
                                <option value="Admin">Admin</option>
                                <option value="Manufacturer">Manufacturer</option>
                                <option value="Recycler">Recycler</option>
                                <option value="Sustainability Manager">Sustainability Manager</option>
                            </select>
                        </div>

                        {/* Password */}
                        <InputField
                            label="Password"
                            type="password"
                            placeholder="Create password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        {/* Confirm Password */}
                        <InputField
                            label="Confirm Password"
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />

                        {/* Register Button */}
                        <Button
                            text="Create Account"
                            onClick={handleRegister}
                        />

                        <p className="text-center mt-8">
                            Already have an account?

                            <Link
                                to="/"
                                className="text-cyan-700 font-semibold ml-2 hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </AuthCard>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Register;