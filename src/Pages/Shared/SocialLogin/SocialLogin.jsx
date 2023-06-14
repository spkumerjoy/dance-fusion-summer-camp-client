import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = () => {
        googleSignIn().then((result) => {
            const loggedInUser = result.user;
            console.log(loggedInUser);
            const savedUser = {
                displayName: loggedInUser.displayName,
                photoURL: loggedInUser.photoURL,
                email: loggedInUser.email,
                role: "student",
            };
            fetch("https://dance-fusion-summer-camp-server.vercel.app/users", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(savedUser),
            })
                .then((res) => res.json())
                .then(() => {
                    navigate(from, { replace: true });
                });
        });
    };

    return (
        <button
            onClick={handleGoogleLogin}
            className="btn btn-circle btn-active btn-ghost  btn-xs sm:btn-sm md:btn-md  mx-auto"
        >
            <FcGoogle className="text-3xl hover:text-4xl ease-in-out" />
        </button>
    );
};

export default SocialLogin;
