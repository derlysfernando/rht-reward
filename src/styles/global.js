import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    overflow-x: hidden;
  }

  body {
    font: 14px 'Poppins', sans-serif;
    background: #272736;
    color: white;
    -webkit-font-smoothing: antialiased !important;
  }

  #root{
   scroll-behavior: smooth;
  }

  .swal2-confirm {
    background: #EA5A0D !important;
  }

  ul {
    list-style: none;
  }

  .ant-select-item-option-content{
    color: white!important;;
  }

  .ant-select-item-option-active:not(.ant-select-item-option-disabled){
    background-color: transparent!important;;
  }


  .App {
    height: 100%;
  }

  a {
    color: inherit; /* blue colors for links too */
    text-decoration: inherit; /* no underline */
  }

  a:hover{
    color: #ea5a0d!important;
  }

  #root::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  #root::-webkit-scrollbar
  {
    width: 8px;
    background-color: #e3212100;
  }

  #root::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #272736;
  }
`;
