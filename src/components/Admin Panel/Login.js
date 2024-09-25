import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';                  


const Login = () => {

  const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

 

    const handleSubmit = async (e) => {

        e.preventDefault();  // Fixed typo here

 

        try {

            const response = await fetch('http://localhost:8000/api/adminLogin', {

                method: 'POST',

                headers: {

                    'Content-Type': 'application/json',

                },

                body: JSON.stringify({

                    email: email,

                    password: password

                }),

            });

 

            const data = await response.json();

 

            if (response.ok) {

                console.log("Login successful:", data);

                // navigate("/home");  // Redirect to home on successful login

            } else {

                console.log("Login Failed:", data);

                alert(data.msg || "Login failed"); // Provide user feedback

            }

 

        } catch (error) {

            console.error("Error during login:", error);

            alert("An error occurred. Please try again.");

        }

 

        setEmail("");

        setPassword("");

    }

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
  return (

    <div className="container">
    <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-5">
            <div className="card" id="signcard">
                <div className="card-header text-center">
                    <h4>Login</h4>
                </div>
                <div className="card-body">
                <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control mt-2" id="username" placeholder="Enter username"
                 value={email}

                 onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="form-group mt-4 position-relative">
                  <label htmlFor="password">Password</label>
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    className="form-control mt-2"
                    id="password"
                    placeholder="Password"
                    value={password}

                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className='mt-3'
                    onClick={togglePasswordVisibility}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer'
                    }}
                  >
                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                  </span>
                </div>
            <button type="submit" class="btn btn-primary btn-block mt-4 w-100">Login</button>
        </form>
                </div>
                <div className="card-footer text-center">
                    <p>Need assistance? <a href="#">Contact Us</a></p>
                </div>
            </div>
        </div>
    </div>
</div>
  );
}

export default Login;