import React, { useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate=useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/home")
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {user && user.role === "user" && <li><Link to="/expenses">My Expenses</Link></li>}
        {user && user.role === "admin" && <li><Link to="/admin">Admin Panel</Link></li>}
        {user ? (
          <li><button onClick={handleLogout}>Logout</button></li>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
