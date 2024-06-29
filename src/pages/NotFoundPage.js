import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import appStyles from '../App.module.css';
import btnStyles from '../styles/Button.module.css';

const NotFoundPage = () => {
    const history = useHistory();

    const handleGoHome = () => {
        history.push('/');
    };

    return (
        <Container className={`${appStyles.Content} text-center mt-5`}>
            <Row>
                <Col>
                    <h1>Error 404</h1>
                    <p className="lead">Page Not Found</p>
                    <i className="fa-solid fa-xmark fa-beat fa-2xl" style={{ color: 'red' }}></i>
                    <Button
                        onClick={handleGoHome}
                        className={`${btnStyles.Button} ${btnStyles.ButtonWide} mt-3`}>
                        Go to Homepage
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFoundPage;
