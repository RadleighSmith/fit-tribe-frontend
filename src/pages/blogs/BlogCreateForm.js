import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Alert, Image } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

    const handleContentChange = (content) => {
        setBlogData({
            ...blogData,
            content: content
        });
    };

    const {
        getRootProps: getRootPropsBanner,
        getInputProps: getInputPropsBanner,
        isDragActive: isDragActiveBanner
    } = useDropzone({
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            setBlogData({
                ...blogData,
                banner: file,
                bannerPreview: URL.createObjectURL(file)
            });
        },
        accept: 'image/*'
    });

    const {
        getRootProps: getRootPropsImage,
        getInputProps: getInputPropsImage,
        isDragActive: isDragActiveImage
    } = useDropzone({
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            setBlogData({
                ...blogData,
                image: file,
                imagePreview: URL.createObjectURL(file)
            });
        },
        accept: 'image/*'
    });

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
                        <div className="mb-3 position-relative">
                            <Image src={bannerPreview} thumbnail />
                            <Button
                                variant="danger"
                                size="sm"
                                className={`${formStyles.RemoveButton} position-absolute top-0 end-0`}
                                onClick={() => setBlogData({ ...blogData, banner: null, bannerPreview: '' })}
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

                <Form.Group controlId="content">
                    <Form.Label>Description:</Form.Label>
                    <ReactQuill
                        value={content}
                        onChange={handleContentChange}
                    />
                    {errors.content?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="image">
                    <Form.Label>Image Upload:</Form.Label>
                    {imagePreview && (
                        <div className="mb-3 position-relative">
                            <Image src={imagePreview} thumbnail />
                            <Button
                                variant="danger"
                                size="sm"
                                className={`${formStyles.RemoveButton} position-absolute top-0 end-0`}
                                onClick={() => setBlogData({ ...blogData, image: null, imagePreview: '' })}
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                    {!imagePreview && (
                        <div {...getRootPropsImage({ className: formStyles.Dropzone })}>
                            <input {...getInputPropsImage()} />
                            {
                                isDragActiveImage ?
                                    <p>Drop the file here ...</p> :
                                    <p>Drag and drop an image here, or click to select one</p>
                            }
                            <i className="fas fa-upload fa-2x"></i>
                        </div>
                    )}
                    {errors.image?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                {errors.non_field_errors?.map((message, idx) => (
                    <Alert key={idx} variant="warning">{message}</Alert>
                ))}
                
                <Button type="submit" className={`${btnStyles.Button} ${btnStyles.ButtonWide}`}>
                    Publish Now
                </Button>
            </Form>
        </Container>
    );
};

export default BlogCreateForm;
