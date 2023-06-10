import { Carousel } from "react-carousel-minimal";
import "./Slider.css";

const Slider = () => {
    const data = [
        {
            image: "https://joyskyz.com/wp-content/uploads/2023/06/class-ballet-dancing.jpg",
            caption: `<div>
                        <div class="slide-down">Ballet Dance</div>
                        <div class="slide-up">Discover the grace and elegance of ballet at our Summer Camp Learning School. Explore the art form through expert instruction and captivating performances. Enroll today!</div>
                    </div>`,
        },
        {
            image: "https://joyskyz.com/wp-content/uploads/2023/06/Hip-Hop.jpg",
            caption: `<div>
                        <div class="slide-down">Hip Hop Dance</div>
                        <div class="slide-up">Hip Hop dance is an energetic and dynamic form that originated from urban culture. Learn cool moves, grooves, and freestyle in our Summer Camp Learning School!</div>
                    </div>`,
        },
        {
            image: "https://joyskyz.com/wp-content/uploads/2023/06/kids_summer_camp.jpg",
            caption: `<div>
                        <div class="slide-down">Jazz Dance</div>
                        <div class="slide-up">Jazz dance is a vibrant and expressive style characterized by its syncopated rhythms and improvisational nature. Join our Summer Camp Learning School to learn the art of jazz and showcase your creativity on the dance floor!</div>
                    </div>`,
        },
    ];

    const captionStyle = {
        fontSize: "2em",
        fontWeight: "bold",
    };
    const slideNumberStyle = {
        fontSize: "20px",
        fontWeight: "bold",
    };
    return (
        <div className="App">
            <div style={{ textAlign: "center" }}>
                <div>
                    <Carousel
                        data={data}
                        time={2000}
                        width="100%"
                        height="100%"
                        captionStyle={captionStyle}
                        radius="0"
                        slideNumber={true}
                        slideNumberStyle={slideNumberStyle}
                        captionPosition="center"
                        automatic={true}
                        dots={true}
                        pauseIconColor="white"
                        pauseIconSize="40px"
                        slideBackgroundColor="darkgrey"
                        slideImageFit="cover"
                        thumbnails={false}
                        style={{
                            textAlign: "center",
                            maxWidth: "100%",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Slider;
