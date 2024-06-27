import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import groupStyles from '../../styles/GroupsPage.module.css';
import divider from '../../styles/Divider.module.css';

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
        <Col className="text-center p-3">
          <h1 className={groupStyles.Title}>Groups</h1>
          <hr className={divider.BlueDivider} />
          {error && <p className="text-danger">Failed to load groups</p>}
          {currentUser && (currentUser.is_superuser || currentUser.is_staff) && (
            <>
              <Link to="/create-group">
                <Button className={`${btnStyles.Button} ${btnStyles.ButtonWide} mt-2`}>Create a New Group</Button>
              </Link>
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {groups.length ? (
            groups.map((group) => (
              <div key={group.id}>
                <Row className='my-3 align-items-center'>
                  <Col xs={12} sm={2} className="d-flex justify-content-center">
                    <Image src={group.group_logo} thumbnail className={groupStyles.GroupLogo} />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Link to={`/groups/${group.id}`} className={groupStyles.GroupLink}>
                      <h4>{group.name}</h4>
                    </Link>
                    <p>{group.description}</p>
                  </Col>
                  <Col xs={12} sm={4} className="d-flex justify-content-center justify-content-sm-end mt-2 mt-sm-0">
                    {currentUser && (
                      <>
                        {group.is_member ? (
                          <Button
                            variant="danger"
                            onClick={() => handleLeaveGroup(group.id)}
                            className={`${btnStyles.ButtonRed} ${btnStyles.ButtonLarge} mx-2`}
                          >
                            Leave Group
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            onClick={() => handleJoinGroup(group.id)}
                            className={`${btnStyles.Button} ${btnStyles.ButtonLarge} mx-2`}
                          >
                            Join Group
                          </Button>
                        )}
                      </>
                    )}
                  </Col>
                </Row>
                <hr className={divider.OffWhiteDivider} />
              </div>
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
