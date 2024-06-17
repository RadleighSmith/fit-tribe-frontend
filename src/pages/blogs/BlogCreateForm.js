import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Alert, Image } from 'react-bootstrap';
import axios from 'axios';
import appStyles from '../../App.module.css';
import divider from '../../styles/Divider.module.css';
import formStyles from '../../styles/Form.module.css';
import btnStyles from '../../styles/Button.module.css';

const BlogCreateForm = () => {
    const [blogData, setBlogData] = useState({
        title: '',
        content: '',
        banner: null,
        image: null,
        bannerPreview: '',
        imagePreview: ''
    });

    const { title, content, banner, image, bannerPreview, imagePreview } = blogData;

    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = (event) => {
        setBlogData({
            ...blogData,
            [event.target.name]: event.target.value
        });
    };

    const handleImageChange = (event) => {
        const { name, files } = event.target;
        const file = files[0];
        setBlogData({
            ...blogData,
            [name]: file,
            [`${name}Preview`]: URL.createObjectURL(file)
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append('content', content);
        if (banner) {
            formData.append('banner', banner);
        }
        if (image) {
            formData.append('image', image);
        }

        try {
            await axios.post('/blogs/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            history.push('/blogs');
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Container className={appStyles.Content}>
            <h1 className="text-center">New Blog Entry</h1>
            <div className={divider.BlueDivider} />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        className={formStyles.Input}
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        isInvalid={!!errors.title}
                    />
                    {errors.title?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="banner">
                    <Form.Label>Cover Image:</Form.Label>
                    {bannerPreview && (
                        <div className="mb-3">
                            <Image src={bannerPreview} thumbnail />
                        </div>
                    )}
                    <Form.File
                        name="banner"
                        onChange={handleImageChange}
                        isInvalid={!!errors.banner}
                    />
                    {errors.banner?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="content">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        className={formStyles.Input}
                        as="textarea"
                        rows={6}
                        name="content"
                        value={content}
                        onChange={handleChange}
                        isInvalid={!!errors.content}
                    />
                    {errors.content?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="image">
                    <Form.Label>Image Upload:</Form.Label>
                    {imagePreview && (
                        <div className="mb-3">
                            <Image src={imagePreview} thumbnail />
                        </div>
                    )}
                    <Form.File
                        name="image"
                        onChange={handleImageChange}
                        isInvalid={!!errors.image}
                    />
                    {errors.image?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                {errors.non_field_errors?.map((message, idx) => (
                    <Alert key={idx} variant="warning">
                        {message}
                    </Alert>
                ))}

                <Button type="submit" className={`${btnStyles.Button} ${btnStyles.ButtonWide}`}>
                    Publish Now
                </Button>
            </Form>
        </Container>
    );
};

export default BlogCreateForm;
