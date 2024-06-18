import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import styles from '../../styles/Comment.module.css';

const BlogCommentCreateForm = ({ blogId, setBlog, setComments }) => {
    const [comment, setComment] = useState("");

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
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
            setComment("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label className="d-none">Comment</Form.Label>
                <Form.Control
                    className={styles.CommentInput}
                    as="textarea"
                    value={comment}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Add a comment..."
                />
            </Form.Group>
            <Button
                className={styles.CommentButton}
                disabled={!comment.trim()}
                type="submit"
            >
                Post
            </Button>
        </Form>
    );
};

export default BlogCommentCreateForm;
