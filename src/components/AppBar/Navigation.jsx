import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex gap-6">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `font-medium text-lg transition-colors duration-200 ${
            isActive ? "underline underline-offset-4" : "hover:text-gray-600"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/contacts"
        className={({ isActive }) =>
          `font-medium text-lg transition-colors duration-200 ${
            isActive ? "underline underline-offset-4" : "hover:text-gray-600"
          }`
        }
      >
        Contacts
      </NavLink>
    </nav>
  );
};

export default Navigation;
