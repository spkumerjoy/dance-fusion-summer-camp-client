import React from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import "./PopularInstructors.css";
import useUsers from "../../../Hooks/useUsers";
import { Flip, Hinge } from "react-awesome-reveal";

const PopularInstructors = () => {
    const [users] = useUsers();
    const instructors = users
        .filter((user) => user.role === "instructor")
        .slice(0, 6);
    return (
        <div className="md:mt-20 px-5 md:px-0">
            <SectionTitle
                subHeading={"Celebrated Dance Gurus"}
                heading={"Popular Instructors"}
            ></SectionTitle>
            <Flip>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {instructors.map((instructor) => (
                        <div
                            key={instructor._id}
                            className="card bg-base-100 shadow-xl relative overflow-hidden cursor-pointer"
                        >
                            <figure className="relative">
                                <img
                                    src={instructor.photoURL}
                                    alt="Instructor"
                                    className="card-image"
                                />
                                <div className="card-overlay">
                                    <h2 className="card-title">
                                        {instructor.displayName}
                                    </h2>
                                    <p>{instructor.email}</p>
                                </div>
                            </figure>
                        </div>
                    ))}
                </div>
            </Flip>
        </div>
    );
};

export default PopularInstructors;
