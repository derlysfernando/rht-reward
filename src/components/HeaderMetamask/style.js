import styled from "styled-components";

export const Container = styled.div`
  align-items: center;
  display: flex;
  padding-left: 25px;
  padding-right: 25px;
  height: 75px;

  .container-meta {
    height: 100%;
    width: 100%;
    position: relative;
    padding: 5px;
    display: grid;
    grid-template-columns: 1.3fr 1.5fr 0.5fr 210px;
    grid-template-rows: 100%;
    align-items: center;
    gap: 0px 0px;
    grid-template-areas: "page-title menu gold metamask";
    img {
      margin: 0px 7px;
      max-height: 33px;
      height: 33px;
      padding: 4px 0;
    }
    .metamask {
      grid-area: metamask;
      background: #282842;
      box-shadow: 0px 0px 8px rgb(0 0 0 / 30%);
      border-radius: 5px;
      padding: 10px;
      min-width: 150px;
      height: 60px;
      display: flex;
      align-items: center;
      position: absolute;
      right: 0;
      transition: 0.5s;
      cursor: pointer;
    }
    .metamask:hover {
      transform: scale(1.05);
    }
    .menu {
      grid-area: menu;
      display: flex;
      align-items: center;
      justify-content: center;
      .buttons-menu {
        margin: 10px;
        cursor: pointer;
      }
      .active {
        border-bottom: 1px solid var(--color);
      }
    }
    .gold {
      grid-area: gold;
      position: relative;
      width: 50px;
      height: 50px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 350px;
      padding-right: 10px;
      position: absolute;
      right: 0;
      .wvc-item {
        margin-left: 10px;
      }
      .gold-title {
        font-weight: bold;
        font-size: 16px;
      }
      .qnt-gold {
        font-weight: lighter;
        font-size: 14px;
      }
    }
    .page-title {
      grid-area: page-title;
      display: flex;
      align-items: center;
    }
  }
`;
