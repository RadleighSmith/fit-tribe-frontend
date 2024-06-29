import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/fittribe_logo_coloured.png';
import signUpImage from '../../assets/sign_up_image.jpg';
import styles from '../../styles/LoginSignUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';
import formStyles from '../../styles/Form.module.css';
import { Form, Button, Image, Col, Row, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useRedirect } from '../../hooks/useRedirect';

const SignUpForm = () => {
    useRedirect('loggedIn');
    const [signUpData, setSignUpData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    });
    const { username, email, password1, password2 } = signUpData;

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', signUpData);
            history.push('/signin');
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Row className={'no-gutters'}>
            <Col className={`${styles.LeftCol} d-none d-lg-flex align-items-center justify-content-center`} lg={6}>
                <div className={styles.Circle} />
                <div className={styles.InnerCircle} />
                <Image className={styles.FormImage} src={signUpImage} />
            </Col>
            <Col className={`d-flex align-items-center justify-content-center ${styles.RightCol}`} xs={12} lg={6}>
                <Container className={`${appStyles.Content} p-4 m-2 m-sm-5`}>
                    <img src={logo} alt='FitTribe Logo' className={styles.Logo} height='60' />
                    <h1 className={styles.FormTitle}>Sign Up</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">Username</Form.Label>
                            <Form.Control
                                className={formStyles.Input}
                                type="text"
                                placeholder="Enter Username"
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                            {errors.username?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>{message}</Alert>
                            ))}
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label className="d-none">Email</Form.Label>
                            <Form.Control
                                className={formStyles.Input}
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                            {errors.email?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>{message}</Alert>
                            ))}
                        </Form.Group>
                        <Form.Group controlId="password1">
                            <Form.Label className="d-none">Enter Password</Form.Label>
                            <Form.Control
                                className={formStyles.Input}
                                type="password"
                                placeholder="Enter Password"
                                name="password1"
                                value={password1}
                                onChange={handleChange}
                            />
                            {errors.password1?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>{message}</Alert>
                            ))}
                        </Form.Group>
                        <Form.Group controlId="password2">
                            <Form.Label className="d-none">Confirm Password</Form.Label>
                            <Form.Control
                                className={formStyles.Input}
                                type="password"
                                placeholder="Confirm Password"
                                name="password2"
                                value={password2}
                                onChange={handleChange}
                            />
                            {errors.password2?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>{message}</Alert>
                            ))}
                        </Form.Group>
                        <Link className={styles.Link} to="/signin">
                            Already have a FitTribe account? <span>Sign in here</span>
                        </Link>
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.ButtonWide}`}
                            type="submit"
                        >
                            Submit
                        </Button>
                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert key={idx} variant="warning" className="mt-3">
                                {message}
                            </Alert>
                        ))}
                    </Form>
                </Container>
            </Col>
        </Row>
    );
};

export default SignUpForm;

