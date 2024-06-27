import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner, Alert, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import divider from '../../styles/Divider.module.css';
import styles from '../../styles/GroupDetailsPage.module.css';
import { useRedirect } from '../../hooks/useRedirect';

const GroupDetailsPage = () => {
  useRedirect('loggedOut');
  const { id } = useParams();
  const history = useHistory();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const { data } = await axios.get(`/groups/${id}/`);
        setGroup(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id]);

  const handleJoinGroup = async () => {
    try {
      await axios.post(`/groups/${id}/join/`);
      setGroup((prevGroup) => ({
        ...prevGroup,
        is_member: true,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await axios.post(`/groups/${id}/leave/`);
      setGroup((prevGroup) => ({
        ...prevGroup,
        is_member: false,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      await axios.delete(`/groups/${id}/`);
      history.push('/groups');
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Failed to load group details</Alert>;

  return (
    <Container className={`${appStyles.Content} pb-5 mt-3`}>
      {group && (
        <>
          <Row>
            <Col xs={12}>
              <Image src={group.banner} className={styles.BannerImage} fluid />
            </Col>
          </Row>
          <Row className="m-3 align-items-center">
            <Col xs={12} lg={8} className="d-flex align-items-center">
              <Image src={group.group_logo} className={styles.GroupLogo} />
              <h1 className='m-2'>{group.name}</h1>
            </Col>
            <Col xs={12} lg={4} className="text-lg-right pt-2">
              <span className={styles.DatePosted}>Created: {new Date(group.created_at).toLocaleDateString()}</span>
              {currentUser && currentUser.is_staff && (
                <Dropdown alignRight className="d-inline">
                  <Dropdown.Toggle variant="link" className={styles.DropdownToggle}>
                    <i className="fas fa-ellipsis-h"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={`/groups/${id}/edit`}>
                      Edit Group
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleDeleteGroup}>
                      Delete Group
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              <div className="mt-3">
                {group.is_member ? (
                  <Button variant="danger" onClick={handleLeaveGroup} className={`${btnStyles.ButtonRed} ${btnStyles.ButtonLarge}`}>
                    Leave Group
                  </Button>
                ) : (
                  <Button variant="primary" onClick={handleJoinGroup} className={`${btnStyles.Button} ${btnStyles.ButtonLarge}`}>
                    Join Group
                  </Button>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className={divider.BlueDivider} />
              <div className={`${styles.Content} m-md-4 p-3 border rounded`}>
                <p>{group.description}</p>
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <h2>Upcoming Events</h2>
              <p>Event list goes here...</p>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default GroupDetailsPage;
