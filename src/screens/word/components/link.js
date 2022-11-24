import styled from "styled-components";

const Link = ({link, label, ...props}) => {
  return (
    <Container {...props} href={link}>
      <Label>{label}</Label>
    </Container>
  );
};

const Container = styled.a`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid lightgray;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin: ${props => props.margin || 0};
  background-color: ${props => props.backgroundColor || "transparent"};
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
  text-decoration: none;
  text-align: center;
  transition: transform 200ms linear;
  &:hover {
    transform: scale(1.15);
  }
`;

const Label = styled.span`
  font-size: 18px;
  line-height: 50px;
`;

export default Link;
