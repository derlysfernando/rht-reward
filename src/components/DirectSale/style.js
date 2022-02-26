import styled from "styled-components";

export const Container = styled.div`
  .container-meta {
    height: 100%;
    width: 100%;
    position: relative;
    padding: 5px;
    display: grid;
    grid-template-columns: 1.3fr 1.5fr 1.5fr 210px;
    grid-template-rows: 100%;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    gap: 0px 0px;
    grid-template-areas: "page-title menu gold metamask";
  }

  .progresscontent {
    top: 0;
    width: 80%;
    margin: auto;
    margin-top: 40px;
    margin-bottom: 60px;
    .progress-title {
      font-weight: bold;
      color: #5b639b;
      font-size: 13px;
      margin-bottom: 10px;
    }
  }
  .headermetamask {
    grid-area: headermetamask;
  }
  .top {
    grid-area: top;
    grid-area: top;
    align-items: center;
    display: grid;
    justify-content: center;
    position: relative;
    margin-bottom: 100px;

    .card-swap {
      border-radius: 10px;
      width: 450px;
      height: 400px;
      display: grid;
      align-items: center;
      justify-content: center;
      .title {
        text-align: center;
        font-weight: bold;
        color: #5b639b;
        font-size: 22px;
      }
      .min-reserve {
        text-align: center;
        color: #5b639b;
      }
      .disabled {
        opacity: 0.5;
      }
    }
  }

  .history {
    display: flex;
    align-items: center;
    height: auto;
    justify-content: center;
    padding-bottom: 20px;
    .card-history {
      padding: 20px;
      width: 95%;
      border-radius: 10px;
      .title-history {
        font-weight: bold;
        color: #5b639b;
        font-size: 16px;
      }
      .history-item {
        display: flex;
        background-color: #1d1f32;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
        padding: 25px;
        margin-top: 20px;
        border-radius: 10px;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
      }
      .info {
        display: grid;
        padding: 10px;
        justify-content: center;
        .title-info {
          font-weight: bold;
          color: #5b639b;
          margin-bottom: 10px;
        }
      }
    }
  }

  .ant-input-group .ant-input {
    text-align: end;
  }
  .ant-input-group-addon {
    background: #1d1f32;
    border: none;
    color: #5b639b;

    border-radius: 10px 0px 0px 10px;
    font-weight: bold;
    font-size: 15px;
  }

  .ant-select {
    margin: auto;
    width: 90%;
  }

  .ant-select-selector {
    background: #1d1f32 !important;
    border: none !important;
    color: #5b639b !important;
    box-shadow: 0px 0px 8px rgb(0 0 0 / 30%);
    border-radius: 5px;
    font-weight: bold;
    font-size: 15px;
    height: 50px !important;
    display: flex;
    align-items: center;
  }

  .ant-select-item-option {
    color: #5b639b !important;
  }

  .ant-select-item {
    color: white !important;
    font-weight: bold;
  }
  .ant-select-arrow {
    color: white !important;
    font-weight: bold;
  }
  .ant-input {
    background: #1d1f32;
    border: none;
    color: #5b639b;
    border-radius: 0px 10px 10px 0px;
    font-weight: bold;
    height: 100%;
    font-size: 17px;
  }
  .ant-input-group {
    height: 50px;
    font-size: 18px;
    box-shadow: 0px 0px 8px rgb(0 0 0 / 30%);
  }
  .ant-input-group-wrapper {
    width: 90%;
    margin: auto;
  }
  .history {
    grid-area: history;
  }

  .btn-reserve {
    background-color: #99ca40;
    color: white;
    border: none;
    height: 50px;
    min-width: 300px;
    margin: auto;
    font-size: 15px;
  }
  .btn-bsc {
    color: #ea5a0d;
    border: none;
    margin: auto;
  }
  .bsc {
    display: grid;
    justify-content: start;
  }
  @media all and (min-width: 768px) {
    .info {
      width: 20%;
    }
  }

  @media all and (max-width: 480px) {
  }
  @media all and (max-width: 320px) {
  }
`;
