import React from "react";
import styled from "styled-components";

const Header = styled.header`
  height: ${ props => props.height};
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
`;

const Footer = styled.header`
  height: ${ props => props.height};
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
`;

const StyledContainer = styled.div`
  width: 100%; 
  height: 100vh;
  box-sizing: border-box;
  padding-top: ${ props => props.paddingTop};
  padding-bottom: ${ props => props.paddingBottom};
  overflow-y: scroll;
`;

const Container = ({children, paddingTop = 0, paddingBottom = 0}) => {
  // console.log(children);
  return <StyledContainer paddingTop={paddingTop} paddingBottom={paddingBottom}>
    {children}
  </StyledContainer>
};

Container.Header = ({children, paddingTop, ...props}) => {
  return <Header height={paddingTop} {...props}>{children}</Header>
}

Container.Content = ({children, ...props}) => {
  return <div {...props}>{children}</div>
}

Container.Footer = ({children, paddingBottom, ...props}) => {
  return <Footer height={paddingBottom} {...props}>{children}</Footer>
}


export default Container;
