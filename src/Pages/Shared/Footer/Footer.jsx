import {
    FaEnvelope,
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaTwitter,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="pt-16 pb-2 bg-base-100 border-t mt-5 md:mt-24 px-5 md:px-0">
            <div className="footer text-base-content flex flex-col md:flex-row md:justify-between">
                <div className="w-full md:w-72 lg:w-96">
                    <Link to="/">
                        <img src="logo.png" alt="Site Logo" className="w-40" />
                    </Link>
                    <p className="text-lg my-3">
                        Dive into the rhythm of dance fusion this summer! Join
                        our vibrant summer school for a dynamic blend of dance
                        styles, energy, and creativity.
                    </p>
                </div>
                <div className="w-full md:w-1/4 lg:w-1/6 md:pl-11">
                    <h3 className="text-xl font-bold text-[#0F2A5A]">
                        Quick Access
                    </h3>
                    <div className="bg-[#FF5300] w-10 h-1"></div>
                    <ul>
                        <li className="mr-2 text-xl link link-hover my-2">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "link text-[#7E1263]"
                                        : "text-[#0F2A5A]"
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="mr-2 text-xl link link-hover mb-2">
                            <NavLink
                                to="/instructors"
                                className={({ isActive }) =>
                                    isActive
                                        ? "link text-[#7E1263]"
                                        : "text-[#0F2A5A]"
                                }
                            >
                                Instructors
                            </NavLink>
                        </li>
                        <li className="mr-2 text-xl link link-hover mb-2">
                            <NavLink
                                to="/classes"
                                className={({ isActive }) =>
                                    isActive
                                        ? "link text-[#7E1263]"
                                        : "text-[#0F2A5A]"
                                }
                            >
                                Classes
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="w-full md:w-1/4 lg:w-1/4">
                    <h3 className="text-xl font-bold text-[#0F2A5A]">
                        Contact Us
                    </h3>
                    <div className="bg-[#FF5300] w-10 h-1"></div>
                    <div className="flex justify-center items-center my-2">
                        <FaMapMarkerAlt className="text-xl mr-2 text-[#7E1263]" />
                        <span className="text-lg">
                            High Road, Almdanga (7210), Chuadanga
                        </span>
                    </div>
                    <div className="flex justify-center items-center mb-2">
                        <FaPhoneAlt className="text-xl mr-2 text-[#7E1263]" />
                        <span className="text-lg">+8801XXX XXX XXX</span>
                    </div>
                    <div className="flex justify-center items-center mb-2">
                        <FaEnvelope className="text-xl mr-2 text-[#7E1263]" />
                        <span className="text-lg">email@example.com</span>
                    </div>
                    <div className="flex justify-around items-center mb-2">
                        <button className="btn btn-circle btn-outline btn-sm mr-5 hover:bg-[#7E1263]">
                            <FaFacebookF />
                        </button>
                        <button className="btn btn-circle btn-outline btn-sm mr-5 hover:bg-[#7E1263]">
                            <FaGithub />
                        </button>
                        <button className="btn btn-circle btn-outline btn-sm mr-5 hover:bg-[#7E1263]">
                            <FaLinkedinIn />
                        </button>
                        <button className="btn btn-circle btn-outline btn-sm hover:bg-[#7E1263]">
                            <FaTwitter />
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-1/4 lg:w-1/4">
                    <h3 className="text-xl font-bold text-[#0F2A5A]">
                        Newsletter
                    </h3>
                    <div className="bg-[#FF5300] w-10 h-1"></div>
                    <div>
                        <p className="text-lg">
                            Subscribe for our upcoming latest articles and news
                            resources
                        </p>
                        <form className="w-full max-w-sm">
                            <div className="flex items-center border-b-2 border-[#0F2A5A] py-2">
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-[#0F2A5A] mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type="email"
                                    placeholder="Your email"
                                />
                                <button
                                    className="flex-shrink-0 bg-[#0F2A5A] hover:bg-[#7E1263] border-[#0F2A5A] hover:border-[#7E1263] text-sm border-4 text-white py-1 px-2 rounded"
                                    type="submit"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="bg-base-200 text-center p-4 mt-10">
                <div>
                    <p>
                        Copyright © 2023 - All right reserved by Dance
                        Fusion-Summer Camp
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
