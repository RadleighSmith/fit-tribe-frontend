import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import appStyles from '../App.module.css';
import styles from '../styles/LoggedOutHomePage.module.css';
import divider from '../styles/Divider.module.css';
import btnStyles from '../styles/Button.module.css';
import heroImage from '../assets/hero_image.jpg';

const LoggedOutHomePage = () => {
    return (
        <div>
            <div className={styles.HeroSection}>
                <img src={heroImage} alt="Hero" className={styles.HeroImage} />
                <div className={styles.Overlay}>
                    <Container className="text-center">
                        <h1 className={styles.HeroTitle}>Join the FitTribe Community</h1>
                        <p className={styles.HeroText}>Connect with others, share your progress, and reach your fitness goals.</p>
                        <Link to="/signup">
                            <Button className={`${btnStyles.Button} ${btnStyles.ButtonLarge} m-2 m-md-4`}>
                                Sign Up
                            </Button>
                        </Link>
                        <Link to="/signin">
                            <Button className={`${btnStyles.Button} ${btnStyles.ButtonLarge} m-2 m-md-4`}>
                                Login
                            </Button>
                        </Link>
                    </Container>
                </div>
            </div>
            <Container className={`${styles.FeaturesSection} ${appStyles.Content} mt-5 mb-5`}>
                <h2 className={styles.SectionTitle}>Why you&apos;ll love FitTribe</h2>
                <div className={divider.OffWhiteDivider} />
                <ul className={styles.FeaturesList}>
                    <li className={`${styles.FeatureItem} ${styles.Item1}`}>
                        <i className="fas fa-dumbbell"></i>
                        <span className={styles.FeatureTitle}>Workout Sharing:</span>
                        <p>Post your workouts and get feedback from the community.</p>
                    </li>
                    <li className={`${styles.FeatureItem} ${styles.Item2}`}>
                        <i className="fas fa-blog"></i>
                        <span className={styles.FeatureTitle}>Fitness Blogs:</span>
                        <p>Write and read inspiring fitness stories and tips.</p>
                    </li>
                    <li className={`${styles.FeatureItem} ${styles.Item3}`}>
                        <i className="fas fa-users"></i>
                        <span className={styles.FeatureTitle}>Community Groups:</span>
                        <p>Join groups that match your fitness interests.</p>
                    </li>
                    <li className={`${styles.FeatureItem} ${styles.Item4}`}>
                        <i className="fas fa-comment-dots"></i>
                        <span className={styles.FeatureTitle}>Interactive Engagement:</span>
                        <p>Like, comment, and follow to stay motivated.</p>
                    </li>
                </ul>
                <div className={divider.OffWhiteDivider} />
                <div className="text-center">
                    <h2 className={styles.SectionTitle}>Still interested?</h2>
                    <Link to="/signup">
                        <Button className={`${btnStyles.Button} ${btnStyles.ButtonLarge} mt-4`}>
                            Join here
                        </Button>
                    </Link>
                </div>
            </Container>
        </div>
    );
};

export default LoggedOutHomePage;
