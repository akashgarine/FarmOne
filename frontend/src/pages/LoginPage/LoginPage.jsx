import React, { useState } from 'react';
import { Container, Nav, Tab, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';  // Import Toastify
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import './LoginPage.css';

function LoginPage() {
    const [key, setKey] = useState('login');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const navigate = useNavigate();  // Create navigate function for redirection

    // Handle login
    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!loginEmail || !loginPassword) {
            toast.error('Please fill in all login fields');
            return;
        }

        try {
            const { data } = await axios.post('http://localhost:5000/api/login', {
                email: loginEmail,
                password: loginPassword,
            });

            const authToken = data.token;
            const userId = data.userId;  // Assuming the backend returns userId in the response
            const role = data.message.includes('Admin') ? 'admin' : 'user';  // Set role based on response message

            localStorage.setItem('authToken', authToken);
            localStorage.setItem('userId', userId);  // Store userId in localStorage
            localStorage.setItem('role', role);  // Store role in localStorage

            toast.success(`${data.message}! Redirecting...`);
            setTimeout(() => {
                navigate('/');  // Redirect to the home page
            }, 2000);

        } catch (error) {
            toast.error('Incorrect email or password');
        }
    };




    // Handle registration
    const handleRegister = async (e) => {
        e.preventDefault();

        // Validate fields
        if (!registerUsername || !registerEmail || !registerPassword) {
            toast.error('Please fill in all registration fields');
            return;
        }

        try {
            const { data } = await axios.post('http://localhost:5000/api/register', {
                username: registerUsername,
                email: registerEmail,
                password: registerPassword,
            });
            toast.success('Registration successful!');  // Show success toast
            setTimeout(() => {
                setKey('login');  // Switch to the login form after successful registration
            }, 2000);
        } catch (error) {
            toast.error('Registration failed');  // Show error toast
        }
    };

    return (
        <div className="login-page">
            <div className="overlay"></div>
            <Container className="form-container">
                <ToastContainer /> {/* Toast Container for displaying notifications */}
                <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
                    <Nav variant="pills" className="justify-content-center mb-3">
                        <Nav.Item>
                            <Nav.Link eventKey="login">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="register">Register</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        {/* Login Form */}
                        <Tab.Pane eventKey="login">
                            <h3 className="text-center">Sign In</h3>
                            <Form onSubmit={handleLogin}>
                                <Form.Group controlId="loginEmail" className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="loginPassword" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button variant="success" type="submit" className="w-100">
                                    Sign In
                                </Button>
                            </Form>
                        </Tab.Pane>

                        {/* Register Form */}
                        <Tab.Pane eventKey="register">
                            <h3 className="text-center">Sign Up</h3>
                            <Form onSubmit={handleRegister}>
                                <Form.Group controlId="registerUsername" className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={registerUsername}
                                        onChange={(e) => setRegisterUsername(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="registerEmail" className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={registerEmail}
                                        onChange={(e) => setRegisterEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="registerPassword" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={registerPassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button variant="success" type="submit" className="w-100">
                                    Sign Up
                                </Button>
                            </Form>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container>
        </div>
    );
}

export default LoginPage;