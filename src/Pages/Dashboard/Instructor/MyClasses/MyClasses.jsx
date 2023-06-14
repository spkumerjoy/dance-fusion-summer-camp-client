import React from "react";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useClasses from "../../../../Hooks/useClasses";
import useAuth from "../../../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MyClasses = () => {
    const [classes] = useClasses();
    const { user } = useAuth();

    const myClasses = classes.filter(
        (allClasses) => allClasses.instructor_email === user?.email
    );

    return (
        <div className="px-5">
            <Helmet>
                <title>Dance Fusion | My Classes</title>
            </Helmet>
            <SectionTitle
                subHeading={"My Created Class"}
                heading={"My All Classes"}
            ></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg text-center text-[#0F2A5A] border-b-2 border-blue-900">
                            <th>#</th>
                            <th className="text-left pl-14">Class Name</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Total Enrolled</th>
                            <th>Status</th>
                            <th>Feedback</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myClasses.map((classes, index) => (
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
                                <td>{classes.available_seats}</td>
                                <td>${classes.price}</td>
                                <td>{classes.enrolled_students}</td>
                                <td>{classes.status}</td>
                                <td>
                                    {classes.status !== "approved" &&
                                        classes.status !== "pending" &&
                                        classes.feedback}
                                </td>
                                <td>
                                    <Link
                                        to={`/dashboard/update-class/${classes._id}`}
                                    >
                                        <button className="btn btn-outline btn-primary btn-sm">
                                            Update
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

export default MyClasses;
