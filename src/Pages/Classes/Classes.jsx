import React from "react";
import useClasses from "../../Hooks/useClasses";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const Classes = () => {
    const [classes] = useClasses();

    const getClassCardStyle = (classItem) => {
        if (classItem.available_seats === 0) {
            return "card bg-red-600 shadow-xl cursor-not-allowed";
        } else {
            return "card bg-base-100 shadow-xl cursor-pointer";
        }
    };

    return (
        <div className="px-5 md:px-0">
            <SectionTitle
                subHeading={"Choose your class"}
                heading={"Our All Classes"}
            ></SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {classes.map((classItem) => (
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
                                disabled={classItem.available_seats === 0}
                            >
                                Select Class
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Classes;
