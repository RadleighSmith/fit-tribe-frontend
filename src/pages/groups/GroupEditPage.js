import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner, Image } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import appStyles from '../../App.module.css';
import formStyles from '../../styles/Form.module.css';
import btnStyles from '../../styles/Button.module.css';
import divider from '../../styles/Divider.module.css';
import { useRedirect } from '../../hooks/useRedirect';

const GroupEditPage = () => {
    useRedirect('loggedOut');
    const { id } = useParams();
    const history = useHistory();
    const currentUser = useCurrentUser();
    const [groupData, setGroupData] = useState({
        name: '',
        description: '',
        banner: null,
        group_logo: null,
        bannerPreview: '',
        logoPreview: '',
    });
    const { name, description, banner, group_logo, bannerPreview, logoPreview } = groupData;
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchGroupData = async () => {
            try {
                const { data } = await axiosReq.get(`/groups/${id}/`);
                if (currentUser?.is_superuser || currentUser?.is_staff) {
                    setGroupData({
                        name: data.name,
                        description: data.description,
                        banner: null,
                        group_logo: null,
                        bannerPreview: data.banner,
                        logoPreview: data.group_logo,
                    });
                } else {
                    if (isMounted) {
                        setErrors({ permission: 'You do not have permission to edit this group.' });
                        setTimeout(() => {
                            history.push('/groups');
                        }, 3000);
                    }
                }
            } catch (err) {
                if (isMounted) {
                    if (err.response?.status === 404) {
                        setErrors({ notFound: 'Group not found.' });
                    } else {
                        setErrors(err.response?.data);
                    }
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        fetchGroupData();
        return () => {
            isMounted = false;
        };
    }, [id, currentUser, history]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setGroupData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onDropBanner = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setGroupData(prevData => ({
            ...prevData,
            banner: file,
            bannerPreview: URL.createObjectURL(file),
        }));
    };

    const onDropLogo = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setGroupData(prevData => ({
            ...prevData,
            group_logo: file,
            logoPreview: URL.createObjectURL(file),
        }));
    };

    const { getRootProps: getRootPropsBanner, getInputProps: getInputPropsBanner } = useDropzone({
        onDrop: onDropBanner,
        accept: 'image/*',
    });

    const { getRootProps: getRootPropsLogo, getInputProps: getInputPropsLogo } = useDropzone({
        onDrop: onDropLogo,
        accept: 'image/*',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (banner) formData.append('banner', banner);
        if (group_logo) formData.append('group_logo', group_logo);

        try {
            await axiosReq.put(`/groups/${id}/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            history.push(`/groups/${id}`);
        } catch (err) {
            setErrors(err.response?.data || {});
        } finally {
            setSubmitting(false);
        }
    };

    if (errors.permission) {
        return (
            <Container className={appStyles.Content}>
                <Alert variant="danger">{errors.permission}</Alert>
                <Button
                    className={`${btnStyles.Button} ${btnStyles.ButtonWide}`}
                    onClick={() => history.push('/')}
                >
                    Go Back
                </Button>
            </Container>
        );
    }

    if (errors.notFound) {
        return (
            <Container className={appStyles.Content}>
                <Alert variant="danger" className="text-center">Group not found.</Alert>
                <Button
                    className={`${btnStyles.Button} ${btnStyles.ButtonWide}`}
                    onClick={() => history.push('/')}
                >
                    Go Back to Groups
                </Button>
            </Container>
        );
    }

    if (loading) {
        return (
            <div className={appStyles.LoaderContainer}>
                <Spinner animation="border" role="status" className={appStyles.Spinner}>
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <Container className={appStyles.Content}>
            <h1 className="text-center">Edit Group</h1>
            <div className={divider.BlueDivider} />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Group Name</Form.Label>
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

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        className={formStyles.Input}
                        as="textarea"
                        rows={6}
                        name="description"
                        value={description}
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                    />
                    {errors.description?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="banner">
                    <Form.Label>Banner</Form.Label>
                    {bannerPreview && (
                        <div className="mb-3 position-relative">
                            <Image src={bannerPreview} fluid />
                            <Button
                                variant="danger"
                                size="sm"
                                className={`${formStyles.RemoveButton} position-absolute top-0 end-0`}
                                onClick={() => setGroupData({ ...groupData, banner: null, bannerPreview: '' })}
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                    <div {...getRootPropsBanner({ className: formStyles.Dropzone })}>
                        <input {...getInputPropsBanner()} />
                        <p>Drag 'n' drop a banner image here, or click to select one</p>
                        <i className="fas fa-upload fa-2x"></i>
                    </div>
                    {errors.banner?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="group_logo">
                    <Form.Label>Group Logo</Form.Label>
                    {logoPreview && (
                        <div className="mb-3 position-relative">
                            <Image src={logoPreview} fluid />
                            <Button
                                variant="danger"
                                size="sm"
                                className={`${formStyles.RemoveButton} position-absolute top-0 end-0`}
                                onClick={() => setGroupData({ ...groupData, group_logo: null, logoPreview: '' })}
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                    <div {...getRootPropsLogo({ className: formStyles.Dropzone })}>
                        <input {...getInputPropsLogo()} />
                        <p>Drag 'n' drop a group logo image here, or click to select one</p>
                        <i className="fas fa-upload fa-2x"></i>
                    </div>
                    {errors.group_logo?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
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

export default GroupEditPage;
