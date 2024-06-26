import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Overlay, Tooltip } from 'react-bootstrap';
import DOMPurify from 'dompurify';
import { axiosRes } from '../../api/axiosDefaults';
import appStyles from '../../App.module.css';
import styles from '../../styles/BlogCard.module.css';
import profileStyles from '../../styles/ProfilePicture.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const BlogCard = ({ blog, setBlogs }) => {
    const currentUser = useCurrentUser();
    const isOwner = currentUser?.username === blog.owner;
    const defaultBlogImage = 'https://res.cloudinary.com/dn6vitvd4/image/upload/v1/fittribe_media/../default_post_eznpr6';
    const [showTooltip, setShowTooltip] = useState(false);
    const target = useRef(null);

    const sanitizedContent = DOMPurify.sanitize(blog.content);

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post('/blog-likes/', { blog: blog.id });
            setBlogs((prevBlogs) =>
                prevBlogs.map((prevBlog) =>
                    prevBlog.id === blog.id
                        ? { ...prevBlog, blog_likes_count: (prevBlog.blog_likes_count || 0) + 1, blog_like_id: data.id }
                        : prevBlog
                )
            );
        } catch (err) {

        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/blog-likes/${blog.blog_like_id}/`);
            setBlogs((prevBlogs) =>
                prevBlogs.map((prevBlog) =>
                    prevBlog.id === blog.id
                        ? { ...prevBlog, blog_likes_count: (prevBlog.blog_likes_count || 0) - 1, blog_like_id: null }
                        : prevBlog
                )
            );
        } catch (err) {

        }
    };

    return (
        <Card className={appStyles.Content}>
            <Card.Body>
                <div className={styles.BlogHeader}>
                    <Link to={`/profiles/${blog.profile_id}`} aria-label={`Profile of ${blog.owner}`}>
                        <Image
                            src={blog.profile_image}
                            roundedCircle
                            className={profileStyles.ProfileImage}
                            alt={`Profile picture of ${blog.owner}`}
                        />
                    </Link>
                    <div className={styles.BlogInfo}>
                        <Card.Title className={styles.Title}>{blog.title}</Card.Title>
                        <div className={styles.OwnerAndDate}>
                            <Link to={`/profiles/${blog.profile_id}`} className={profileStyles.ProfileLink} aria-label={`Profile of ${blog.owner}`}>
                                <span className={styles.OwnerName}>{blog.owner}</span>
                            </Link>
                            <span className={styles.DatePosted}>{blog.created_at}</span>
                        </div>
                    </div>
                </div>
                <Card.Text as="div">
                    <div dangerouslySetInnerHTML={{ __html: sanitizedContent.slice(0, 400) + '...' }}></div>
                    <Link to={`/blogs/${blog.id}`} className={styles.Link} aria-label={`Read more about ${blog.title}`}>Read More</Link>
                </Card.Text>
                {blog.image && blog.image !== defaultBlogImage && (
                    <Card.Img variant="bottom" src={blog.image} className={styles.BlogImage} alt={`Image for blog titled ${blog.title}`} />
                )}
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex align-items-center">
                        {isOwner ? (
                            <div ref={target} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
                                <i className={`fas fa-thumbs-up ${styles.Icon} ${styles.DisabledIcon}`}></i>
                                <Overlay target={target.current} show={showTooltip} placement="top">
                                    {(props) => (
                                        <Tooltip id="overlay-tooltip" {...props}>
                                            You cannot like your own post.
                                        </Tooltip>
                                    )}
                                </Overlay>
                            </div>
                        ) : (
                            blog.blog_like_id ? (
                                <i className={`fas fa-thumbs-up ${styles.Icon} ${styles.Liked}`} onClick={handleUnlike}></i>
                            ) : (
                                <i className={`fas fa-thumbs-up ${styles.Icon}`} onClick={handleLike}></i>
                            )
                        )}
                        <span className={styles.IconCounter}>{blog.blog_likes_count || 0}</span>
                        <i className={`fas fa-comment ${styles.Icon} ml-3`}></i>
                        <span className={styles.IconCounter}>{blog.blog_comments_count || 0}</span>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default BlogCard;
