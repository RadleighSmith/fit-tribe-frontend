import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import styles from '../../styles/Comment.module.css';
import btnStyles from '../../styles/Button.module.css';

const BlogCommentCreateForm = ({ blogId, setBlog, setComments }) => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setComment(event.target.value);
        setError('');  // Clear error message when user types
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!comment.trim()) {
            setError('Comment cannot be empty.');
            return;
        }
        try {
            const { data } = await axiosRes.post('/blog-comments/', {
                comment,
                blog: blogId
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: [data, ...prevComments.results],
            }));
            setBlog((prevBlog) => ({
                ...prevBlog,
                blog_comments_count: prevBlog.blog_comments_count + 1,
            }));
            setComment('');
        } catch (err) {

        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className='m-md-4'>
                <Form.Label className="d-none">Comment</Form.Label>
                <Form.Control
                    className={styles.CommentInput}
                    as="textarea"
                    value={comment}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Add a comment..."
                />
            </Form.Group>
            {error && <Alert variant="warning" className="ml-md-4">{error}</Alert>}
            <Button
                className={`${btnStyles.Button} ml-md-4`}
                type="submit"
            >
                Post
            </Button>
        </Form>
    );
};

export default BlogCommentCreateForm;
