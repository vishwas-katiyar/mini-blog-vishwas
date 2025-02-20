import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-2xl font-bold">LOGO</div>

      <div>
        <Link to="/login">
          {!user ? (
            <button className="text-white bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-4 rounded">
              Sign In
            </button>
          ) : (
            <button
              className="text-white bg-red-500 hover:bg-blue-600 font-semibold py-2 px-4 rounded"
              onClick={() => logout()}
            >
              Logout
            </button>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
