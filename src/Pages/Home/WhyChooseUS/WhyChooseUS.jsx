import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const WhyChooseUS = () => {
    return (
        <div className="md:mt-24 px-5 md:px-0">
            <SectionTitle
                subHeading={"Our Benefits"}
                heading={"WHY CHOOSE US"}
            ></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <img
                        src="https://joyskyz.com/wp-content/uploads/2023/06/Why-do-people-dance-1.jpg"
                        alt="Why"
                        className="w-full"
                    />
                </div>
                <div>
                    <ul className="list-decimal font-medium text-lg">
                        <li>
                            Expert Instructors: Our dance fusion Summer Camp
                            Learning School is led by highly experienced and
                            skilled instructors who are passionate about
                            teaching and have extensive knowledge in various
                            dance styles.
                        </li>
                        <li>
                            Diverse Dance Styles: We offer a diverse range of
                            dance styles in our fusion Summer Camp, allowing
                            students to explore and learn various genres, from
                            contemporary and hip-hop to classical and cultural
                            dances.
                        </li>
                        <li>
                            Creative Choreography: Our instructors focus on
                            developing creativity and artistic expression
                            through unique choreography, fostering individuality
                            and innovation among our students.
                        </li>
                        <li>
                            Fun and Engaging Environment: We strive to create a
                            fun and engaging learning environment where students
                            feel comfortable expressing themselves, making new
                            friends, and building confidence.
                        </li>
                        <li>
                            Well-Equipped Facilities: Our dance fusion Summer
                            Camp Learning School boasts state-of-the-art dance
                            studios and facilities, providing students with a
                            conducive space to practice and improve their dance
                            skills.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUS;
