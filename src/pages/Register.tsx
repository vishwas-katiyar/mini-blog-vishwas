import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await registerUser(name, phone, email, password);
      if (response?.message) {
        navigate("/login");
      }
    } catch (error: any) {
      setError(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="max-h-screen w-full flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-8 md:px-16 order-last md:order-first">
        <div className="w-full max-w-sm space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Sign Up</h2>
            <p className="mt-1 text-sm text-gray-500">
              Join the conversation. Sign up to share and explore insightful
              blogs.
            </p>
          </div>

          {error && <div className="text-red-600 text-center">{error}</div>}

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full h-10 px-4 border rounded-md focus:ring-2 focus:ring-purple-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full h-10 px-4 border rounded-md focus:ring-2 focus:ring-purple-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full h-10 px-4 border rounded-md focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full h-10 px-4 border rounded-md focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full h-10 px-4 border rounded-md focus:ring-2 focus:ring-purple-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full h-10 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:text-purple-700">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 p-6 order-first md:order-last">
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

export default Register;
