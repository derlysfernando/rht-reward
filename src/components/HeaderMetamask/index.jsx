/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from "prop-types";
import React from "react";
import { useMoralis } from "react-moralis";
import { Container } from "./style";
import { ReactComponent as Metamask } from "./assets/img/metamask-icon.svg";

function HeaderMetamask({ reservedWVC, totalRHT }) {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();

  function truncateHash(str) {
    if (str.length > 35) {
      return `${str.substr(0, 8)}...${str.substr(str.length - 8, str.length)}`;
    }
    return str;
  }

  return (
    <Container>
      <div className="container-meta">
        <div className="gold">
          <div className="wvc-item">
            <div className="gold-title">My Reserve Tickets</div>
            <div className="qnt-gold">{reservedWVC || "0"}</div>
          </div>
          <div className="wvc-item">
            <div className="gold-title">Total Amount in Bet</div>
            <div className="qnt-gold">{totalRHT || "0"}</div>
          </div>
        </div>

        <div
          onClick={() => {
            if (isAuthenticated) {
              logout();
              return;
            }

            authenticate({ signingMessage: "Your adventure starts here." });
          }}
          className="metamask"
        >
          <Metamask />
          <div className="hash">
            {truncateHash(
              !isAuthenticated ? "connect" : user.get("ethAddress")
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default HeaderMetamask;

HeaderMetamask.propTypes = {
  reservedWVC: PropTypes.number,
  totalRHT: PropTypes.number,
};

HeaderMetamask.defaultProps = {
  reservedWVC: 0,
  totalRHT: 0,
};
