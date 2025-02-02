import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const AuthLinks = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleMinSida = () => {
        navigate("/min-sida");
    };

    return (
        <div className="w-full p-4 bg-white rounded-lg">
            {isLoggedIn ? (
                <>
                    <button
                        onClick={handleMinSida}
                        className="w-full text-left p-2 rounded text-blue-800 hover:text-blue-800"
                    >
                        Min Sida
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left p-2 rounded text-blue-800 hover:text-blue-800"
                    >
                        Logga ut
                    </button>
                </>
            ) : (
                <>
                    <NavLink
                        to="/register"
                        className="block w-full text-left p-2 rounded text-blue-800 hover:text-blue-800"
                    >
                        Registrera dig
                    </NavLink>
                    <NavLink
                        to="/login"
                        className="block w-full text-left p-2 rounded text-blue-800 hover:text-blue-800"
                    >
                        Logga in
                    </NavLink>
                </>
            )}
        </div>
    );
};

export default AuthLinks;
