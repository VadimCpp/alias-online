import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as BackIcon } from "../icons/back.svg";
import { ReactComponent as MenuIcon } from "../icons/menu.svg";
import UserContext from "../contexts/userContext";

const BACK = -1;

const Header = ({ title, backButton, menuButton }) => {
  const navigate = useNavigate();
  const { showModal } = useContext(UserContext);

  return (
    <Container>
      { backButton ? <BackButton onClick={() => navigate(BACK)} /> : <EmptyBlock /> }
      <Title>{title}</Title>
      { menuButton ? <MenuButton onClick={() => showModal()} /> : <EmptyBlock /> }
    </Container>
  );
};

const EmptyBlock = styled.div`
  width: 24px;
  height: 24px;
`;

const BackButton = styled(BackIcon)`
  transition: all .5s;
  width: 24px;
  height: 24px;
  &:hover {
    transform: scale(1.25);
  }
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  color: #ffffff;
  font-style: normal;
  font-weight: 700;
  cursor: pointer;
`;

const MenuButton = styled(MenuIcon)`
  transition: all .5s;
  width: 24px;
  height: 24px;
  &:hover {
    transform: scale(1.25);
  }
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #2BC48A;
  padding: 0 20px;
`;

export default Header;
