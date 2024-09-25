import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, phone, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const data = {
            name,
            email,
            phone,
            password,
            confirm_password: confirmPassword,
        };

        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            alert('Registration successful!');
            console.log(result);

        } catch (error) {
            console.error('There was a problem with the registration:', error);
            alert('Registration failed! Please try again.');
        }
        setFormData("");
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-md-5">
                    <div className="card" id="signcard">
                        <div className="card-header text-center">
                            <h4>Sign Up</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control mt-2"
                                        id="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group mt-4">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control mt-2"
                                        id="email"
                                        placeholder="Enter email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group mt-4">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="form-control mt-2"
                                        id="phone"
                                        placeholder="Enter phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group mt-4 position-relative">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        className="form-control mt-2"
                                        id="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
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
                                <div className="form-group mt-4 position-relative">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type={confirmPasswordVisible ? 'text' : 'password'}
                                        className="form-control mt-2"
                                        id="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className='mt-3'
                                        onClick={toggleConfirmPasswordVisibility}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '10px',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <FontAwesomeIcon icon={confirmPasswordVisible ? faEyeSlash : faEye} />
                                    </span>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-4 w-100">Sign Up</button>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <p>Already have an account? <a href="#">Sign In</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
