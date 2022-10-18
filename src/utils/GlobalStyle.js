import { createGlobalStyle, css } from "styled-components";

const base = css`
  * {
    box-sizing: border-box;
  }

  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@400&family=Open+Sans&display=swap');

  body {
    margin-top: 20px;
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #fbf8f1;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  button,
  label {
    font-family: 'Open Sans';
  }

  code {
    font-family: source-code-pro, Menlo, "Noto Sans Mono", Consolas, "Courier New",
      monospace;
  }

  button {    
    align-items: center;
    justify-content: center;
    display: flex;  
    cursor: pointer;
    color: black;
  }

  input,
  textarea {
    font-family: 'Open Sans';
    width: "100%";
    font-size: 14pt;
    resize: none;
    padding: 0.3em;
  }
`;

const reset = css`
  /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
  */

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  table,
  tbody,
  thead,
  td {
    border: 1px solid black;
  }
`;

export default createGlobalStyle`
  ${reset};
  ${base};
`;
