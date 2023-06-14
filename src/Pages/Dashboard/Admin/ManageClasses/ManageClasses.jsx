import React from "react";
import useClasses from "../../../../Hooks/useClasses";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageClasses = () => {
    const [classes, refetch] = useClasses();

    const handleApproved = (classes) => {
        fetch(`http://localhost:5000/classes/approved/${classes._id}`, {
            method: "PATCH",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `The class is Approved Now!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    };

    const handleDeny = (classes) => {
        fetch(`http://localhost:5000/classes/deny/${classes._id}`, {
            method: "PATCH",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `The class is Deny Now!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    };

    return (
        <div className="px-5">
            <SectionTitle
                subHeading={"Instructor Posted Classes"}
                heading={"Manage Classes"}
            ></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg text-center text-[#0F2A5A] border-b-2 border-blue-900">
                            <th>#</th>
                            <th className="text-left pl-14">Class Name</th>
                            <th>Instructor name</th>
                            <th>Instructor email</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Approved</th>
                            <th>Deny</th>
                            <th>Send Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((classes, index) => (
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
                                            <div>{classes.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{classes.instructor_name}</td>
                                <td>{classes.instructor_email}</td>
                                <td>{classes.available_seats}</td>
                                <td>${classes.price}</td>
                                <td>{classes.status}</td>
                                <td>
                                    {classes.status === "approved" ? (
                                        <button
                                            className="btn btn-outline btn-primary btn-sm"
                                            disabled
                                        >
                                            approved
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-outline btn-primary btn-sm"
                                            onClick={() =>
                                                handleApproved(classes)
                                            }
                                        >
                                            Approved
                                        </button>
                                    )}
                                </td>
                                <td>
                                    {classes.status === "deny" ? (
                                        <button
                                            className="btn btn-outline btn-secondary btn-sm"
                                            disabled
                                        >
                                            Deny
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-outline btn-secondary btn-sm"
                                            onClick={() => handleDeny(classes)}
                                        >
                                            Deny
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <Link
                                        to={`/dashboard/send-feedback/${classes._id}`}
                                    >
                                        <button className="btn btn-outline btn-secondary btn-sm">
                                            send feedback
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClasses;
