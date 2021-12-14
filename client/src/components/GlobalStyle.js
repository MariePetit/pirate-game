import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

html,
body,
div,
span {
  scroll-behavior: smooth;
  margin: 0;
  padding: 0;
  border: 0;
  background: var(--primary-bg-color);
  vertical-align: baseline;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  font-family: 'ABeeZee';
  cursor:default;
  
}

button{
  cursor:pointer;
  *{
    cursor:pointer;
  }

  &:hover:disabled{
    cursor:default;
    *{
    cursor:default;
  }
  }
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 5px;
}

*::-webkit-scrollbar-track {
  background: var(--primary-bg-color) ;
}

*::-webkit-scrollbar-thumb {
  background-color:var(--dark-accent);
  border-radius: 55px;
}

`;
