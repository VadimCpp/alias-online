import styled from "styled-components";

const AliasHeader = styled.h1`  
  text-align: center;
  font-size: ${ props => props.isPlayingRoom ? '36px' : '3em' };
  margin-bottom: ${ props => props.isPlayingRoom ? 0 : '.5em' };
  margin-top: ${ props => props.isPlayingRoom ? 0 : '1em' };
  color: ${ props => props.color || '#ffffff' };
  font-style: normal;
  font-weight: 700; 
  line-height: 60px;
  cursor: pointer;
`;

export default AliasHeader;
