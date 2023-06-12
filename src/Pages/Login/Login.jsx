import { useContext } from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const { logIn, googleSignIn } = useContext(AuthContext);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = (data) => {
        const { email, password } = data;
        logIn(email, password)
            .then((result) => {
                const user = result.user;
                Swal.fire({
                    title: "User Login Successful",
                    showClass: {
                        popup: "animate__animated animate__fadeInDown",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutUp",
                    },
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                Swal.fire({
                    title: "User Login Failed",
                    text: error.message,
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
            });
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full px-10 py-8 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl my-5 font-medium text-center text-[#0F295A] uppercase">
                    <img
                        src="https://joyskyz.com/wp-content/uploads/2023/06/logo.png"
                        alt="Logo"
                        className="w-2/6 mx-auto mb-3"
                    />
                    Log in to Your Account
                </h1>
                <form onSubmit={handleSubmit(handleLogin)} className="mt-6">
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", { required: true })}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.email && (
                            <span className="text-red-600">
                                Email is required
                            </span>
                        )}
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                placeholder="Enter your password"
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern:
                                        /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                })}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <FaEyeSlash className="text-gray-500" />
                                ) : (
                                    <FaEye className="text-gray-500" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-500">
                                Password is required and must contain at least 6
                                characters, one uppercase letter, one lowercase
                                letter, one number, and one special character.
                            </p>
                        )}
                    </div>
                    <div className="mt-6">
                        <input
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                            type="submit"
                            value="Login"
                        />
                    </div>
                </form>
                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 bg-white">Or</div>
                </div>
                <div className="flex mt-8 gap-x-2">
                    <SocialLogin />
                </div>

                <p className="mt-3 text-lg font-light text-center text-gray-700">
                    Don't have an account?{" "}
                    <Link
                        to="/sign-up"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
