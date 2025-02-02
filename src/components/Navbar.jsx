import { IoLogoIonitron } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { totalQuantity } = useSelector((state) => state.shoppingCart);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="h-20 bg-white shadow-md">
      <div className="px-6 container mx-auto flex items-center justify-between h-full">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <IoLogoIonitron className="size-12 text-blue-600" />
          <span className="text-gray-800">Spaceman Electronix</span>
        </Link>

        {/* Produkter, Kontakt, and Shopping Cart */}
        <ul className="flex items-center gap-6 text-lg font-medium">
        <li>
            <NavLink to="/" className="hover:text-blue-600 font-bold">
              Hem
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="hover:text-blue-600 font-bold">
              Produkter
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="hover:text-blue-600 font-bold">
              Kontakt
            </NavLink>
          </li>
          <li className="relative">
            {totalQuantity > 0 && (
              <div className="text-xs z-10 w-4 h-4 bg-red-600 rounded-full absolute -right-1 -top-1 flex items-center justify-center text-white pointer-events-none">
                {totalQuantity}
              </div>
            )}
            <Dropdown>
              <FaShoppingCart className="cursor-pointer text-2xl" />
            </Dropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;