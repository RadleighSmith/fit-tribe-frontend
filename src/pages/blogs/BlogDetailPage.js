import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
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

const BlogDetailPage = () => {
    const { id } = useParams();
    const history = useHistory();
    const [blog, setBlog] = useState(null);
    const [errors, setErrors] = useState(null);
    const [comments, setComments] = useState({ results: [] });
    const [hasMore, setHasMore] = useState(false);

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === blog?.owner;

    const defaultBlogImage = 'https://res.cloudinary.com/dn6vitvd4/image/upload/v1/fittribe_media/../default_post_eznpr6';

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axiosRes.get(`/blogs/${id}/`);
                setBlog(data);
            } catch (err) {
                setErrors(err.response?.data);
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
                setErrors(err.response?.data);
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
                setErrors(err.response?.data);
            }
        }
    };

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/blog-likes/", { blog: id });
            setBlog((prevBlog) => ({
                ...prevBlog,
                blog_likes_count: prevBlog.blog_likes_count + 1,
                blog_like_id: data.id
            }));
        } catch (err) {
            console.log(err);
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
            console.log(err);
        }
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/blogs/${id}/`);
            history.push('/blogs');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container className={`${appStyles.Content} pb-5 mt-3`}>
            {errors && <p className="text-danger">{errors.detail}</p>}
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
                        <Col xs={12} md={4} className="text-md-right pt-2">
                            <span className={styles.DatePosted}>Posted: {new Date(blog.created_at).toLocaleDateString()}</span>
                            {is_owner && (
                                <Dropdown alignRight className="d-inline ml-3">
                                    <Dropdown.Toggle variant="link" className={styles.DropdownToggle}>
                                        <i className="fas fa-ellipsis-h"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to={`/blogs/${id}/edit`}>
                                            Edit
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={handleDelete}>
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
                                className={`${styles.Content} m-md-4 p-3  border rounded`}
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(blog.content),
                                }}
                            />
                            {blog.image && blog.image !== defaultBlogImage && (
                                <div className="d-flex justify-content-center">
                                    <Image src={blog.image} className={`${styles.BlogImage} mt-3 mb-2`} />
                                </div>
                            )}
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div className="d-flex align-items-center mb-4">
                                    {is_owner ? (
                                        <OverlayTrigger
                                            placement="top"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={<Tooltip id="button-tooltip">You cannot like your own post.</Tooltip>}
                                        >
                                            <i className={`fas fa-thumbs-up ${styles.Icon} ${styles.DisabledIcon}`}></i>
                                        </OverlayTrigger>
                                    ) : (
                                        blog.blog_like_id ? (
                                            <i className={`fas fa-thumbs-up ${styles.Icon} ${styles.Liked}`} onClick={handleUnlike}></i>
                                        ) : (
                                            <i className={`fas fa-thumbs-up ${styles.Icon}`} onClick={handleLike}></i>
                                        )
                                    )}
                                    <span className={styles.IconCounter}>{blog.blog_likes_count}</span>
                                    <i className={`fas fa-comment ${styles.Icon} ml-3`}></i>
                                    <span className={styles.IconCounter}>{blog.blog_comments_count}</span>
                                </div>
                            </div>
                            <BlogCommentCreateForm blogId={id} setComments={setComments} setBlog={setBlog} />
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
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default BlogDetailPage;
