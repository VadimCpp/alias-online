import styled from "styled-components";

const AliasHeader = styled.h1`  
  text-align: center;
  margin-bottom: .5em;
  margin-top: 2em;
  color: ${props => props.color || '#ffffff' };
  font-style: normal;
  font-weight: 700;
  font-size: 44px;
  line-height: 60px;
`;

export default AliasHeader;
