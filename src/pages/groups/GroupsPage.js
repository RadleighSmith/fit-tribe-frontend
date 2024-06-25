import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Spinner,
  Alert,
} from 'react-bootstrap';
import axios from 'axios';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import appStyles from '../../App.module.css';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const { data } = await axios.get('/groups/');
        setGroups(data.results);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleJoinGroup = async (groupId) => {
    try {
      await axios.post(`/groups/${groupId}/join/`);
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId ? { ...group, is_member: true } : group
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleLeaveGroup = async (groupId) => {
    try {
      await axios.post(`/groups/${groupId}/leave/`);
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId ? { ...group, is_member: false } : group
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Failed to load groups</Alert>;

  return (
    <Container className={appStyles.Content}>
      <Row>
        <Col>
          <h1>Groups</h1>
          {groups.length ? (
            groups.map((group) => (
              <Row key={group.id} className="my-3 align-items-center">
                <Col xs={2}>
                  <Image src={group.group_logo} thumbnail />
                </Col>
                <Col xs={6}>
                  <Link to={`/groups/${group.id}`}>
                    <h4>{group.name}</h4>
                  </Link>
                </Col>
                <Col xs={4} className="text-right">
                  {currentUser && (
                    <>
                      {group.is_member ? (
                        <Button
                          variant="danger"
                          onClick={() => handleLeaveGroup(group.id)}
                        >
                          Leave Group
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() => handleJoinGroup(group.id)}
                        >
                          Join Group
                        </Button>
                      )}
                    </>
                  )}
                </Col>
              </Row>
            ))
          ) : (
            <p>No groups available.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GroupsPage;
