import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import BlogCard from './blogs/BlogCard';
import appStyles from '../App.module.css';
import divider from  '../styles/Divider.module.css';

const LoggedInHomePage = () => {
    const [blogs, setBlogs] = useState([]);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axiosReq.get('/feed/');
                setBlogs(data.results);
            } catch (err) {
                setErrors(err.response?.data);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <Container className={appStyles.Content}>
            <div className="text-center p-3">
                <h1>Welcome Back!</h1>
                <p>Here is your personalized feed content.</p>
                {errors && <p>{errors}</p>}
                <hr className={divider.BlueDivider}/>
            </div>
            {Array.isArray(blogs) && blogs.length > 0 ? (
                blogs.map(blog => (
                    <div key={blog.id} className="mb-4">
                        <BlogCard blog={blog} setBlogs={setBlogs} />
                    </div>
                ))
            ) : (
                <div className="text-center">
                    <p>No blog posts from your followed users yet, or you aren&apos;t following anyone yet.</p>
                </div>
            )}
        </Container>
    );
};

export default LoggedInHomePage;
