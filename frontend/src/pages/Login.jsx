// Login.jsx

// React Hook
import { useState } from "react";

// React Router
import { Link, useNavigate } from "react-router-dom";

// Backend API
import { loginUser } from "../services/authServices";

// Components
import LeftSide from "../components/LeftSide";
import AuthCard from "../components/AuthCard";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Footer from "../components/Footer";

// Background Image
import loginImage from "../assets/login-bg.jpg";

function Login() {
    const navigate = useNavigate();

    // Store email entered by user
    const [email, setEmail] = useState("");

    // Store password entered by user
    const [password, setPassword] = useState("");

    // Login Button
    const handleLogin = async () => {
        // Data to send to FastAPI
        const loginData = {
            email: email,
            password: password
        };

        try {
            const response = await loginUser(loginData);

            // Save data in browser
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("email", response.data.email);
            alert(response.data.message);

            // Open Dashboard
            navigate("/dashboard");
        }

        catch (error) {
            if (error.response) {
                alert(error.response.data.detail);
            }

            else {
                alert("Unable to connect to the server.");
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Main Container */}

            <div className="flex flex-1">
                {/* Left Section */}

                <LeftSide
                    image={loginImage}
                    title="Transform Textile Waste Into Smart Insights"
                    subtitle="Monitor, classify and recycle textile waste using Artificial Intelligence."
                />

                {/* Right Section */}

                <div className="w-full lg:w-1/2 flex justify-center items-center p-10">
                    <AuthCard>
                        <Logo />

                        <h2 className="text-3xl text-mist-800 font-bold text-center mt-6">
                            Welcome Back 
                        </h2>

                        <p className="text-center text-gray-600 mb-8">
                            Login to continue
                        </p>

                        {/* Email */}
                        <InputField
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        {/* Password */}
                        <InputField
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        <div className="flex justify-between text-sm my-5">
                           
                        </div>

                        {/* Login Button */}
                        <Button
                            text="Sign In"
                            onClick={handleLogin}
                        />

                        <p className="text-center mt-8">
                            Don't have an account?
                            <Link
                                to="/register"
                                className="text-cyan-700 ml-2 font-semibold hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </AuthCard>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Login;