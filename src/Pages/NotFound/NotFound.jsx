import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="text-center mx-auto">
            <div>
                <img
                    src="https://joyskyz.com/wp-content/uploads/2023/06/something-lost.png"
                    alt="404"
                    className="mx-auto w-1/2"
                />
            </div>
            <p className="text-xl w-2/3 mx-auto font-medium">
                Oops! the page you are looking for might have been removed had
                its name changed or is temporarily unavailable.
            </p>
            <Link to="/">
                <button className="btn btn-neutral mt-5">
                    Go to Home Page
                </button>
            </Link>
        </div>
    );
};

export default NotFound;
