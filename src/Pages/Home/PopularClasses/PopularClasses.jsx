import React from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useClasses from "../../../Hooks/useClasses";
import "./PopularClasses.css";
import { Fade, Slide } from "react-awesome-reveal";

const PopularClasses = () => {
    const [classes] = useClasses();
    const filteredClasses = classes
        .filter((classItem) => classItem.enrolled_students >= 0)
        .slice(0, 6);
    return (
        <div className="px-5 md:px-0">
            <SectionTitle
                subHeading={"Choose your class"}
                heading={"Popular Classes"}
            ></SectionTitle>
            <Fade cascade damping={0.1}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {filteredClasses.map((classItem) => (
                        <div
                            key={classItem._id}
                            className="card bg-base-100 shadow-xl cursor-pointer"
                        >
                            <figure>
                                <div className="zoom-image">
                                    <img src={classItem.image} alt="Class" />
                                </div>
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title mx-auto">
                                    {classItem.name}
                                </h2>
                                <div className="card-actions justify-between mt-3">
                                    <p className="text-left text-lg font-semibold">
                                        Price: ${classItem.price}
                                    </p>
                                    <p className="text-right text-lg font-semibold">
                                        Available Seats:{" "}
                                        {classItem.available_seats}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Fade>
        </div>
    );
};

export default PopularClasses;
