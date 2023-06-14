import React from "react";
import Slider from "../Slider/Slider";
import PopularClasses from "../popularClasses/popularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import WhyChooseUS from "../WhyChooseUS/WhyChooseUS";
import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Dance Fusion | Home</title>
            </Helmet>
            <Slider />
            <PopularClasses />
            <PopularInstructors />
            <WhyChooseUS />
        </div>
    );
};

export default Home;
