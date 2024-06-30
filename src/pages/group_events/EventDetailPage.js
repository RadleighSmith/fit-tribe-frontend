import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner, Alert, Dropdown, Modal } from 'react-bootstrap';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import divider from '../../styles/Divider.module.css';
import styles from '../../styles/EventDetailPage.module.css';

const EventDetailPage = () => {
  const { groupId, eventId } = useParams();
  const history = useHistory();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`/group-events/${eventId}/`);
        setEvent(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleJoinEvent = async () => {
    try {
      await axios.post(`/group-events/${eventId}/join/`);
      setEvent((prevEvent) => ({
        ...prevEvent,
        is_joined: true,
      }));
    } catch (err) {
      // Handle error if needed
    }
  };

  const handleLeaveEvent = async () => {
    try {
      await axios.post(`/group-events/${eventId}/leave/`);
      setEvent((prevEvent) => ({
        ...prevEvent,
        is_joined: false,
      }));
    } catch (err) {
      // Handle error if needed
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`/group-events/${eventId}/`);
      history.push(`/groups/${event.group}`);
    } catch (err) {
      // Handle error if needed
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Failed to load event details</Alert>;

  const formatDateTime = (dateTime) => {
    const options = { 
      year: 'numeric', month: 'long', day: 'numeric', 
      hour: '2-digit', minute: '2-digit', hour12: true 
    };
    return new Date(dateTime).toLocaleString('en-US', options);
  };

  return (
    <Container className={`${appStyles.Content} pb-5 mt-3`}>
      {event && (
        <>
          <Row>
            <Col xs={12}>
              {event.banner && (
                <Image src={event.banner} className={`${styles.BannerImage} img-fluid`} alt="Event banner" />
              )}
            </Col>
          </Row>
          <Row className="m-3 align-items-center">
            <Col xs={12} lg={8} className="text-center text-lg-left">
              <h1 className={`m-2 ${styles.EventTitle}`}>{event.name}</h1>
            </Col>
            <Col xs={12} lg={4} className="text-center text-lg-right pt-2">
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-end">
                {event.is_joined ? (
                  <Button 
                    variant="danger" 
                    onClick={handleLeaveEvent} 
                    className={`${btnStyles.ButtonRed} ${btnStyles.ButtonLarge} mx-2 my-2 my-lg-0`}
                    aria-label="Leave Event"
                  >
                    Leave Event
                  </Button>
                ) : (
                  <Button 
                    variant="primary" 
                    onClick={handleJoinEvent} 
                    className={`${btnStyles.Button} ${btnStyles.ButtonLarge} mx-2 my-2 my-lg-0`}
                    aria-label="Join Event"
                  >
                    Join Event
                  </Button>
                )}
                {currentUser && currentUser.is_staff && (
                  <Dropdown alignRight className="d-inline mx-2 my-2 my-lg-0">
                    <Dropdown.Toggle variant="link" className={styles.DropdownToggle} aria-label="More options">
                      <i className="fas fa-ellipsis-h"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to={`/groups/${groupId}/events/${eventId}/edit`}>
                        Edit Event
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setShowDeleteModal(true)}>
                        Delete Event
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            </Col>
          </Row>
          <div className={divider.BlueDivider} />
          <Row className="mt-3">
            <Col xs={12} className="text-center">
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Start Time:</strong> {formatDateTime(event.start_date + 'T' + event.start_time)}</p>
              <p><strong>End Time:</strong> {formatDateTime(event.end_date + 'T' + event.end_time)}</p>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12}>
              <div className={divider.OffWhiteDivider} />
              <div className={`${styles.Content} m-lg-4 p-3 border rounded`}>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.description) }} />
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12} className="text-center">
              <Button 
                variant="secondary" 
                onClick={() => history.push(`/groups/${event.group}`)} 
                className={`${btnStyles.Button} ${btnStyles.ButtonWide}`}
                aria-label="Return to Group"
              >
                Return to Group
              </Button>
            </Col>
          </Row>
        </>
      )}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this event?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)} aria-label="Cancel delete event">
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteEvent} aria-label="Delete event">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EventDetailPage;
