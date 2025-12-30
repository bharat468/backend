import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../App.css";
import { useAuth } from "../contexts/AuthProvider";
import { useState } from "react";

function Login() {
  const { checkIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status == 200) {
        checkIsLoggedIn();
        const params1 = new URLSearchParams(window.location.search);
        console.log(params1);
        for (const [key, value] of params1.entries()) {
          if (key === "nextPage") navigate(value);
        }
      }
      console.log("Login success:", response.data);
      alert("Login successful!");
      // setIsLoggedIn(true);

      // navigate("/"); // go to home page
    } catch (error) {
      console.log("Login error:", error);
      alert("Invalid email or password");
    }
  }

  return (
    <div>
      <h2 className="login-user">Login To your Account</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;