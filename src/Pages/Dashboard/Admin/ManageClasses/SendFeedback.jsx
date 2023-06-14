import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const SendFeedback = () => {
    const classData = useLoaderData();
    const { _id, feedback } = classData;

    const handleSendFeedback = (event) => {
        event.preventDefault();
        const form = event.target;
        const feedback = form.feedback.value;
        const updateInfo = {
            feedback,
        };

        fetch(
            `https://dance-fusion-summer-camp-server.vercel.app/classes/feedback/${_id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateInfo),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire(
                        "Sended!",
                        "Feedback send successfully.",
                        "success"
                    );
                }
            })
            .catch((error) => {
                Swal.fire(
                    "Error",
                    "An error occurred sending feedback.",
                    "error"
                );
                console.log(error);
            });
    };

    return (
        <div className="relative flex flex-col justify-center overflow-hidden">
            <div className="w-full px-10 py-8 m-auto bg-white rounded-md shadow-xl lg:max-w-2xl">
                <h1 className="text-3xl my-5 font-medium text-center text-[#0F295A] uppercase">
                    Send Your Feedback
                </h1>
                <form className="mt-6" onSubmit={handleSendFeedback}>
                    <label className="block text-sm font-semibold text-gray-800">
                        Write your feedback
                    </label>
                    <textarea
                        defaultValue={feedback ? feedback : ""}
                        placeholder="Write your feedback here"
                        required
                        name="feedback"
                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    ></textarea>
                    <div className="mt-6">
                        <input
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 cursor-pointer"
                            type="submit"
                            value="Send Feedback"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SendFeedback;
