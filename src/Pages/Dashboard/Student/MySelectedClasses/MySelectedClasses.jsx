import React from "react";
import useClasses from "../../../../Hooks/useClasses";
import useMySelectedClasses from "../../../../Hooks/useMySelectedClasses";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const MySelectedClasses = () => {
    const [selectedClasses] = useMySelectedClasses();
    const { user } = useAuth();
    const [mySelectedClasses, setMySelectedClasses] = useState([]);

    useEffect(() => {
        const findMyClasses = selectedClasses.filter(
            (myClasses) => myClasses?.student_email === user?.email
        );
        setMySelectedClasses(findMyClasses);
    }, [selectedClasses, user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to delete this class?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(
                    `https://dance-fusion-summer-camp-server.vercel.app/selected-classes/${id}`,
                    {
                        method: "DELETE",
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data.deletedCount);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                "Deleted!",
                                "Class has been deleted successfully.",
                                "success"
                            );
                            const remaining = mySelectedClasses.filter(
                                (selectClass) => selectClass._id !== id
                            );
                            console.log(remaining);
                            setMySelectedClasses(remaining);
                        }
                    })
                    .catch((error) => {
                        Swal.fire(
                            "Error",
                            "An error occurred while deleting the toy.",
                            "error"
                        );
                        console.log(error);
                    });
            }
        });
    };

    return (
        <div className="px-5">
            <Helmet>
                <title>Dance Fusion | My Selected Class</title>
            </Helmet>
            <SectionTitle
                subHeading={"Pay and buy your class"}
                heading={"My Selected Classes"}
            ></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg text-center text-[#0F2A5A] border-b-2 border-blue-900">
                            <th>#</th>
                            <th className="text-left pl-14">Class Name</th>
                            <th>Instructor</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mySelectedClasses.map((classes, index) => (
                            <tr
                                key={classes._id}
                                className="font-bold text-center"
                            >
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img
                                                    src={classes.image}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                {classes.name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{classes.instructor_name}</td>
                                <td>{classes.available_seats}</td>
                                <td>${classes.price}</td>
                                <td>
                                    <button className="btn btn-outline btn-primary btn-sm">
                                        Pay
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleDelete(classes._id)
                                        }
                                        className="btn btn-outline btn-error btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySelectedClasses;
