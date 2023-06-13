import useAuth from "../../Hooks/useAuth";
import useUsers from "../../Hooks/useUsers";

const TopBar = () => {
    const { user } = useAuth();
    const [users] = useUsers();
    const student = users.find(
        (loggedUser) => loggedUser.email === user?.email
    );

    return (
        <div className="bg-gray-200 p-4 flex items-center justify-between">
            <div>
                <h3 className="text-xl font-bold">{student.displayName}</h3>
                <p className="text-gray-600">{student.role}</p>
            </div>
            <img
                className="w-8 h-8 rounded-full"
                src={student.photoURL}
                alt="user image"
            />
        </div>
    );
};

export default TopBar;
