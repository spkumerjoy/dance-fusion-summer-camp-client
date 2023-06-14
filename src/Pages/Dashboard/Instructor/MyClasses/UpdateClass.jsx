import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateClass = () => {
    const classData = useLoaderData();
    const { _id, image, name, available_seats, price } = classData;

    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;
        const price = form.price.value;
        const name = form.name.value;
        const image = form.image.value;
        const available_seats = form.available_seats.value;
        const updateInfo = {
            image,
            name,
            price,
            available_seats,
        };

        fetch(`http://localhost:5000/classes/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire(
                        "Updated!",
                        "Class data updated successfully.",
                        "success"
                    );
                }
            })
            .catch((error) => {
                Swal.fire(
                    "Error",
                    "An error occurred while updating toy information.",
                    "error"
                );
                console.log(error);
            });
    };
    return (
        <div className="relative flex flex-col justify-center overflow-hidden">
            <div className="w-full px-10 py-8 m-auto bg-white rounded-md shadow-xl lg:max-w-2xl">
                <h1 className="text-3xl my-5 font-medium text-center text-[#0F295A] uppercase">
                    Update Your Class
                </h1>
                <form className="mt-6" onSubmit={handleUpdate}>
                    <div>
                        <label className="block text-sm font-semibold text-gray-800">
                            Class Name
                        </label>
                        <input
                            type="text"
                            defaultValue={name}
                            placeholder="Enter class name"
                            required
                            name="name"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-2">
                        <label className="block text-sm font-semibold text-gray-800">
                            Class Image (URL)
                        </label>
                        <input
                            type="text"
                            defaultValue={image}
                            name="image"
                            required
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                            <label className="block text-sm font-semibold text-gray-800">
                                Available Seats
                            </label>
                            <input
                                type="number"
                                placeholder="Enter available seats"
                                defaultValue={available_seats}
                                required
                                name="available_seats"
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
                                name="price"
                                defaultValue={price}
                                required
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <input
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 cursor-pointer"
                            type="submit"
                            value="Update Class"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateClass;
