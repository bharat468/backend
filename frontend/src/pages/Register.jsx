import { useState } from "react";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"
import instance from "../axiosConfig";

function Register() {
    const [data, setData] = useState({
        name: "",
        phone: "",
        username: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate()

    function handleChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await instance.post(
            "/user/register",
            data
        );
        console.log("User Registered:", response.data);
        alert("user registerstion successfully")

        navigate("/login")
    }

    return (
        <div>
            <h2>Register To Our E-commerce</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Enter email"
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
                        placeholder="Enter password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
