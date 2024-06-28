import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'; // import useParams to fetch the groupId from URL
import { Form, Button, Container, Alert, Image, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

import appStyles from '../../App.module.css';
import divider from '../../styles/Divider.module.css';
import formStyles from '../../styles/Form.module.css';
import btnStyles from '../../styles/Button.module.css';
import { useRedirect } from '../../hooks/useRedirect';

const EventCreateForm = () => {
    useRedirect('loggedOut');
    const { id: groupId } = useParams(); // fetch groupId from URL parameters
    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        location: '',
        start_time: '',
        end_time: '',
        banner: null,
        bannerPreview: '',
    });

    const { name, description, location, start_time, end_time, banner, bannerPreview } = eventData;
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleChange = (event) => {
        setEventData({
            ...eventData,
            [event.target.name]: event.target.value
        });
    };

    const {
        getRootProps: getRootPropsBanner,
        getInputProps: getInputPropsBanner,
        isDragActive: isDragActiveBanner
    } = useDropzone({
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            setEventData({
                ...eventData,
                banner: file,
                bannerPreview: URL.createObjectURL(file)
            });
        },
        accept: 'image/*'
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('start_time', start_time);
        formData.append('end_time', end_time);
        formData.append('group', groupId); // append groupId to formData
        if (banner) {
            formData.append('banner', banner);
        }

        try {
            await axios.post('/group-events/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false);
            history.push(`/groups/${groupId}`);
        } catch (err) {
            setErrors(err.response?.data);
            setLoading(false);
        }
    };

    return (
        <Container className={appStyles.Content}>
            <h1 className="text-center">Create New Event</h1>
            <div className={divider.BlueDivider} />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Event Name</Form.Label>
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
                    <Form.Label>Event Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={description}
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                    />
                    {errors.description?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="location">
                    <Form.Label>Event Location</Form.Label>
                    <Form.Control
                        className={formStyles.Input}
                        type="text"
                        name="location"
                        value={location}
                        onChange={handleChange}
                        isInvalid={!!errors.location}
                    />
                    {errors.location?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="start_time">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                        className={formStyles.Input}
                        type="datetime-local"
                        name="start_time"
                        value={start_time}
                        onChange={handleChange}
                        isInvalid={!!errors.start_time}
                    />
                    {errors.start_time?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="end_time">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                        className={formStyles.Input}
                        type="datetime-local"
                        name="end_time"
                        value={end_time}
                        onChange={handleChange}
                        isInvalid={!!errors.end_time}
                    />
                    {errors.end_time?.map((message, idx) => (
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
                                onClick={() => setEventData({ ...eventData, banner: null, bannerPreview: '' })}
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
                        "Create Event"
                    )}
                </Button>
            </Form>
        </Container>
    );
};

export default EventCreateForm;
