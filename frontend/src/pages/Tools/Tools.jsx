import React, { useEffect, useState } from 'react';
import './Tools.css';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../../components/Navbar/NavbarComponent';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesome for icons
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Tools = () => {
    const navigate = useNavigate();
    const [fetchedTools, setFetchedTools] = useState([]); // State for storing tools fetched from the database
    const userRole = localStorage.getItem('role'); // Get role from localStorage

    // Fetch tools from the database
    useEffect(() => {
        const fetchTools = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tools');
                if (Array.isArray(response.data)) {
                    setFetchedTools(response.data);
                } else {
                    setFetchedTools([]);
                }
            } catch (error) {
                toast.error('Failed to fetch tools.');
                setFetchedTools([]);
            }
        };
        fetchTools();
    }, []);

    // Handle tool deletion
    const handleDeleteTool = async (id) => {
            try {
                await axios.delete(`http://localhost:5000/api/tools/${id}`);
                setFetchedTools((prevTools) => prevTools.filter((tool) => tool._id !== id));
                toast.success('Tool deleted successfully.');
            } catch (error) {
                toast.error('Failed to delete tool.');
            }
    };

    const handleCardClick = (tool) => {
        navigate(`/tools/${tool.id || tool._id}`, { state: { tool } });
    };

    const calculateDiscountPercentage = (price, discountPrice) => {
        const discount = ((price - discountPrice) / price) * 100;
        return Math.round(discount);
    };

    const handleAddToolClick = () => {
        navigate('/add-tool'); // Navigate to the add tool form
    };

    return (
        <div>
            <NavbarComponent />
            <Container className="tools-container">
                {userRole === 'admin' && (
                    <Button variant="primary" onClick={handleAddToolClick} className="mb-3">
                        Add Tool
                    </Button>
                )} 
                <Row>
                    {fetchedTools.length > 0 && fetchedTools.map((tool) => (
                        <Col lg={3} md={6} sm={12} key={tool.id || tool._id} className="mb-4">
                            <div onClick={() => handleCardClick(tool)}>
                            <Card className="h-100 tool-card" style={{ cursor: 'pointer' }} >
                                <div className="image-container" >
                                    <Card.Img variant="top" src={tool.image} className="tool-image" />
                                </div>
                                <Card.Body>
                                    <div className="tool-header">
                                        <Card.Title className="tool-name">{tool.name}</Card.Title>
                                        {userRole === 'admin' && (
                                            <FontAwesomeIcon
                                            icon={faTrash}
                                            onClick={(e) => {
                                                e.stopPropagation();  // Prevent the click from propagating
                                                handleDeleteTool(tool._id);
                                            }}
                                            className="delete-icon"
                                        />
                                        )}
                                    </div>
                                    <Card.Text className="tool-description">{tool.description}</Card.Text>
                                    <div className="tool-pricing">
                                        <h5 className="tool-price strike-price">
                                            ₹{tool.price.toLocaleString()}
                                        </h5>
                                        <h5 className="tool-price discount-price">
                                            ₹{tool.discountPrice.toLocaleString()}
                                            <span className="discount-percentage">
                                                ({calculateDiscountPercentage(tool.price, tool.discountPrice)}% off)
                                            </span>
                                        </h5>
                                    </div>
                                </Card.Body>
                            </Card>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};
export default Tools;