import React from 'react';
import './CentralSchemes.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NavbarComponent from '../../components/Navbar/NavbarComponent';

const schemesData = [
    {
        id: 1,
        image: 'assets/enam1.jpeg',
        name: 'eNAM',
        fullForm: 'National Agriculture Market',
        details: 'This scheme is an online platform that connects farmers with buyers across the country and provides them with better market access and price realization.',
        link: 'https://www.enam.gov.in/web/'
    },
    {
        id: 2,
        image: 'assets/pfbm.jpeg',
        name: 'PMFBY',
        fullForm: 'Pradhan Mantri Fasal Bima Yojana',
        details: 'This scheme aims to provide affordable crop insurance to farmers against crop loss due to natural calamities, pests, and diseases.',
        link: 'https://pmfby.gov.in/'
    },
    {
        id: 3,
        image: 'https://th.bing.com/th/id/R.0b7da5e522f2768bf1e96a380c8662f9?rik=c%2fEFv3i%2bDRvt0w&riu=http%3a%2f%2fwww.dcengineering.co.uk%2fimages%2fvms0001.jpg&ehk=UF4FEiuhbbANHO6C7EALjIQvEvz6Rq2uZtc4NFBsx1Q%3d&risl=&pid=ImgRaw&r=0',
        name: 'RKVY',
        fullForm: 'Rashtriya Krishi Vikas Yojana',
        details: 'This scheme provides financial assistance to states and union territories for the implementation of agriculture-related projects and activities.',
        link: 'https://rkvy.nic.in/'
    },
    {
        id: 4,
        image: 'assets/PMKMDY.jpeg',
        name: 'PM-KMY',
        fullForm: 'Pradhan Mantri Kisan Maan Dhan Yojana',
        details: 'This scheme is a voluntary and contributory pension scheme for farmers in the age group of 18 to 40 years, with a minimum pension of Rs. 3,000 per month on attaining the age of 60 years.',
        link: 'http://www.pmkvyofficial.org/'
    }
];

const CentralSchemes = () => {
    return (
        <div>
            <NavbarComponent />
            <Container className="central-schemes-container">
                <Row>
                    {schemesData.map((scheme) => (
                        <Col lg={3} md={6} sm={12} key={scheme.id} className="mb-4">
                            <Card className="h-100 scheme-card">
                                <div className="flip-container">
                                    <div className="flipper">
                                        <div className="front">
                                            <Card.Img variant="top" src={scheme.image} className="scheme-image" />
                                        </div>
                                        <div className="back">
                                            <Card.Body>
                                                <Card.Title className="scheme-name">{scheme.name}</Card.Title>
                                                <Card.Text className="scheme-full-form">{scheme.fullForm}</Card.Text>
                                                <Card.Text className="scheme-details">{scheme.details}</Card.Text>
                                                <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Know More</a>
                                            </Card.Body>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default CentralSchemes;
