import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import appStyles from '../App.module.css';
import btnStyles from '../styles/Button.module.css';
import divider from '../styles/Divider.module.css';

const FollowingPage = () => {
    const [following, setFollowing] = useState([]);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const { data } = await axiosReq.get('/followers/');
                setFollowing(data.results);
            } catch (err) {
                setErrors(err.response?.data);
            }
        };

        fetchFollowing();
    }, []);

    const handleUnfollow = async (followId) => {
        try {
            await axiosReq.delete(`/followers/${followId}/`);
            setFollowing(following.filter(follow => follow.id !== followId));
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Container className={appStyles.Content}>
            <Row>
                <Col className="text-center p-3">
                    <h1>Following</h1>
                    {errors && <Alert variant="danger">{errors.detail}</Alert>}
                    <hr />
                </Col>
            </Row>
            <Row>
                {Array.isArray(following) && following.length > 0 ? (
                    following.map(follow => (
                        <Col key={follow.id} xs={12} className="mb-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <Link to={`/profiles/${follow.followed}`} className="d-flex align-items-center">
                                    <span className="ml-2 text-decoration-none text-body ml-md-5">{follow.followed_name}</span>
                                </Link>
                                <Button
                                    className={`${btnStyles.Button} ml-md-5`}
                                    onClick={() => handleUnfollow(follow.id)}
                                >
                                    Unfollow
                                </Button>
                            </div>
                            <hr className={`${divider.OffWhiteDivider} mt-3`} />
                        </Col>
                    ))
                ) : (
                    <Col className="text-center">
                        <p>You are not following anyone yet.</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default FollowingPage;
