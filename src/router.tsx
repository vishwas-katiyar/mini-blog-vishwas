import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import Navbar from "./component/NavBar";

const AppRouter = () => {
  const { user } = useAuth();
  const location = useLocation();

  const hideNavbar = ["/", "/dashboard"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && user && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route
          path="/dashboard"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/create-post"
          element={user ? <CreatePost /> : <Navigate to="/login" />}
        />
        <Route path="/post/:id" element={<SinglePost />} />
      </Routes>
    </>
  );
};

export default AppRouter;
