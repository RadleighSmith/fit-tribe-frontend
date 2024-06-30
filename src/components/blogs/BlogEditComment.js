import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import btnStyles from '../../styles/Button.module.css';

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

        }
    };

    return (
        <Form onSubmit={handleSubmit} className='mx-md-4 my-3'>
            <Form.Group>
                <Form.Label className="d-none">Edit Comment</Form.Label>
                <Form.Control
                    as="textarea"
                    value={formComment}
                    onChange={handleChange}
                    rows={5}
                />
            </Form.Group>
            <div className="text-right">
                <Button
                    className={`${btnStyles.Button}`}
                    disabled={!formComment.trim()}
                    type="submit"
                >
                    Save
                </Button>
                <Button
                    className={`${btnStyles.ButtonGrey} ml-2`}
                    onClick={() => setShowEditForm(false)}
                >
                    Cancel
                </Button>
            </div>
        </Form>
    );
};

export default BlogEditComment;
