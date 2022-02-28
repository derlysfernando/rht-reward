/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-undef */
import { MoralisProvider } from "react-moralis";
import GlobalStyle from "./styles/global";

import "antd/dist/antd.css";
import DirectSale from "./components/DirectSale";

const serverUrl = "https://squniwtvf0f0.usemoralis.com:2053/server";
const appId = "kHfsqUM7CtlORa0YeOKzAH1pBtcftNsng1TkqXtM";

function App() {
  return (
    <div className="App">
      <MoralisProvider appId={appId} serverUrl={serverUrl}>
        <DirectSale />
      </MoralisProvider>
      <GlobalStyle />
    </div>
  );
}

export default App;
