import React from "react";
import useClasses from "../../../../Hooks/useClasses";
import useMySelectedClasses from "../../../../Hooks/useMySelectedClasses";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../../Hooks/useAuth";

const MySelectedClasses = () => {
    const [selectedClasses] = useMySelectedClasses();
    const { user } = useAuth();

    const findMyClasses = selectedClasses.filter(
        (myClasses) => myClasses?.student_email === user?.email
    );

    return (
        <div>
            <SectionTitle
                subHeading={"Pay and buy your class"}
                heading={"My Selected Classes"}
            ></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>
                                <label>1</label>
                            </th>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img
                                                src="/tailwind-css-component-profile-2@56w.png"
                                                alt="Avatar Tailwind CSS Component"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">
                                            Hart Hagerty
                                        </div>
                                        <div className="text-sm opacity-50">
                                            United States
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                Zemlak, Daniel and Leannon
                                <br />
                                <span className="badge badge-ghost badge-sm">
                                    Desktop Support Technician
                                </span>
                            </td>
                            <td>Purple</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">
                                    details
                                </button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySelectedClasses;
