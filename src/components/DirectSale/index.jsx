/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-properties */
/* eslint-disable react/button-has-type */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { Input, Button, Select } from "antd";
import { useWeb3Transfer, useMoralis } from "react-moralis";
import Progress from "../core/Progress";
import Card from "../core/Card";
import Icon from "../core/Icon";

import HeaderMetamask from "../HeaderMetamask";
import { Container } from "./style";
import Moralis from "../core/moralis/index";

const { Option } = Select;

function DirectSale() {
  const [ticketValue, setTicketValue] = useState(1);
  const [rhtValue, setRhtValue] = useState(10000);
  const transferWethQuery = useWeb3Transfer({
    type: "erc20",
    amount: Moralis.Moralis.Units.Token(ticketValue * 10000, 18),
    receiver: "0xF90EaA2b16A9Aa983399764Eae15584030D4FA4F",
    contractAddress: "0xf1018c71eebe32dd85012ad413bab6b940d0d51e",
    awaitReceipt: true,
  });

  const [wvcMax, setWvcMax] = useState(5001);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [wvcTotal, setWvcTotal] = useState(0);
  const [listReserves, setReserves] = useState([]);
  const [reservedWVC, setReservedWVC] = useState();
  const [totalRht, setTotalRHT] = useState();
  const [counter, setCounter] = useState(999);
  const [stopTransfer, setStopTransfer] = useState(false);
  const [listPlayers, setListPlayers] = useState([]);
  const [selectPlayer, setSelectPlayer] = useState([]);
  const [buying, setBuying] = useState(false);
  const { authenticate, isAuthenticated, user, logout } = useMoralis();

  async function listAllTransactions() {
    if (!isAuthenticated) return;
    const currentUser = Moralis.Moralis.User.current();

    if (!currentUser) return;

    const BscTransactions = Moralis.Moralis.Object.extend("BscTransactions");
    const query = new Moralis.Moralis.Query(BscTransactions);
    query.greaterThan("ticket", 1);
    query.find().then((results) => {
      let returnTrans = [];
      let totalWvc = 0;
      let totalRHT = 0;

      for (let i = 0; i < results.length; i++) {
        if (results[i].attributes.ticket) {
          returnTrans.push({
            hash: results[i].attributes.hash,
            date: results[i].attributes.updatedAt,
            player: results[i].attributes.player,
            amount: results[i].attributes.ticket,
          });

          totalWvc += results[i].attributes.ticket;
          totalRHT += results[i].attributes.rht;
        }
      }

      // setProgress((totalWvc * 100) / 500000);
      setTotalRHT(totalRHT);

      returnTrans = returnTrans.reverse();
      setBuying(false);

      setReserves([...returnTrans]);
    });

    const UserInfo = Moralis.Moralis.Object.extend("User");
    const queryUser = new Moralis.Moralis.Query(UserInfo);
    queryUser.greaterThan("ticket", 0);
    queryUser.find().then((results) => {
      if (!results || (results && results.length === 0)) return;

      setReservedWVC(results[0].attributes.ticket);
    });
  }

  async function getPlayers() {
    const UserInfo = Moralis.Moralis.Object.extend("players");
    const queryUser = new Moralis.Moralis.Query(UserInfo);
    queryUser.find().then((results) => {
      console.log("results", results);
      setListPlayers(results);
    });
  }

  async function handleWVC(e) {
    setTicketValue(e.target.value);

    const rhtValue = 10000 * e.target.value;
    setRhtValue(rhtValue);

    if (e.target.value >= 1 && e.target.value <= 10) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  async function saveWvc(countWvc) {
    const { data } = await transferWethQuery;

    if (!data || data === null || (data && !data.transactionHash)) {
      return;
    }

    const BscTransactions = Moralis.Moralis.Object.extend("BscTransactions");
    const query = new Moralis.Moralis.Query(BscTransactions);
    query.equalTo("hash", await transferWethQuery.data.transactionHash);
    const results = await query.find();
    if (!results || (results && results.length === 0)) {
      setTimeout(() => {
        // eslint-disable-next-line no-param-reassign
        countWvc += 1;
        if (countWvc > 5) return;

        saveWvc(countWvc);
      }, 1000);

      return;
    }

    if (!isAuthenticated) return;

    transferWethQuery.setData(null);
    if (stopTransfer === false) {
      setStopTransfer(true);
      results[0].set("ticket", parseFloat(ticketValue));
      results[0].set("rht", ticketValue * 10000);
      results[0].set("player", selectPlayer);
      results[0]
        .save()
        .then(
          async () => {
            const UserTransaction = Moralis.Moralis.Object.extend("User");
            const queryUser = new Moralis.Moralis.Query(UserTransaction);
            queryUser.equalTo("ethAddress", await user.attributes.ethAddress);
            const resultsUsers = await queryUser.find();

            resultsUsers[0].set(
              "ticket",
              parseFloat(ticketValue) +
                parseFloat(resultsUsers[0].attributes.ticket || 0)
            );
            resultsUsers[0].save().then(
              async () => {
                listAllTransactions();
              },
              () => {}
            );
          },
          () => {}
        )
        .finally(async () => {});
    }
  }

  async function transfer() {
    setStopTransfer(false);
    if (counter.toString() === "0") {
      handleWVC({ target: { value: ticketValue } });
    } else {
      transferWethQuery.fetch();
    }
  }

  useEffect(async () => {
    saveWvc(0);
    if (buying === false) {
      setBuying(transferWethQuery.isFetching);
    }

    if (transferWethQuery.error && transferWethQuery.error.code) {
      setBuying(false);
    }
  }, [transferWethQuery.isFetching]);

  useEffect(async () => {
    getPlayers();
    const currentUser = Moralis.Moralis.User.current();

    if (!currentUser) {
      authenticate({ signingMessage: "Your adventure starts here." });
      return;
    }

    Moralis.Moralis.enableWeb3();

    listAllTransactions();
  }, [isAuthenticated]);

  function truncateHash(str) {
    if (str.length > 35) {
      return `${str.substr(0, 20)}...${str.substr(str.length - 8, str.length)}`;
    }
    return str;
  }

  function displayDate(date) {
    const dt = new Date(date);

    // ensure date comes as 01, 09 etc
    const DD = `0${dt.getDate()}`.slice(-2);

    // getMonth returns month from 0
    const MM = `0${dt.getMonth() + 1}`.slice(-2);

    const YYYY = dt.getFullYear();

    const hh = `0${dt.getHours()}`.slice(-2);

    const mm = `0${dt.getMinutes()}`.slice(-2);

    const ss = `0${dt.getSeconds()}`.slice(-2);

    const dateString = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;

    return dateString;
  }

  const currentUser = Moralis.Moralis.User.current();

  return (
    <Container>
      <div className="container">
        <HeaderMetamask
          reservedWVC={reservedWVC}
          totalRHT={totalRht}
          className="headermetamask"
        />
        {/* <div className="progresscontent">
          <div className="progress-title">
            {`WVC Reserved (${wvcTotal}  / 500.000 ) ${progress}%`}
          </div>
          <Progress className="progress-dash" progress={progress.toString()} />
        </div> */}
        <div className="top">
          <Card className="card-swap">
            <div className="title">Exchange</div>
            <Input
              min={1}
              max={10}
              addonBefore="TICKET"
              onChange={(e) => {
                handleWVC(e);
              }}
              defaultValue="1"
              value={ticketValue}
            />
            <Select
              onChange={(e) => {
                setSelectPlayer(e);
              }}
              dropdownStyle={{ background: "#1d1f32", color: "white" }}
              placeholder="Select Player"
              className="select-before"
            >
              {listPlayers.map((item) => (
                <Option value={item.attributes.name}>
                  {item.attributes.name}
                </Option>
              ))}
            </Select>
            <Input
              addonBefore="RHT"
              defaultValue="0"
              value={rhtValue}
              disabled
            />

            <Button
              className={`btn-reserve ${
                disabled === true || buying || loading || !currentUser
                  ? "disabled"
                  : ""
              }`}
              type="primary"
              shape="round"
              disabled={disabled || buying || loading || !currentUser}
              onClick={() => {
                transfer();
              }}
              size="large"
            >
              {!currentUser
                ? "Please Login to Metamask"
                : buying
                ? "Buying... (Do not close this page)"
                : `Reserve My Ticket`}
            </Button>
            <div className="min-reserve">
              Max Tickets Per Player: 10 Tickets
            </div>
          </Card>
        </div>
        <div className="history">
          <Card className="card-history">
            <div className="title-history">All Reserve History</div>
            <div>
              {listReserves.map((item) => (
                <Card key={item.hash} className="history-item">
                  <div className="hash info">
                    <span className="title-info">Transaction Hash</span>
                    <span>{truncateHash(item.hash)}</span>
                  </div>
                  <div className="date info">
                    <span className="title-info">Date</span>
                    <span>{displayDate(item.date)}</span>
                  </div>
                  <div className="action info">
                    <span className="title-info">Player</span>
                    <span>{item.player}</span>
                  </div>
                  <div className="amount info">
                    <span className="title-info">Ticket</span>
                    <span>{item.amount}</span>
                  </div>
                  <div className="bsc info">
                    <a
                      target="_blank"
                      href={`https://bscscan.com/tx/${item.hash}`}
                      className="btn-bsc"
                    >
                      <Icon icon="icon-link" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default DirectSale;
