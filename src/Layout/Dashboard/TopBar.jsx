const TopBar = () => {
    const user = {
        name: "John Doe",
        role: "Administrator",
        avatar: "https://example.com/avatar.jpg", // URL to user's avatar
    };

    return (
        <div className="bg-gray-200 p-4 flex items-center justify-between">
            <div>
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-gray-600">{user.role}</p>
            </div>
            <img
                className="w-8 h-8 rounded-full"
                src={user.avatar}
                alt="User Avatar"
            />
        </div>
    );
};

export default TopBar;
