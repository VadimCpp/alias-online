import styled from "styled-components";
import React from "react";
import { ReactComponent as BackIcon } from "../icons/back.svg";
import { ReactComponent as MenuIcon } from "../icons/menu.svg";

const Header = ({ title, onBackButton, onMenuButton }) => {
  return (
    <Container>
      { onBackButton ? <BackButton onClick={onBackButton} /> : <EmptyBlock /> }
      <Title>{title}</Title>
      { onMenuButton ? <MenuButton onClick={onMenuButton} /> : <EmptyBlock /> }
    </Container>
  );
};

const EmptyBlock = styled.div`
  width: 36px;
  height: 36px;
`;

const BackButton = styled(BackIcon)`
  transition: all .5s;
  width: 36px;
  height: 36px;
  &:hover {
    transform: scale(1.25);
  }
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  color: #ffffff;
  font-style: normal;
  font-weight: 700;
  cursor: pointer;
`;

const MenuButton = styled(MenuIcon)`
  transition: all .5s;
  width: 36px;
  height: 36px;
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
