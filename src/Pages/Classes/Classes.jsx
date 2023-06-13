import React, { useContext, useEffect, useState } from "react";
import useClasses from "../../Hooks/useClasses";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useUsers from "../../Hooks/useUsers";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Classes = () => {
    const [classes] = useClasses();
    const { user } = useAuth();
    const [users] = useUsers();
    const [selectedClasses, setSelectedClasses] = useState([]);
    const navigate = useNavigate();

    const approvedClasses = classes.filter(
        (allClasses) => allClasses.status === "approved"
    );

    const student = users.find(
        (loggedUser) => loggedUser.email === user?.email
    );

    useEffect(() => {
        const storedClasses = localStorage.getItem(user?.email);
        if (storedClasses) {
            setSelectedClasses(JSON.parse(storedClasses));
        }
    }, [user]);

    const getClassCardStyle = (classItem) => {
        if (classItem.available_seats === 0) {
            return "card bg-red-600 shadow-xl cursor-not-allowed";
        } else if (student?.role !== "student") {
            return "card bg-base-100 shadow-xl cursor-default";
        } else if (isClassSelected(classItem)) {
            return "card bg-blue-500 shadow-xl cursor-not-allowed";
        } else {
            return "card bg-base-100 shadow-xl cursor-pointer";
        }
    };

    const handleSelectClass = (classItem) => {
        if (student?.role === "student") {
            const selectedClassItem = {
                class_id: classItem._id,
                student_email: student.email,
                image: classItem.image,
                name: classItem.name,
                instructor_name: classItem.instructor_name,
                instructor_email: classItem.instructor_email,
                available_seats: classItem.available_seats,
                price: classItem.price,
                enrolled_students: classItem.enrolled_students,
            };
            fetch("http://localhost:5000/selected-classes", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(selectedClassItem),
            })
                .then((res) => res.json())
                .then(() => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Class Selected Successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    const updatedSelectedClasses = [
                        ...selectedClasses,
                        classItem._id,
                    ];
                    localStorage.setItem(
                        user?.email,
                        JSON.stringify(updatedSelectedClasses)
                    );
                    setSelectedClasses(updatedSelectedClasses);
                });
        } else {
            navigate("/login");
        }
    };

    const isClassSelected = (classItem) => {
        return selectedClasses.includes(classItem._id);
    };

    return (
        <div className="px-5 md:px-0">
            <SectionTitle
                subHeading={"Choose your class"}
                heading={"Our All Classes"}
            ></SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {approvedClasses.map((classItem) => (
                    <div
                        key={classItem._id}
                        className={getClassCardStyle(classItem)}
                    >
                        <figure>
                            <div className="zoom-image">
                                <img src={classItem.image} alt="Class" />
                            </div>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-bold">
                                {classItem.name}
                            </h2>
                            <h3 className="text-xl font-semibold mt-1">
                                Instructor: {classItem.instructor_name}
                            </h3>
                            <div className="card-actions justify-between mt-2">
                                <p className="text-left text-lg font-semibold">
                                    Price: ${classItem.price}
                                </p>
                                <p className="text-right text-lg font-semibold">
                                    Available Seats: {classItem.available_seats}
                                </p>
                            </div>
                            <button
                                className="btn btn-outline btn-primary mt-4"
                                disabled={
                                    classItem.available_seats === 0 ||
                                    (user && student?.role !== "student") ||
                                    isClassSelected(classItem)
                                }
                                onClick={() => handleSelectClass(classItem)}
                            >
                                {isClassSelected(classItem)
                                    ? "Selected"
                                    : "Select Class"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Classes;
