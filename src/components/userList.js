import React from "react";
import styled from "styled-components";

const UserList = ({ users, uid, onUserClick }) => {
  const getDisplayName = (user) => {
    let dn = user.displayName;
    if (uid === user.uid) {
      dn += " (you)";
    }
    return dn;
  }

  return (
    <ul>
      {
        users.map(user => {
          return (
            <Row key={user.uid} onClick={() => onUserClick(user)}>
              <Avatar width="32" height="32" src={user.photoURL} alt={user.displayName} />
              <Name>{getDisplayName(user)}</Name>
              <Score>{user.score}</Score>
            </Row>
          );
        })
      }
    </ul>
  );
}

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
