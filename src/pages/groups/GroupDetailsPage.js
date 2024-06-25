import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner, Alert, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

const GroupDetailsPage = () => {
  const { id } = useParams();
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

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Failed to load group details</Alert>;

  return (
    <Container className={appStyles.Content}>
      <Row>
        <Col>
          <h1>{group.name}</h1>
          <Image src={group.banner} fluid />
          <p>{group.description}</p>
          <div>
            {group.is_member ? (
              <Button variant="danger" onClick={handleLeaveGroup} className={btnStyles.Button}>
                Leave Group
              </Button>
            ) : (
              <Button variant="primary" onClick={handleJoinGroup} className={btnStyles.Button}>
                Join Group
              </Button>
            )}
          </div>
          {currentUser && currentUser.is_staff && (
            <Dropdown className="mt-3">
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Admin Actions
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/groups/${id}/edit`}>Edit Group</Dropdown.Item>
                <Dropdown.Item onClick={() => console.log('Delete group functionality here')}>Delete Group</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2>Upcoming Events</h2>
          <p>Event list goes here...</p>
        </Col>
      </Row>
    </Container>
  );
};

export default GroupDetailsPage;
