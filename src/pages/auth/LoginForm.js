import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/fittribe_logo_coloured.png";
import signInImage from "../../assets/sign_in_image.jpeg"; 
import styles from "../../styles/LoginSignUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";

const LoginForm = () => {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });
    const { username, password } = loginData;

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/dj-rest-auth/login/", loginData);
            history.push("/"); // Redirect to home page or dashboard upon successful login
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Row className={'no-gutters'}>
            <Col className={styles.LeftCol} md={6}>
                <div className={styles.Circle} />
                <div className={styles.InnerCircle} />
                <Image className={styles.FormImage} src={signInImage} />
            </Col>
            <Col className={`my-auto p-sm-2 p-md-3 p-lg-5 ${styles.RightCol}`} md={6}>
                <Container className={`${appStyles.Content} p-4`}>
                    <img src={logo} alt='FitTribe Logo' className={styles.Logo} height='60' />
                    <h1 className={styles.FormTitle}>Login</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">Username</Form.Label>
                            <Form.Control
                                className={styles.Input}
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
                        <Form.Group controlId="password">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                            {errors.password?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>{message}</Alert>
                            ))}
                        </Form.Group>
                        <Link className={styles.Link} to="/signup">
                            Don't have an account? <span>Sign up here</span>
                        </Link>
                        <Button
                            className={btnStyles.Button}
                            type="submit"
                        >
                            Sign In
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

export default LoginForm;
