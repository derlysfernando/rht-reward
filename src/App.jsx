/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-undef */
import { MoralisProvider } from "react-moralis";
import GlobalStyle from "./styles/global";

import "antd/dist/antd.css";
import DirectSale from "./components/DirectSale";

const serverUrl = "https://p0mf0i6l2azk.usemoralis.com:2053/server";
const appId = "zEk9Ci0C9cu1fXWCC4oAD45HApMmGVqU2RHuEcOU";

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
