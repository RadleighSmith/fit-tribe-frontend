import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Tooltip, OverlayTrigger, Form } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import profileStyles from '../../styles/ProfilePicture.module.css';
import divider from '../../styles/Divider.module.css';
import styles from '../../styles/BlogDetailPage.module.css';
import BlogComment from '../../components/BlogComment';

const BlogDetailPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [nextPage, setNextPage] = useState("");
    const [commentContent, setCommentContent] = useState("");
    const [commentErrors, setCommentErrors] = useState({});
    const [errors, setErrors] = useState(null);
    const [isLiking, setIsLiking] = useState(false);

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
                setComments(data.results);
                setNextPage(data.next);
                setHasMore(!!data.next);
            } catch (err) {
                setErrors(err.response?.data);
            }
        };
        fetchComments();
    }, [id]);

    const fetchMoreComments = async () => {
        if (nextPage) {
            try {
                const { data } = await axiosRes.get(nextPage);
                setComments((prevComments) => [...prevComments, ...data.results]);
                setNextPage(data.next);
                setHasMore(!!data.next);
            } catch (err) {
                setErrors(err.response?.data);
            }
        }
    };

    const handleLike = async () => {
        setIsLiking(true);
        try {
            const { data } = await axiosRes.post("/blog-likes/", { blog: id });
            setBlog((prevBlog) => ({
                ...prevBlog,
                blog_likes_count: prevBlog.blog_likes_count + 1,
                blog_like_id: data.id
            }));
        } catch (err) {
            console.log(err);
        } finally {
            setIsLiking(false);
        }
    };

    const handleUnlike = async () => {
        setIsLiking(true);
        try {
            await axiosRes.delete(`/blog-likes/${blog.blog_like_id}/`);
            setBlog((prevBlog) => ({
                ...prevBlog,
                blog_likes_count: prevBlog.blog_likes_count - 1,
                blog_like_id: null
            }));
        } catch (err) {
            console.log(err);
        } finally {
            setIsLiking(false);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosRes.post("/blog-comments/", { blog: id, comment: commentContent });
            setComments((prevComments) => [data, ...prevComments]);
            setCommentContent("");
            setCommentErrors({});
        } catch (err) {
            setCommentErrors(err.response?.data);
        }
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            You cannot like your own post.
        </Tooltip>
    );

    if (errors) {
        return <p className="text-danger">{errors.detail}</p>;
    }

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
                                    {is_owner ? (
                                        <OverlayTrigger
                                            placement="top"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltip}
                                        >
                                            <i className={`fas fa-thumbs-up ${styles.Icon} ${styles.DisabledIcon}`}></i>
                                        </OverlayTrigger>
                                    ) : (
                                        blog.blog_like_id ? (
                                            <i className={`fas fa-thumbs-up ${styles.Icon} ${styles.Liked}`} onClick={handleUnlike} disabled={isLiking}></i>
                                        ) : (
                                            <i className={`fas fa-thumbs-up ${styles.Icon}`} onClick={handleLike} disabled={isLiking}></i>
                                        )
                                    )}
                                    <span className={styles.IconCounter}>{blog.blog_likes_count}</span>
                                    <i className={`fas fa-comment ${styles.Icon} ml-3`}></i>
                                    <span className={styles.IconCounter}>{blog.blog_comments_count}</span>
                                </div>
                            </div>
                            <hr className={divider.BlueDivider} />
                            <div className="mt-4">
                                <h3>Comments</h3>
                                {currentUser && (
                                    <Form onSubmit={handleCommentSubmit}>
                                        <Form.Group>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control 
                                                as="textarea" 
                                                rows={3}
                                                value={commentContent}
                                                onChange={(e) => setCommentContent(e.target.value)}
                                                isInvalid={!!commentErrors.comment}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {commentErrors.comment}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Button type="submit" className={`${btnStyles.Button} ${btnStyles.ButtonWide}`}>
                                            Post Comment
                                        </Button>
                                    </Form>
                                )}
                                <InfiniteScroll
                                    dataLength={comments.length}
                                    next={fetchMoreComments}
                                    hasMore={hasMore}
                                    loader={<h4>Loading...</h4>}
                                    endMessage={<p>End of comments</p>}
                                >
                                    {comments.map((comment) => (
                                        <BlogComment key={comment.id} {...comment} />
                                    ))}
                                </InfiniteScroll>
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default BlogDetailPage;
