import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Button, Container, Alert, Image, Spinner, Row, Col } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import appStyles from '../../App.module.css';
import profileStyles from '../../styles/ProfilePage.module.css';
import formStyles from '../../styles/Form.module.css';
import btnStyles from '../../styles/Button.module.css';
import { useRedirect } from '../../hooks/useRedirect';

const EditProfilePage = () => {
    useRedirect('loggedOut');
    const { id } = useParams();
    const history = useHistory();
    const currentUser = useCurrentUser();
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        bio: '',
        profile_image: null,
        cover_image: null,
        profileImagePreview: '',
        coverImagePreview: '',
        display_name: false
    });
    const { name, email, bio, profile_image, cover_image, profileImagePreview, coverImagePreview, display_name } = profileData;
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchProfileData = async () => {
            try {
                const { data } = await axiosReq.get(`/profiles/${id}/`);
                if (currentUser?.username !== data.owner) {
                    if (isMounted) {
                        setAlert("You do not have permission to edit this profile.");
                        setTimeout(() => {
                            history.push(`/profiles/${currentUser?.profile_id}`);
                        }, 3000);
                    }
                } else {
                    setProfileData({
                        name: data.name,
                        email: data.email,
                        bio: data.bio,
                        profile_image: null,
                        cover_image: null,
                        profileImagePreview: data.profile_image,
                        coverImagePreview: data.cover_image,
                        display_name: data.display_name
                    });
                }
            } catch (err) {
                if (isMounted) {
                    setErrors(err.response?.data);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        fetchProfileData();
        return () => {
            isMounted = false;
        };
    }, [id, currentUser, history]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const profileImageDropzone = useDropzone({
        onDrop: acceptedFiles => {
            const file = acceptedFiles[0];
            setProfileData(prev => ({
                ...prev,
                profile_image: file,
                profileImagePreview: URL.createObjectURL(file)
            }));
        },
        accept: 'image/*',
        noClick: true
    });

    const coverImageDropzone = useDropzone({
        onDrop: acceptedFiles => {
            const file = acceptedFiles[0];
            setProfileData(prev => ({
                ...prev,
                cover_image: file,
                coverImagePreview: URL.createObjectURL(file)
            }));
        },
        accept: 'image/*',
        noClick: true
    });

    const handleProfileImageClick = () => {
        profileImageDropzone.open();
    };

    const handleCoverImageClick = () => {
        coverImageDropzone.open();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('bio', bio);
        formData.append('display_name', display_name);
        if (profile_image) formData.append('profile_image', profile_image);
        if (cover_image) formData.append('cover_image', cover_image);

        try {
            await axiosReq.put(`/profiles/${id}/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            history.push(`/profiles/${id}`);
        } catch (err) {
            setErrors(err.response?.data || {});
        } finally {
            setSubmitting(false);
        }
    };

    if (alert) {
        return (
            <Container className={appStyles.Content}>
                <Alert variant="danger">{alert}</Alert>
                <Button
                    className={`${btnStyles.Button} ${btnStyles.ButtonWide}`}
                    onClick={() => history.push(`/profiles/${currentUser?.profile_id}`)}
                >
                    Go Back
                </Button>
            </Container>
        );
    }

    if (loading) {
        return (
            <div className={profileStyles.LoaderContainer}>
                <Spinner animation="border" role="status" className={profileStyles.Spinner}>
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <Container className={appStyles.Content}>
            <div className={profileStyles.ProfileHeader}>
                <div className={profileStyles.CoverImageContainer}>
                    <Image src={coverImagePreview} fluid className={profileStyles.CoverImage} />
                    <Button onClick={handleCoverImageClick} className={`${btnStyles.Button} ${profileStyles.CoverImageButton}`}>
                        Change Cover Photo
                    </Button>
                </div>
                <div className={profileStyles.ProfileImageContainer}>
                    <Image src={profileImagePreview} roundedCircle className={profileStyles.ProfileImage} />
                    <Button onClick={handleProfileImageClick} className={profileStyles.ProfileImageButton}>
                        <i className="fa-solid fa-arrow-up-from-bracket fa-2xl" />
                    </Button>
                </div>
            </div>
            <Row className="justify-content-between">
                <Col md={12} className="text-left mt-5">
                    <h2>{name}</h2>
                </Col>
            </Row>
            {errors.profile_image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
            ))}
            {errors.cover_image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
            ))}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        className={formStyles.Input}
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    {errors.name?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        className={formStyles.Input}
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                    />
                    {errors.email?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="bio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                        className={formStyles.Input}
                        as="textarea"
                        rows={6}
                        name="bio"
                        value={bio}
                        onChange={handleChange}
                        isInvalid={!!errors.bio}
                    />
                    {errors.bio?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="display_name">
                    <Form.Check 
                        type="checkbox"
                        name="display_name"
                        label="Display Real Name on Profile"
                        checked={display_name}
                        onChange={handleChange}
                    />
                </Form.Group>

                {errors.non_field_errors?.map((message, idx) => (
                    <Alert key={idx} variant="warning">{message}</Alert>
                ))}

                <Button type="submit" className={`${btnStyles.Button} ${btnStyles.ButtonWide}`} disabled={submitting}>
                    {submitting ? (
                        <>
                            <Spinner animation="border" size="sm" role="status" className="mr-2" />
                            Submitting...
                        </>
                    ) : (
                        "Update"
                    )}
                </Button>
            </Form>
        </Container>
    );
};

export default EditProfilePage;
