import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Alert, Image, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

import appStyles from '../../App.module.css';
import divider from '../../styles/Divider.module.css';
import formStyles from '../../styles/Form.module.css';
import btnStyles from '../../styles/Button.module.css';
import { useRedirect } from '../../hooks/useRedirect';

const GroupCreateForm = () => {
    useRedirect('loggedOut');
    const currentUser = useCurrentUser();
    const history = useHistory();
    const [groupData, setGroupData] = useState({
        name: '',
        description: '',
        banner: null,
        group_logo: null,
        bannerPreview: '',
        groupLogoPreview: ''
    });

    const { name, description, banner, group_logo, bannerPreview, groupLogoPreview } = groupData;
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!currentUser?.is_superuser && !currentUser?.is_staff) {
            setErrors({ permission: 'You do not have permission to create a group.' });
        }
    }, [currentUser]);

    const handleChange = (event) => {
        setGroupData({
            ...groupData,
            [event.target.name]: event.target.value
        });
    };

    const handleDescriptionChange = (value) => {
        setGroupData({
            ...groupData,
            description: DOMPurify.sanitize(value)
        });
    };

    const {
        getRootProps: getRootPropsBanner,
        getInputProps: getInputPropsBanner,
        isDragActive: isDragActiveBanner
    } = useDropzone({
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            setGroupData({
                ...groupData,
                banner: file,
                bannerPreview: URL.createObjectURL(file)
            });
        },
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    });

    const {
        getRootProps: getRootPropsGroupLogo,
        getInputProps: getInputPropsGroupLogo,
        isDragActive: isDragActiveGroupLogo
    } = useDropzone({
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            setGroupData({
                ...groupData,
                group_logo: file,
                groupLogoPreview: URL.createObjectURL(file)
            });
        },
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (banner) {
            formData.append('banner', banner);
        }
        if (group_logo) {
            formData.append('group_logo', group_logo);
        }

        try {
            await axios.post('/groups/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false);
            history.push('/groups');
        } catch (err) {
            setErrors(err.response?.data);
            setLoading(false);
        }
    };

    if (errors.permission) {
        return (
            <Container className={appStyles.Content}>
                <Alert variant="danger" className="text-center">
                    {errors.permission}
                </Alert>
                <div className="text-center">
                    <Button
                        className={`${btnStyles.Button} ${btnStyles.ButtonWide}`}
                        onClick={() => history.push('/groups')}
                    >
                        Return to Groups
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <Container className={appStyles.Content}>
            <h1 className="text-center">Create New Group</h1>
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
                    <Form.Label>Group Description</Form.Label>
                    <ReactQuill
                        className={formStyles.Input}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    {errors.description?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="banner">
                    <Form.Label>Banner:</Form.Label>
                    {bannerPreview && (
                        <div className="mb-3 position-relative">
                            <Image src={bannerPreview} thumbnail />
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
                    {!bannerPreview && (
                        <div {...getRootPropsBanner({ className: formStyles.Dropzone })}>
                            <input {...getInputPropsBanner()} />
                            {
                                isDragActiveBanner ?
                                    <p>Drop the files here ...</p> :
                                    <p>Drag 'n' drop a banner image here, or click to select one</p>
                            }
                            <i className="fas fa-upload fa-2x"></i>
                        </div>
                    )}
                    {errors.banner?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="group_logo">
                    <Form.Label>Group Logo:</Form.Label>
                    {groupLogoPreview && (
                        <div className="mb-3 position-relative">
                            <Image src={groupLogoPreview} thumbnail />
                            <Button
                                variant="danger"
                                size="sm"
                                className={`${formStyles.RemoveButton} position-absolute top-0 end-0`}
                                onClick={() => setGroupData({ ...groupData, group_logo: null, groupLogoPreview: '' })}
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                    {!groupLogoPreview && (
                        <div {...getRootPropsGroupLogo({ className: formStyles.Dropzone })}>
                            <input {...getInputPropsGroupLogo()} />
                            {
                                isDragActiveGroupLogo ?
                                    <p>Drop the file here ...</p> :
                                    <p>Drag and drop a group logo image here, or click to select one</p>
                            }
                            <i className="fas fa-upload fa-2x"></i>
                        </div>
                    )}
                    {errors.group_logo?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                {errors.non_field_errors?.map((message, idx) => (
                    <Alert key={idx} variant="warning">{message}</Alert>
                ))}
                
                <Button type="submit" className={`${btnStyles.Button} ${btnStyles.ButtonWide}`} disabled={loading}>
                    {loading ? (
                        <>
                            <Spinner animation="border" size="sm" role="status" className="mr-2" />
                            Submitting...
                        </>
                    ) : (
                        "Create Group"
                    )}
                </Button>
            </Form>
        </Container>
    );
};

export default GroupCreateForm;
