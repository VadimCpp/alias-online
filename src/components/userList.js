import React, {useContext} from "react";
import styled from "styled-components";
import getString from "../utils/getString";
import UserContext from "../contexts/userContext";

const UserList = ({ users, uid, room, onUserClick }) => {
  const { interfaceLang } = useContext(UserContext);
  console.log(room);
  const getDisplayName = (user) => {
    let dn = user.displayName;
    if (uid === user.uid) {
      dn += ` (${getString(interfaceLang, "YOU")})`;
    }
    if (room.leaderUid === user.uid) {
      dn += ` (${getString(interfaceLang, "EXPLAIN_A_WORD")})`;
    }
    return dn;
  }

  const isActive = (user) => {
    const today = new Date();
    const lastActiveAt = new Date(user.lastActiveAt);
    const lastActiveHoursAgo = (today - lastActiveAt) / 1000 / 60 / 60;
    return (lastActiveHoursAgo < 1);
  }

  const filteredUsers = users.filter(u => isActive(u) && u.room === room.uid);
  const sortedUsers = filteredUsers.sort((a, b) => {
    if (a.score === b.score) return 0;
    if (a.score < b.score) return 1;
    return -1;
  });

  return (
    <List>
      {
        sortedUsers.map(user => {
          return (
            <Row key={user.uid} onClick={() => onUserClick(user)}>
              <Avatar width="32" height="32" src={user.photoURL} alt={user.displayName} />
              <Name>{getDisplayName(user)}</Name>
              <Score>{user.score}</Score>
              { isActive(user) ? <ActiveIndicator /> : <InactiveIndicator /> }
            </Row>
          );
        })
      }
    </List>
  );
}

const List = styled.ul`
  width: 100%;
`;

const ActiveIndicator = styled.span`
  background-color: lightgreen;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin-left: 15px;
  margin-right: 10px;
`;

const InactiveIndicator = styled.span`
  background-color: lightgray;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin-left: 15px;
`;

const Row = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Avatar = styled.img`
  border-radius: 16px;
  margin-right: 10px;
`;

const Name = styled.span`
  margin-right: 10px;
`;

const Score = styled.span`
  font-weight: bold;
`;

export default UserList;
