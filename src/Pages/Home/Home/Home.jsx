import React from "react";
import Slider from "../Slider/Slider";
import PopularClasses from "../popularClasses/popularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import WhyChooseUS from "../WhyChooseUS/WhyChooseUS";

const Home = () => {
    return (
        <div>
            <Slider />
            <PopularClasses />
            <PopularInstructors />
            <WhyChooseUS />
        </div>
    );
};

export default Home;
