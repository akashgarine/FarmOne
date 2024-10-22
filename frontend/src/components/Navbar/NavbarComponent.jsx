import React, { useState, useEffect,useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './NavbarComponent.css';
import CartContext from '../../context/CartContext.js'
const NavbarComponent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { cart } = useContext(CartContext); // Use context to get and set cart count
    const navigate = useNavigate();
    const location = useLocation();
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
        handleCartCount()
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId'); // Clear userId on logout
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleCartCount = () => {
        let count = 0;
        for (let i = 0; i < cart.length; i++) {
            count += cart[i].quantity;
        }
        return count;
    }

    return (
        <div className='Navbar'>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/home" className="farmone-brand">FarmOne</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {isLoggedIn && (
                            <div className="mx-auto d-flex flex-grow-1 justify-content-center">
                                <Nav>
                                    <Nav.Link href="/home">Home</Nav.Link>
                                    <NavDropdown title="Schemes" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/central-schemes">Central Schemes</NavDropdown.Item>
                                        <NavDropdown.Item href="/state-schemes">State Schemes</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="/tools">Tools</Nav.Link>
                                    <Nav.Link href="/support">Support</Nav.Link>
                                </Nav>
                            </div>
                        )}

                        <Nav className="ms-auto">
                            {isLoggedIn ? (
                                <Nav.Link onClick={handleLogout} className="login-button">Logout</Nav.Link>
                            ) : (
                                <Nav.Link href="/login" className="login-button">Login</Nav.Link>
                            )}

                            {/* Render cart icon if the current route starts with /tools */}
                            {location.pathname.startsWith('/tools') && userId && (
                                <Nav.Link href="/cart" className="ms-3 cart-icon">
                                    <FontAwesomeIcon icon={faCartShopping} size="lg" />
                                    <span className="cart-count">{handleCartCount()}</span>
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavbarComponent;