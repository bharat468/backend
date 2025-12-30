import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import instance from "../../axiosConfig";  

function AdminLogin() {

    const navigate = useNavigate()

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    function handleChange(e) {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            // ⭐ localhost हट गया → instance से auto URL switch
            const response = await instance.post("/admin/login", data)

            console.log("Login success", response.data)
            alert("Admin logged in successfully")

            navigate("/admin/product/add")
        }
        catch (error) {
            console.log("login error", error)
            alert("Invalid email or password")
        }
    }

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Email</label>
                    <input 
                        type="text"
                        placeholder='Enter Your Email'
                        name='email'
                        value={data.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder='Enter Your Password'
                        name='password'
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default AdminLogin
