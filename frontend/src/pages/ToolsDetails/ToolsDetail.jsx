import React,{useContext} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import FooterComponent from '../../components/FooterComponents/FooterComponent';
import CartContext from '../../context/CartContext.js';

const ToolsDetail = () => {  // Receive incrementCartCount as a prop
    const { state } = useLocation();
    const navigate = useNavigate();
    const {addToCart} =useContext(CartContext);
    // Check if state or tool exists, otherwise redirect
    if (!state || !state.tool) {
        navigate('/tools');
        return null;
    }

    const { tool } = state;

    return (
        <div>
            <div className="container mt-4 mb-5">
                <Row>
                    <Col md={6}>
                        <Card.Img variant="top" src={tool.image} />
                    </Col>
                    <Col md={6}>
                        <Card.Body>
                            <Card.Title>{tool.name}</Card.Title>
                            <Card.Text>{tool.description}</Card.Text>
                            <Card.Text>
                                <span className="text-muted" style={{ textDecoration: 'line-through' }}>
                                    ${tool.price}
                                </span>{' '}
                                <span className="text-success">${tool.discountPrice}</span>
                            </Card.Text>
                            <Button variant="primary" onClick={()=>{addToCart(tool._id)}}>
                                Add to Cart
                            </Button>
                            <Button variant="secondary" >
                                Rent
                            </Button>
                            {console.log(tool._id)}     
                        </Card.Body>
                    </Col>
                </Row>
            </div>
            <FooterComponent />
        </div>
    );
};

export default ToolsDetail;