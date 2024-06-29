import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Button, Container, Alert, Image } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

import appStyles from '../../App.module.css';
import formStyles from '../../styles/Form.module.css';
import btnStyles from '../../styles/Button.module.css';
import { useRedirect } from '../../hooks/useRedirect';

const EventCreateForm = () => {
    useRedirect('loggedOut');
    const { id } = useParams();
    const history = useHistory();
    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        location: '',
        start_date: '',
        start_time: '',
        end_date: '',
        end_time: '',
        banner: null,
        bannerPreview: '',
        group: id
    });

    const { name, description, location, start_date, start_time, end_date, end_time, banner, bannerPreview, group } = eventData;
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDescriptionChange = (value) => {
        setEventData((prevData) => ({
            ...prevData,
            description: value
        }));
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setEventData((prevData) => ({
            ...prevData,
            banner: file,
            bannerPreview: URL.createObjectURL(file)
        }));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('start_date', start_date);
        formData.append('start_time', start_time);
        formData.append('end_date', end_date);
        formData.append('end_time', end_time);
        formData.append('group', group);
        if (banner) formData.append('banner', banner);

        try {
            await axios.post('/group-events/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            history.push(`/groups/${group}`);
        } catch (err) {
            setErrors(err.response?.data);
            console.error('Error response:', err.response?.data);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className={appStyles.Content}>
            <h1 className="text-center">Create Event</h1>
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
                    <ReactQuill
                        value={description}
                        onChange={handleDescriptionChange}
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

                <Form.Group controlId="start_date">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        className={formStyles.Input}
                        type="date"
                        name="start_date"
                        value={start_date}
                        onChange={handleChange}
                        isInvalid={!!errors.start_date}
                    />
                    {errors.start_date?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="start_time">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                        className={formStyles.Input}
                        type="time"
                        name="start_time"
                        value={start_time}
                        onChange={handleChange}
                        isInvalid={!!errors.start_time}
                    />
                    {errors.start_time?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="end_date">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        className={formStyles.Input}
                        type="date"
                        name="end_date"
                        value={end_date}
                        onChange={handleChange}
                        isInvalid={!!errors.end_date}
                    />
                    {errors.end_date?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="end_time">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                        className={formStyles.Input}
                        type="time"
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
                    <Form.Label>Banner</Form.Label>
                    {bannerPreview && (
                        <div className="mb-3 text-center">
                            <Image src={bannerPreview} rounded fluid />
                        </div>
                    )}
                    <div {...getRootProps({ className: formStyles.Dropzone })}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Drop the files here ...</p>
                        ) : (
                            <p>Drag 'n' drop a banner image here, or click to select one</p>
                        )}
                        <i className="fas fa-upload fa-2x"></i>
                    </div>
                    {errors.banner?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Button
                    className={`${btnStyles.Button} ${btnStyles.ButtonWide} mt-3`}
                    type="submit"
                    disabled={submitting}
                >
                    {submitting ? 'Submitting...' : 'Create Event'}
                </Button>
            </Form>
        </Container>
    );
};

export default EventCreateForm;
