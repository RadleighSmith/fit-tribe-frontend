import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import styles from '../../styles/Comment.module.css';

const BlogEditComment = ({ id, comment, setComments, setShowEditForm }) => {
    const [formComment, setFormComment] = useState(comment);

    const handleChange = (event) => {
        setFormComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosRes.put(`/blog-comments/${id}/`, {
                comment: formComment,
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.map((comment) => {
                    return comment.id === id ? data : comment;
                }),
            }));
            setShowEditForm(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className={styles.EditForm}>
            <Form.Group>
                <Form.Label className="d-none">Edit Comment</Form.Label>
                <Form.Control
                    as="textarea"
                    value={formComment}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
            <div className="text-right">
                <Button
                    className={styles.EditButton}
                    disabled={!formComment.trim()}
                    type="submit"
                >
                    Save
                </Button>
                <Button
                    className={styles.CancelButton}
                    onClick={() => setShowEditForm(false)}
                >
                    Cancel
                </Button>
            </div>
        </Form>
    );
};

export default BlogEditComment;
