import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import "../App.css"
import { Link } from "react-router-dom";



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
          const response = await axios.post(
            "http://localhost:3000/admin/login", data,
            { withCredentials: true }
          )



          console.log("Login success", response.data)
          alert("login in successfully in Admin")

        navigate("/admin/product/add")
        }

        catch (error) {
          console.log("login error", error),
            alert("Invelid email or password Admin")
        }
    }


    return (
        <div>
            <h2>Login To your Account</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="email">email</label>
                    <input type="text" placeholder='Enter Your Email' name='email' value={data.email} onChange={handleChange} required />
                </div>

                <div className='form-group'>
                    <label htmlFor="password">password</label>
                    <input type="password" placeholder='Enter Your Password' name='password' value={data.password} onChange={handleChange} required />
                </div>

                <button type='submit'>login</button>
            </form>
            
        </div>
    )
}

export default AdminLogin
