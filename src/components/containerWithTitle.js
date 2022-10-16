import React from "react";
import styled from "styled-components";

const ContainerWithTitle = ({ title, children }) => {
  return (
    <Border>
      <Title>{title}</Title>
      <div>
        {children}
      </div>
    </Border>
  );
}

const Border = styled.div`
  border-radius: 25px;
  border: 1px solid #51565F;
  padding: 0 36px 24px;
  margin: 24px 0;
`;

const Title = styled.p`
  position: relative;
  bottom: 24px;
  background-color: #51565F;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 270px;
  color: white;
  font-size: 20px;
  border-radius: 25px;
`;

export default ContainerWithTitle;
