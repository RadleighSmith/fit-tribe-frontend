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
import { useRedirect } from '../../hooks/useRedirect';

const ProfilePage = () => {
    useRedirect('loggedOut');
    const { id } = useParams();
    const history = useHistory();
    const currentUser = useCurrentUser();
    const profileData = useProfile();
    const { fetchProfileData, handleFollow, handleUnfollow, loading, errors, notFound } = useSetProfile();

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

    if (notFound) {
        return (
            <Container className={appStyles.Content}>
                <Alert variant="danger" className='text-center'>Profile not found.</Alert>
                <Button
                    className={`${btnStyles.Button} ${btnStyles.ButtonWide}`}
                    onClick={() => history.push(`/profiles/${currentUser?.profile_id}`)}
                >
                    Go Back to your Profile
                </Button>
            </Container>
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

    const { owner, name, bio, profile_image, cover_image, created_at, followers_count, following_count, following_id, display_name } = profileData;

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
                        <h2>{display_name ? `${name} (${owner})` : owner}</h2>
                        <p>Joined on {new Date(created_at).toLocaleDateString()}</p>
                    </div>
                </Col>
                {currentUser?.username === owner ? (
                    <Col md="auto" className="mr-md-5 mb-md-5 m-3">
                        <Button
                            onClick={handleEditClick}
                            className={`${btnStyles.Button} ${btnStyles.ButtonWide}`}>
                            Edit Profile
                        </Button>
                    </Col>
                ) : (
                    <Col md="auto" className="mr-md-5 mb-md-5 m-3">
                        {following_id ? (
                            <Button
                                onClick={() => handleUnfollow(profileData)}
                                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}>
                                Unfollow
                            </Button>
                        ) : (
                            <Button
                                onClick={() => handleFollow(profileData)}
                                className={`${btnStyles.Button} ${btnStyles.Black}`}>
                                Follow
                            </Button>
                        )}
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
            <Row className="mt-4">
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
