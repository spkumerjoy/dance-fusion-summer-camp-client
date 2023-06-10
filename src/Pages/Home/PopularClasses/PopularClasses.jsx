import React from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useClasses from "../../../Hooks/useClasses";

const PopularClasses = () => {
    const [classes] = useClasses();
    return (
        <div>
            <SectionTitle
                subHeading={"class"}
                heading={"Popular Classes"}
            ></SectionTitle>
            <div>
                <h2>{classes.length}</h2>
            </div>
        </div>
    );
};

export default PopularClasses;
