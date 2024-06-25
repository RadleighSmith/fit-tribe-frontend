import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, ListGroup, Image } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/GroupsPage.module.css';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const { data } = await axiosReq.get('/groups/');
        setGroups(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchMemberships = async () => {
      try {
        const { data } = await axiosReq.get('/memberships/');
        setMemberships(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGroups();
    fetchMemberships();
  }, []);

  const handleJoinGroup = async (groupId) => {
    try {
      await axiosReq.post(`/groups/${groupId}/join/`);
      setMemberships([...memberships, { group: groupId }]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLeaveGroup = async (groupId) => {
    try {
      await axiosReq.post(`/groups/${groupId}/leave/`);
      setMemberships(memberships.filter((membership) => membership.group !== groupId));
    } catch (err) {
      console.log(err);
    }
  };

  const isMember = (groupId) => {
    return memberships.some((membership) => membership.group === groupId);
  };

  return (
    <Container>
      <h1 className="my-4">Groups</h1>
      <ListGroup>
        {groups.map((group) => (
          <ListGroup.Item key={group.id} className={styles.GroupItem}>
            <div className={styles.GroupInfo}>
              <Image src={group.group_logo} roundedCircle className={styles.GroupLogo} />
              <Link to={`/groups/${group.id}`} className={styles.GroupName}>
                {group.name}
              </Link>
            </div>
            {isMember(group.id) ? (
              <Button
                variant="danger"
                onClick={() => handleLeaveGroup(group.id)}
                className={styles.GroupButton}
              >
                Leave Group
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => handleJoinGroup(group.id)}
                className={styles.GroupButton}
              >
                Join Group
              </Button>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default GroupsPage;
