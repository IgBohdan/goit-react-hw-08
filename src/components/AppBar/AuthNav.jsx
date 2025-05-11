import { NavLink } from "react-router-dom";

const AuthNav = () => {
  return (
    <div className="flex gap-4">
      <NavLink
        to="/register"
        className={({ isActive }) =>
          `font-medium text-lg transition-colors duration-200 ${
            isActive ? "underline underline-offset-4" : "hover:text-gray-600"
          }`
        }
      >
        Register
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          `font-medium text-lg transition-colors duration-200 ${
            isActive ? "underline underline-offset-4" : "hover:text-gray-600"
          }`
        }
      >
        Login
      </NavLink>
    </div>
  );
};

export default AuthNav;