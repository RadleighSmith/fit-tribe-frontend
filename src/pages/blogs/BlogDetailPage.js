import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import profileStyles from '../../styles/ProfilePicture.module.css'
import divider from '../../styles/Divider.module.css';
import styles from '../../styles/BlogDetailPage.module.css';

const BlogDetailPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [errors, setErrors] = useState(null);

    const defaultBlogImage = 'https://res.cloudinary.com/dn6vitvd4/image/upload/v1/fittribe_media/../default_post_eznpr6';

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`/blogs/${id}/`);
                setBlog(response.data);
            } catch (err) {
                setErrors(err.response?.data);
            }
        };

        fetchBlog();
    }, [id]);

    if (errors) {
        return <p className="text-danger">{errors.detail}</p>;
    }

    return (
        <Container className={`${appStyles.Content} pb-5 mt-3`}>
            {blog && (
                <>
                    <Row>
                        <Col xs={12}>
                            <Image src={blog.banner} className={styles.BannerImage} />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs={12} md={8}>
                            <div className="d-flex align-items-center">
                                <Link to={`/profiles/${blog.profile_id}`} className={profileStyles.ProfileLink}>
                                    <Image src={blog.profile_image} roundedCircle className={profileStyles.ProfileImage} />
                                    <span className={profileStyles.ProfileUsername}>{blog.owner}</span>
                                </Link>
                                <Button className={`${btnStyles.Button} ${btnStyles.ButtonSmall} ml-3`}>Follow</Button>
                            </div>
                        </Col>
                        <Col xs={12} md={4} className="text-md-right">
                            <span className={styles.DatePosted}>Posted: {new Date(blog.created_at).toLocaleDateString()}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <h1 className="text-center mt-3">{blog.title}</h1>
                            <div className={divider.BlueDivider} />
                            <p className={styles.Content}>{blog.content}</p>

                            {blog.image && blog.image !== defaultBlogImage && (
                                <div className="d-flex justify-content-center">
                                    <Image src={blog.image} className={`${styles.BlogImage} mt-3 mb-2`} />
                                </div>
                            )}
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div className="d-flex align-items-center">
                                    <i className={`fas fa-thumbs-up ${styles.Icon}`}></i>
                                    <span className={styles.IconCounter}>{blog.blog_likes_count}</span>
                                    <i className={`fas fa-comment ${styles.Icon} ml-3`}></i>
                                    <span className={styles.IconCounter}>{blog.blog_comments_count}</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default BlogDetailPage;


