import React from "react";
import useInstructors from "../../Hooks/useInstructors";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import "./Instructors.css";

const Instructors = () => {
    const [users] = useInstructors();
    const instructors = users.filter((user) => user.role === "instructor");
    return (
        <div className="px-5 md:px-0">
            <SectionTitle
                subHeading={"Celebrated Dance Gurus"}
                heading={"Ours Instructors"}
            ></SectionTitle>
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
                            <div className="instructors-card-overlay">
                                <h2 className="card-title">
                                    {instructor.displayName}
                                </h2>
                                <p>{instructor.email}</p>
                            </div>
                            <div></div>
                        </figure>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Instructors;
