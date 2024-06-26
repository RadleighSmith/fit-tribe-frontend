import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import appStyles from '../../App.module.css';
import divider from '../../styles/Divider.module.css';
import styles from '../../styles/BlogsPage.module.css';
import BlogCard from '../../components/blogs/BlogCard';
import btnStyles from '../../styles/Button.module.css';
import { useRedirect } from '../../hooks/useRedirect';

const BlogsPage = () => {
    useRedirect('loggedOut');
    const [blogs, setBlogs] = useState([]);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axiosRes.get('/blogs/');
                setBlogs(response.data.results);
            } catch (err) {
                setErrors(err.response?.data);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <Container className={appStyles.Content}>
            <Row>
                <Col className="text-center p-3">
                    <h1 className={styles.Title}>Blogs</h1>
                    {errors && <p className="text-danger">{errors.detail}</p>}
                    <hr className={divider.BlueDivider} />
                    <Link to="/create-blog">
                        <Button className={`${btnStyles.Button} ${btnStyles.ButtonWide} mt-4`}>Create a New Blog</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                {Array.isArray(blogs) && blogs.map((blog) => (
                    <Col key={blog.id} xs={12} className="mt-4">
                        <BlogCard blog={blog} setBlogs={setBlogs} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default BlogsPage;
