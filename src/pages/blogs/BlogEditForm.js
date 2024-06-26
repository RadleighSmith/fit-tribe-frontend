import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Button, Container, Alert, Image, Spinner } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import appStyles from '../../App.module.css';
import divider from '../../styles/Divider.module.css';
import formStyles from '../../styles/Form.module.css';
import btnStyles from '../../styles/Button.module.css';
import { useRedirect } from '../../hooks/useRedirect';

const BlogEditForm = () => {
    useRedirect('loggedOut');
    const { id } = useParams();
    const history = useHistory();
    const currentUser = useCurrentUser();
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
    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchBlogData = async () => {
            try {
                const { data } = await axiosReq.get(`/blogs/${id}/`);
                if (currentUser?.username !== data.owner) {
                    if (isMounted) {
                        setAlert('You are not authorized to edit this blog post.');
                        setTimeout(() => {
                            history.push('/blogs');
                        }, 3000);
                    }
                } else {
                    setBlogData({
                        title: data.title,
                        content: data.content,
                        banner: null,
                        image: null,
                        bannerPreview: data.banner,
                        imagePreview: data.image
                    });
                }
            } catch (err) {
                if (isMounted) {
                    if (err.response?.status === 404) {
                        setNotFound(true);
                    } else {
                        setErrors(err.response?.data);
                    }
                }
            }
        };
        fetchBlogData();
        return () => {
            isMounted = false;
        };
    }, [id, currentUser, history]);

    const handleChange = (event) => {
        setBlogData({
            ...blogData,
            [event.target.name]: event.target.value
        });
    };

    const handleContentChange = (value) => {
        setBlogData({
            ...blogData,
            content: value
        });
    };

    const bannerDropzone = useDropzone({
        onDrop: acceptedFiles => {
            const file = acceptedFiles[0];
            setBlogData(prev => ({
                ...prev,
                banner: file,
                bannerPreview: URL.createObjectURL(file)
            }));
        },
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    });

    const imageDropzone = useDropzone({
        onDrop: acceptedFiles => {
            const file = acceptedFiles[0];
            setBlogData(prev => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file)
            }));
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
        formData.append('title', title);
        formData.append('content', content);
        if (banner) formData.append('banner', banner);
        if (image) formData.append('image', image);

        try {
            await axiosReq.put(`/blogs/${id}/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setLoading(false);
            history.push('/blogs');
        } catch (err) {
            setErrors(err.response?.data);
            setLoading(false);
        }
    };

    if (alert) {
        return (
            <Container className={appStyles.Content}>
                <Alert variant="danger">{alert}</Alert>
                <Button
                    className={`${btnStyles.Button} ${btnStyles.ButtonWide}`}
                    onClick={() => history.push('/blogs')}
                    aria-label="Go Back"
                >
                    Go Back
                </Button>
            </Container>
        );
    }

    if (notFound) {
        return (
            <Container className={appStyles.Content}>
                <Alert variant="danger" className='text-center'>Blog not found.</Alert>
                <Button
                    className={`${btnStyles.Button} ${btnStyles.ButtonWide}`}
                    onClick={() => history.push('/blogs')}
                    aria-label="Go Back to Blogs"
                >
                    Go Back to Blogs
                </Button>
            </Container>
        );
    }

    return (
        <Container className={appStyles.Content}>
            <h1 className="text-center">Edit Blog Entry</h1>
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
                            <Image src={bannerPreview} fluid alt="Banner Preview" />
                        </div>
                    )}
                    <div {...bannerDropzone.getRootProps({ className: formStyles.Dropzone })}>
                        <input {...bannerDropzone.getInputProps()} />
                        <p>Drag and drop a banner image here, or click to select one</p>
                        <i className="fas fa-upload fa-2x" aria-hidden="true"></i>
                    </div>
                    {errors.banner?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                <Form.Group controlId="content">
                    <Form.Label>Description:</Form.Label>
                    <ReactQuill
                        className={formStyles.Input}
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
                            <Image src={imagePreview} fluid alt="Image Preview" />
                        </div>
                    )}
                    <div {...imageDropzone.getRootProps({ className: formStyles.Dropzone })}>
                        <input {...imageDropzone.getInputProps()} />
                        <p>Drag and drop an image here, or click to select one</p>
                        <i className="fas fa-upload fa-2x" aria-hidden="true"></i>
                    </div>
                    {errors.image?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                </Form.Group>

                {errors.non_field_errors?.map((message, idx) => (
                    <Alert key={idx} variant="warning">{message}</Alert>
                ))}

                <Button type="submit" className={`${btnStyles.Button} ${btnStyles.ButtonWide}`} disabled={loading} aria-label="Update Blog">
                    {loading ? (
                        <>
                            <Spinner animation="border" size="sm" role="status" className="mr-2" />
                            Submitting...
                        </>
                    ) : (
                        'Update'
                    )}
                </Button>
            </Form>
        </Container>
    );
};

export default BlogEditForm;
