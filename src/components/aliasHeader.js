import styled from "styled-components";

const AliasHeader = styled.h1`  
  text-align: center;
  font-size: 3em;
  margin-bottom: .5em;
  margin-top: 1em;
  color: ${props => props.color || '#ffffff' };
  font-style: normal;
  font-weight: 700; 
  line-height: 60px;
`;

export default AliasHeader;
