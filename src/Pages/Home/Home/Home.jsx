import React from "react";
import Slider from "../Slider/Slider";
import PopularClasses from "../popularClasses/popularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";

const Home = () => {
    return (
        <div>
            <Slider />
            <PopularClasses />
            <PopularInstructors />
        </div>
    );
};

export default Home;
