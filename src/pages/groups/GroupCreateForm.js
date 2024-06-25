import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Alert, Image, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { axiosReq } from '../../api/axiosDefaults';
import appStyles from '../../App.module.css';
import divider from '../../styles/Divider.module.css';
import formStyles from '../../styles/Form.module.css';
import btnStyles from '../../styles/Button.module.css';
import { useRedirect } from '../../hooks/useRedirect';

const GroupCreateForm = () => {
    useRedirect('loggedOut');
    const [groupData, setGroupData] = useState({
        name: '',
        description: '',
        banner: null,
        groupLogo: null,
        bannerPreview: '',
        groupLogoPreview: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const { name, description, banner, groupLogo, bannerPreview, groupLogoPreview } = groupData;

    const handleChange = (event) => {
        setGroupData({
            ...groupData,
            [event.target.name]: event.target.value
        });
    };

    const handleDrop = (acceptedFiles, type) => {
        const file = acceptedFiles[0];
        setGroupData((prevData) => ({
            ...prevData,
            [type]: file,
            [`${type}Preview`]: URL.createObjectURL(file)
        }));
    };

    const {
        getRootProps: getRootPropsBanner,
        getInputProps: getInputPropsBanner,
        isDragActive: isDragActiveBanner
    } = useDropzone({
        onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'banner'),
        accept: 'image/*',
    });

    const {
        getRootProps: getRootPropsGroupLogo,
        getInputProps: getInputPropsGroupLogo,
        isDragActive: isDragActiveGroupLogo
    } = useDropzone({
        onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'groupLogo'),
        accept: 'image/*',
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
        if (groupLogo) {
            formData.append('group_logo', groupLogo);
        }

        try {
            await axiosReq.post('/groups/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false);
            history.push('/groups');
        } catch (err) {
            if (err.response?.status === 403) {
                setErrors({ non_field_errors: ['You do not have permission to create a group.'] });
            } else {
                setErrors(err.response?.data || {});
            }
            setLoading(false);
        }
    };

    return (
        <Container className={appStyles.Content}>
            <h1 className="text-center">Create New Group</h1>
            <div className={divider.BlueDivider} />
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

                <Form.Group controlId="banner">
                    <Form.Label>Banner Image:</Form.Label>
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

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        className={formStyles.Input}
                        name="description"
                        value={description}
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                    />
                    {errors.description?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="groupLogo">
                    <Form.Label>Group Logo:</Form.Label>
                    {groupLogoPreview && (
                        <div className="mb-3 position-relative">
                            <Image src={groupLogoPreview} thumbnail />
                            <Button
                                variant="danger"
                                size="sm"
                                className={`${formStyles.RemoveButton} position-absolute top-0 end-0`}
                                onClick={() => setGroupData({ ...groupData, groupLogo: null, groupLogoPreview: '' })}
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
                                    <p>Drag and drop a group logo here, or click to select one</p>
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
