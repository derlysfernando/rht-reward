import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  background-color: #4b4d65;
  .header-panel {
    display: flex;
    align-items: center;
    padding: 20px;
    padding-left: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #56576b;
    .title {
      margin-left: 10px;
      font-size: 15px;
    }
  }

  .children {
    padding: 15px;
    padding-left: 10px;
    font-size: 13px;
  }
`;
