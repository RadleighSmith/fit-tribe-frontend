import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';
import DOMPurify from 'dompurify';
import appStyles from '../../App.module.css';
import styles from '../../styles/BlogCard.module.css';

const BlogCard = ({ blog }) => {
    const defaultBlogImage = 'https://res.cloudinary.com/dn6vitvd4/image/upload/v1/fittribe_media/../default_post_eznpr6';

    const sanitizedContent = DOMPurify.sanitize(blog.content);

    return (
        <Card className={appStyles.Content}>
            <Card.Body>
                <div className={styles.BlogHeader}>
                    <Image src={blog.profile_image} roundedCircle className={styles.ProfileImage} />
                    <div className={styles.BlogInfo}>
                        <Card.Title className={styles.Title}>{blog.title}</Card.Title>
                        <div className={styles.OwnerAndDate}>
                            <span className={styles.OwnerName}>{blog.owner}</span>
                            <span className={styles.DatePosted}>{blog.created_at}</span>
                        </div>
                    </div>
                </div>
                <Card.Text>
                    <div dangerouslySetInnerHTML={{ __html: sanitizedContent.slice(0, 400) + '...' }}></div>
                    <Link to={`/blogs/${blog.id}`}>Read More</Link>
                </Card.Text>
                {blog.image && blog.image !== defaultBlogImage && (
                    <Card.Img variant="bottom" src={blog.image} className={styles.BlogImage} />
                )}
            </Card.Body>
        </Card>
    );
};

export default BlogCard;
