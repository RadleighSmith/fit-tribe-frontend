import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Row, Col, Image, Alert, Spinner, Button } from 'react-bootstrap';
import { useProfile, useSetProfile } from '../../contexts/ProfileContext';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import appStyles from '../../App.module.css';
import profileStyles from '../../styles/ProfilePage.module.css';
import btnStyles from '../../styles/Button.module.css';
import loaderStyles from '../../styles/Loader.module.css';
import divider from '../../styles/Divider.module.css';

const ProfilePage = () => {
    const { id } = useParams();
    const history = useHistory();
    const currentUser = useCurrentUser();
    const profileData = useProfile();
    const { fetchProfileData, loading, errors } = useSetProfile();

    useEffect(() => {
        fetchProfileData(id);
    }, [id, fetchProfileData]);

    const handleEditClick = () => {
        history.push(`/profiles/${id}/edit`);
    };

    if (loading) {
        return (
            <div className={loaderStyles.LoaderContainer}>
                <Spinner animation="border" role="status" className={loaderStyles.Spinner}>
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (errors.message) {
        return (
            <Container className={appStyles.Content}>
                <Alert variant="danger">{errors.message}</Alert>
            </Container>
        );
    }

    if (!profileData) return null;

    const { name, bio, profile_image, cover_image, owner, created_at, followers_count, following_count } = profileData;

    return (
        <Container className={appStyles.Content}>
            <div className={profileStyles.ProfileHeader}>
                <div className={profileStyles.CoverImageContainer}>
                    <Image src={cover_image} fluid className={profileStyles.CoverImage} />
                </div>
                <div className={profileStyles.ProfileImageContainer}>
                    <Image src={profile_image} roundedCircle className={profileStyles.ProfileImage} />
                </div>
            </div>
            <Row className="justify-content-between align-items-end ml-md-5">
                <Col md="auto" className="d-flex align-items-end">
                    <div>
                        <h2>{name}</h2>
                        <p>Joined on {new Date(created_at).toLocaleDateString()}</p>
                    </div>
                </Col>
                {currentUser?.username === owner && (
                    <Col md="auto" className='mr-md-5 mb-md-5 m-3'>
                        <Button
                            onClick={handleEditClick}
                            className={`${btnStyles.Button} ${btnStyles.ButtonWide}`}>
                            Edit Profile
                        </Button>
                    </Col>
                )}
            </Row>
            <Row className={`${appStyles.Content} border justify-content-around mt-3`}>
                <Col md="auto" className={`${profileStyles.Bubble}`}>
                    <p className={profileStyles.BubbleText}>Followers: {followers_count}</p>
                </Col>
                <Col md="auto" className={`${profileStyles.Bubble}`}>
                    <p className={profileStyles.BubbleText}>Following: {following_count}</p>
                </Col>
            </Row>
            <Row className='mt-4'>
                <div className={divider.BlueDivider} />
            </Row>
            <Row className={`${appStyles.Content} border justify-content-around mt-3`}>
                <Col md={12}>
                    <p>{bio}</p>
                </Col>
            </Row>
            {errors.detail && <Alert variant="warning">{errors.detail}</Alert>}
        </Container>
    );
};

export default ProfilePage;
