import { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const SignUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError(false);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordError(false);
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        if (data.password !== data.confirmPassword) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
            createUser(data.email, data.password)
                .then((result) => {
                    const loggedUser = result.user;
                    updateUserProfile(data.name, data.photoURL).then(() => {
                        const saveUser = {
                            displayName: data.name,
                            photoURL: data.photoURL,
                            email: data.email,
                            role: "student",
                        };
                        fetch("http://localhost:5000/users", {
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                            },
                            body: JSON.stringify(saveUser),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "User Sign Up Successfully.",
                                        showConfirmButton: false,
                                        timer: 1500,
                                    });
                                    navigate("/");
                                }
                            });
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: "Sign Up Failed",
                        text: error.message,
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    });
                });
        }
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
                    Sign Up for an Account
                </h1>
                <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-800">
                                Name
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                name="name"
                                placeholder="Enter your name"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errors.name && (
                                <span className="text-red-600">
                                    Name is required
                                </span>
                            )}
                        </div>
                        <div>
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
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                            <label className="block text-sm font-semibold text-gray-800">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        pattern:
                                            /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                    })}
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                {showPassword ? (
                                    <FaEyeSlash
                                        className="absolute text-gray-500 right-3 top-4 cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    />
                                ) : (
                                    <FaEye
                                        className="absolute text-gray-500 right-3 top-4 cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    />
                                )}
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-500">
                                    Password is required and must contain at
                                    least 6 characters, one uppercase letter,
                                    one lowercase letter, one number, and one
                                    special character.
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-800">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter confirm password"
                                    {...register("confirmPassword", {
                                        required: true,
                                    })}
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                                {showConfirmPassword ? (
                                    <FaEyeSlash
                                        className="absolute text-gray-500 right-3 top-4 cursor-pointer"
                                        onClick={
                                            toggleConfirmPasswordVisibility
                                        }
                                    />
                                ) : (
                                    <FaEye
                                        className="absolute text-gray-500 right-3 top-4 cursor-pointer"
                                        onClick={
                                            toggleConfirmPasswordVisibility
                                        }
                                    />
                                )}
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-xs text-red-500">
                                    Confirm Password is required.
                                </p>
                            )}
                            {passwordError && (
                                <p className="mt-1 text-xs text-red-500">
                                    Passwords do not match.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-2">
                        <label className="block text-sm font-semibold text-gray-800">
                            Photo URL
                        </label>
                        <input
                            type="text"
                            placeholder="Put your photoURL here"
                            {...register("photoURL", { required: true })}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.photoURL && (
                            <p className="mt-1 text-xs text-red-500">
                                Photo URL is required
                            </p>
                        )}
                    </div>
                    <div className="mt-2">
                        <label className="block text-sm font-semibold text-gray-800">
                            Gender
                        </label>
                        <select
                            {...register("gender")}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={gender}
                            onChange={handleGenderChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                            <label className="block text-sm font-semibold text-gray-800">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                placeholder="(Optional)"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-800">
                                Address
                            </label>
                            <input
                                type="text"
                                placeholder="(Optional)"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <input
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                            type="submit"
                            value="Sign Up"
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
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
