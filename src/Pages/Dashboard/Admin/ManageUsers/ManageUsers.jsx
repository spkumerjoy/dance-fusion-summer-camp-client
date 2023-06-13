import React from "react";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../../Hooks/useAuth";
import useUsers from "../../../../Hooks/useUsers";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const { user } = useAuth();
    const [users, refetch] = useUsers();

    const ourUsers = users.filter((allUser) => allUser.email !== user?.email);

    const handleMakeAdmin = (user) => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: "PATCH",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    };

    return (
        <div className="px-5 mb-5">
            <SectionTitle
                subHeading={"Ours All Users"}
                heading={"Manage All User"}
            ></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg text-center text-[#0F2A5A] border-b-2 border-blue-900">
                            <th>#</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>User Role</th>
                            <th>Make Instructor</th>
                            <th>Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ourUsers.map((user, index) => (
                            <tr
                                key={user._id}
                                className="font-bold text-center"
                            >
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img
                                                    src={user.photoURL}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                {user.displayName}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="btn btn-outline btn-primary btn-sm">
                                        Make Instructor
                                    </button>
                                </td>
                                <td>
                                    {user.role === "admin" ? (
                                        "admin"
                                    ) : (
                                        <button
                                            className="btn btn-outline btn-secondary btn-sm"
                                            onClick={() =>
                                                handleMakeAdmin(user)
                                            }
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
