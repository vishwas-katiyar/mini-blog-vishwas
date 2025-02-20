import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login failed");
    }
  };

  return (
    <div className="max-h-screen w-full flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-8 md:px-16">
        <div className="w-full max-w-sm space-y-6">
          <div>
            <h2 className="text-xl font-medium text-gray-900 flex items-center gap-2">
              Welcome Back{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
            </h2>
            <p className="mt-1 text-sm text-gray-500 leading-tight">
              Share your thoughts, log in to enjoy and explore together shop.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full h-10 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full h-10 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-10 mt-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don't you have an account?{" "}
            <Link
              to="/register"
              className="text-purple-600 hover:text-purple-700"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <div className=" md:block md:w-1/2 p-6">
        <div className="w-full h-full rounded-2xl overflow-hidden">
          <img
            src="/Login.jpg"
            alt="Sunset through leaves"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;