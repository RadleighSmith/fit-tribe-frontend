import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Dropdown, Overlay, Tooltip, Alert, Modal } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import BlogCommentCreateForm from '../../components/blogs/BlogCommentCreateForm';
import BlogComment from '../../components/blogs/BlogComment';
import InfiniteScroll from 'react-infinite-scroll-component';
import DOMPurify from 'dompurify';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import profileStyles from '../../styles/ProfilePicture.module.css';
import divider from '../../styles/Divider.module.css';
import styles from '../../styles/BlogDetailPage.module.css';
import { useRedirect } from '../../hooks/useRedirect';

const BlogDetailPage = () => {
    useRedirect('loggedOut');
    const { id } = useParams();
    const history = useHistory();
    const [blog, setBlog] = useState(null);
    const [blogErrors, setBlogErrors] = useState(null);
    const [commentsErrors, setCommentsErrors] = useState(null);
    const [comments, setComments] = useState({ results: [] });
    const [hasMore, setHasMore] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === blog?.owner;

    const defaultBlogImage = 'https://res.cloudinary.com/dn6vitvd4/image/upload/v1/fittribe_media/../default_post_eznpr6';

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axiosRes.get(`/blogs/${id}/`);
                setBlog(data);
            } catch (err) {
                setBlogErrors(err.response?.data);
            }
        };
        fetchBlog();
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const { data } = await axiosRes.get(`/blog-comments/?blog=${id}`);
                setComments(data);
                setHasMore(!!data.next);
            } catch (err) {
                setCommentsErrors(err.response?.data);
            }
        };
        fetchComments();
    }, [id]);

    const fetchMoreComments = async () => {
        if (hasMore) {
            try {
                const { data } = await axiosRes.get(comments.next);
                setComments((prevComments) => ({
                    ...prevComments,
                    results: [...prevComments.results, ...data.results]
                }));
                setHasMore(!!data.next);
            } catch (err) {
                setCommentsErrors(err.response?.data);
            }
        }
    };

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post('/blog-likes/', { blog: id });
            setBlog((prevBlog) => ({
                ...prevBlog,
                blog_likes_count: prevBlog.blog_likes_count + 1,
                blog_like_id: data.id
            }));
        } catch (err) {

        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/blog-likes/${blog.blog_like_id}/`);
            setBlog((prevBlog) => ({
                ...prevBlog,
                blog_likes_count: prevBlog.blog_likes_count - 1,
                blog_like_id: null
            }));
        } catch (err) {

        }
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/blogs/${id}/`);
            history.push('/blogs');
        } catch (err) {

        }
    };

    const [showTooltip, setShowTooltip] = useState(false);
    const likeButtonRef = useRef(null);

    if (blogErrors && blogErrors.detail) {
        return (
            <Container className={`${appStyles.Content} mt-3`}>
                <Alert variant="danger" className='mt-3'>
                    <p className='text-center'>{blogErrors.detail}</p>
                    <Button
                        className={`${btnStyles.Button} ${btnStyles.ButtonWide}`}
                        onClick={() => history.push('/blogs')}
                        aria-label="Go Back to Blogs"
                    >
                        Go Back to Blogs
                    </Button>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className={`${appStyles.Content} pb-5 mt-3`}>
            {blog && (
                <>
                    <Row>
                        <Col xs={12}>
                            <Image src={blog.banner} className={styles.BannerImage} alt="Blog Banner" />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs={12} md={8}>
                            <div className="d-flex align-items-center">
                                <Link to={`/profiles/${blog.profile_id}`} className={profileStyles.ProfileLink} aria-label={`Profile of ${blog.owner}`}>
                                    <Image src={blog.profile_image} roundedCircle className={profileStyles.ProfileImage} alt="Profile" />
                                    <span className={profileStyles.ProfileUsername}>{blog.owner}</span>
                                </Link>
                            </div>
                        </Col>
                        <Col xs={12} md={4} className="text-md-right pt-2">
                            <span className={styles.DatePosted}>Posted: {new Date(blog.created_at).toLocaleDateString()}</span>
                            {is_owner && (
                                <Dropdown alignRight className="d-inline ml-3">
                                    <Dropdown.Toggle variant="link" className={styles.DropdownToggle} aria-label="Edit or Delete Blog">
                                        <i className="fas fa-ellipsis-h"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to={`/blogs/${id}/edit`}>
                                            Edit
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => setShowDeleteModal(true)}>
                                            Delete
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <h1 className="text-center mt-3">{blog.title}</h1>
                            <div className={divider.BlueDivider} />
                            <div
                                className={`${styles.Content} m-md-4 p-3 border rounded`}
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(blog.content),
                                }}
                            />
                            {blog.image && blog.image !== defaultBlogImage && (
                                <div className="d-flex justify-content-center">
                                    <Image src={blog.image} className={`${styles.BlogImage} mt-3 mb-2`} alt="Blog" />
                                </div>
                            )}
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div className="d-flex align-items-center mb-4">
                                    {is_owner ? (
                                        <>
                                            <i
                                                ref={likeButtonRef}
                                                className={`fas fa-thumbs-up ${styles.Icon} ${styles.DisabledIcon}`}
                                                onMouseEnter={() => setShowTooltip(true)}
                                                onMouseLeave={() => setShowTooltip(false)}
                                                aria-hidden="true"
                                            ></i>
                                            <Overlay target={likeButtonRef.current} show={showTooltip} placement="top">
                                                {(props) => (
                                                    <Tooltip id="button-tooltip" {...props}>
                                                        You cannot like your own post.
                                                    </Tooltip>
                                                )}
                                            </Overlay>
                                        </>
                                    ) : (
                                        blog.blog_like_id ? (
                                            <i
                                                className={`fas fa-thumbs-up ${styles.Icon} ${styles.Liked}`}
                                                onClick={handleUnlike}
                                                aria-label="Unlike"
                                            ></i>
                                        ) : (
                                            <i
                                                className={`fas fa-thumbs-up ${styles.Icon}`}
                                                onClick={handleLike}
                                                aria-label="Like"
                                            ></i>
                                        )
                                    )}
                                    <span className={styles.IconCounter}>{blog.blog_likes_count}</span>
                                    <i className={`fas fa-comment ${styles.Icon} ml-3`} aria-hidden="true"></i>
                                    <span className={styles.IconCounter}>{blog.blog_comments_count}</span>
                                </div>
                            </div>
                            <BlogCommentCreateForm blogId={id} setComments={setComments} setBlog={setBlog} />
                            {commentsErrors && commentsErrors.detail ? (
                                <Alert variant="danger">
                                    <p>{commentsErrors.detail}</p>
                                </Alert>
                            ) : (
                                <InfiniteScroll
                                    dataLength={comments.results.length}
                                    next={fetchMoreComments}
                                    hasMore={hasMore}
                                    loader={<div className="loader" key={0}>Loading ...</div>}
                                >
                                    {comments.results.map((comment) => (
                                        <BlogComment key={comment.id} {...comment} setComments={setComments} setBlog={setBlog} />
                                    ))}
                                </InfiniteScroll>
                            )}
                        </Col>
                    </Row>
                </>
            )}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this blog post?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)} aria-label="Cancel">
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete} aria-label="Delete">
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default BlogDetailPage;