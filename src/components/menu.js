import styled from "styled-components";
import {useContext} from "react";
import UserContext from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const { isModalOpen, hideModal, lang } = useContext(UserContext);
  if (isModalOpen) {
    return <DarkScreen onClick={() => hideModal()}>
      <MenuContainer>
        <MenuItem onClick={() => navigate("/")}>{lang("home")}</MenuItem>
        <MenuItem onClick={() => navigate("/rooms")}>{lang("rooms")}</MenuItem>
        <MenuItem onClick={() => navigate("/vokabular")}>{lang("vocabulary")}</MenuItem>
        <MenuItem onClick={() => navigate("/lang-settings")}>{lang("language_settings")}</MenuItem>
      </MenuContainer>
    </DarkScreen>
  }
  return null;
};

const DarkScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
`;

const MenuContainer = styled.ul`
  width: 220px;
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
  background-color: white;
  border: 1px solid gray;
`;

const MenuItem = styled.li`
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  text-align: right;
  padding-right: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, .1);
  }
`;

export default Menu;
