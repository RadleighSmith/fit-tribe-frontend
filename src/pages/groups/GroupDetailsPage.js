import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner, Alert, Dropdown, Card, Badge, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import DOMPurify from 'dompurify';
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
  const [events, setEvents] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(`/group-events/?group=${id}`);
        setEvents(data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGroup();
    fetchEvents();
  }, [id]);

  const handleJoinGroup = async () => {
    try {
      await axios.post(`/groups/${id}/join/`);
      setGroup((prevGroup) => ({
        ...prevGroup,
        is_member: true,
      }));
    } catch (err) {
      console.error(err);
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
      console.error(err);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      await axios.delete(`/groups/${id}/`);
      history.push('/groups');
    } catch (err) {
      console.error(err);
    }
  };

  const formatDateTime = (date, time) => {
    const dateTime = `${date}T${time}`;
    const options = { 
      year: 'numeric', month: 'long', day: 'numeric', 
      hour: '2-digit', minute: '2-digit', hour12: true 
    };
    return new Date(dateTime).toLocaleString('en-US', options);
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Failed to load group details</Alert>;

  const handleCardClick = (eventId) => {
    history.push(`/groups/${id}/events/${eventId}`);
  };

  return (
    <Container className={`${appStyles.Content} pb-5 mt-3`}>
      {group && (
        <>
          <Row>
            <Col xs={12}>
              <Image src={group.banner} className={styles.BannerImage} fluid alt="Group banner" />
            </Col>
          </Row>
          <Row className="m-3 align-items-center">
            <Col xs={12} lg={8} className="d-flex align-items-center flex-column flex-lg-row">
              <Image src={group.group_logo} className={`${styles.GroupLogo} mb-3 mb-lg-0`} alt="Group logo" />
              <h1 className="m-2 text-center text-lg-left">{group.name}</h1>
            </Col>
            <Col xs={12} lg={4} className="text-lg-right pt-2 text-center text-lg-right">
              <span className={styles.DatePosted}>Created: {new Date(group.created_at).toLocaleDateString()}</span>
              {currentUser && currentUser.is_staff && (
                <Dropdown alignRight className="d-inline ml-2">
                  <Dropdown.Toggle variant="link" className={styles.DropdownToggle} aria-label="Group options">
                    <i className="fas fa-ellipsis-h"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={`/groups/${id}/edit`}>
                      Edit Group
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setShowDeleteModal(true)}>
                      Delete Group
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              <div className="mt-3">
                {group.is_member ? (
                  <Button 
                    variant="danger" 
                    onClick={handleLeaveGroup} 
                    className={`${btnStyles.ButtonRed} ${btnStyles.ButtonLarge}`}
                    aria-label={`Leave ${group.name}`}
                  >
                    Leave Group
                  </Button>
                ) : (
                  <Button 
                    variant="primary" 
                    onClick={handleJoinGroup} 
                    className={`${btnStyles.Button} ${btnStyles.ButtonLarge}`}
                    aria-label={`Join ${group.name}`}
                  >
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
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(group.description) }} />
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xs={12} className="text-center text-lg-left">
              <h2 className="mx-5">Upcoming Events</h2>
              {currentUser && (currentUser.is_superuser || currentUser.is_staff) && (
                <Link to={`/groups/${id}/create-event`}>
                  <Button className={`${btnStyles.Button} ${btnStyles.ButtonWide} my-4`}>
                    Create a New Event
                  </Button>
                </Link>
              )}
            </Col>
          </Row>
          <div className={divider.BlueDivider} />
          <Row>
            <Col>
              {events.length ? (
                events.map(event => (
                  <Card
                    key={event.id}
                    className={`${styles.EventCard} my-3 ${event.is_joined ? styles.JoinedEventCard : ''}`}
                    onClick={() => handleCardClick(event.id)}
                  >
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col xs={3} md={2} className="d-flex justify-content-center">
                          <i className="fa-regular fa-calendar fa-2x"></i>
                        </Col>
                        <Col xs={9} md={10}>
                          <h3>
                            {event.name} {event.is_joined && <Badge variant="success">Joined</Badge>}
                          </h3>
                          <p><strong>Location:</strong> {event.location}</p>
                          <p><strong>Start Time:</strong> {formatDateTime(event.start_date, event.start_time)}</p>
                          <p><strong>End Time:</strong> {formatDateTime(event.end_date, event.end_time)}</p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>There are currently no upcoming events.</p>
              )}
            </Col>
          </Row>
        </>
      )}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this group?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteGroup}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GroupDetailsPage;
