import React from "react";
import styled from "styled-components";

const Avatar = ({ user, big }) => {

  return user ? (
    <Container>
      { big
        ? <AvatarImageBig width={"96"} height={"96"} src={user.photoURL} alt={user.displayName} /> 
        : <AvatarImage width={"32"} height={"32"} src={user.photoURL} alt={user.displayName} />
      }
      {user.pro && <Pro>⭐️</Pro>}
    </Container>
  ) : null;
};

const Container = styled.div`
  position: relative;
  margin-right: 10px;
`;

const AvatarImage = styled.img`
  border-radius: 16px;
`;

const AvatarImageBig = styled.img`
  border-radius: 50%;
`;

const Pro = styled.p`
  position: absolute;
  right: -2px;
  top: -2px;
  font-size: 10px;
  padding: 2px;
  background-color: #2BC48A;
  border-radius: 16px;
`;

export default Avatar;
