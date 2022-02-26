import Moralis from "moralis";

// const serverUrl = 'https://p0mf0i6l2azk.usemoralis.com:2053/server';
// const appId = 'zEk9Ci0C9cu1fXWCC4oAD45HApMmGVqU2RHuEcOU';
const serverUrl = "https://p0mf0i6l2azk.usemoralis.com:2053/server";
const appId = "zEk9Ci0C9cu1fXWCC4oAD45HApMmGVqU2RHuEcOU";

Moralis.start({ serverUrl, appId });

export default {
  Moralis,
};
