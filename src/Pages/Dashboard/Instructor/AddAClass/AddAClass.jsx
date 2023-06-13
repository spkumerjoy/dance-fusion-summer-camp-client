import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddAClass = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        fetch(img_hosting_url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imgResponse) => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const {
                        name,
                        instructor_name,
                        instructor_email,
                        available_seats,
                        price,
                        category,
                        recipe,
                    } = data;
                    const newItem = {
                        image: imgURL,
                        name: name,
                        instructor_name: instructor_name,
                        instructor_email: instructor_email,
                        available_seats: parseInt(available_seats),
                        price: parseFloat(price),
                        enrolled_students: 0,
                        status: "pending",
                    };
                    console.log(newItem);
                    axiosSecure.post("/classes", newItem).then((data) => {
                        console.log("after posting new menu item", data.data);
                        if (data.data.insertedId) {
                            reset();
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Class added successfully",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                    });
                }
            });
    };
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full px-10 py-8 m-auto bg-white rounded-md shadow-xl lg:max-w-2xl">
                <h1 className="text-3xl my-5 font-medium text-center text-[#0F295A] uppercase">
                    Add Your Class
                </h1>
                <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-semibold text-gray-800">
                            Class Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter class name"
                            {...register("name", { required: true })}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-2">
                        <label className="block text-sm font-semibold text-gray-800">
                            Class Image (Upload)
                        </label>
                        <input
                            type="file"
                            {...register("image", { required: true })}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                            <label className="block text-sm font-semibold text-gray-800">
                                Instructor Name
                            </label>
                            <input
                                type="text"
                                defaultValue={user?.displayName}
                                readOnly
                                placeholder="Enter instructor name"
                                {...register("instructor_name", {
                                    required: true,
                                })}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-800">
                                Instructor Email
                            </label>
                            <input
                                type="email"
                                defaultValue={user?.email}
                                readOnly
                                placeholder="Enter instructor email"
                                {...register("instructor_email", {
                                    required: true,
                                })}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                            <label className="block text-sm font-semibold text-gray-800">
                                Available Seats
                            </label>
                            <input
                                type="number"
                                placeholder="Enter available seats"
                                {...register("available_seats", {
                                    required: true,
                                })}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-800">
                                Price
                            </label>
                            <input
                                type="number"
                                placeholder="Enter price"
                                {...register("price", { required: true })}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <input
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                            type="submit"
                            value="Add Class"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAClass;
