import styled from "styled-components";
import {useContext} from "react";
import UserContext from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import AliasImage from '../images/bg.jpg';

const Menu = () => {
  const navigate = useNavigate();
  const { isModalOpen, hideModal, lang } = useContext(UserContext);
  if (isModalOpen) {
    return <DarkScreen onClick={() => hideModal()}>
      <BgImage />
      <MenuContainer>
        <MenuItem onClick={() => navigate("/")}>{lang("home") + " 🏠"}</MenuItem>
        <MenuItem onClick={() => navigate("/profile")}>{lang("profile") + " 👤"}</MenuItem>
        <MenuItem onClick={() => navigate("/rooms")}>{lang("rooms") + " 👥"}</MenuItem>
        <MenuItem onClick={() => navigate("/vokabular")}>{lang("vocabulary") + " 📖"}</MenuItem>
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

const BgImage = styled.div`
  opacity: .25;

  /* The image used */
  background-image: url("${AliasImage}");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default Menu;
