import { Currency } from "src/market/models";

const SupportedCurrenciesTestData: Currency[] = [
  {
    currencyGroup: "BTC",
    color: "#F78B1A",
    currencySymbol: "BTC",
    name: "Bitcoin",
    logo: "https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_BTC.svg",
    decimal_point: 8,
    listingDate: "2020-09-15T09:43:45Z",
    wallets: [
      {
        currencyGroup: "BTC",
        tokenSymbol: "BTC",
        decimal_point: 8,
        tokenType: "Bitcoin",
        blockchain: "Bitcoin",
        explorer: "https://explorer.bitcoin.com/btc/tx/",
        listingDate: "2020-09-15T09:43:45Z",
        blockchainName: "Bitcoin",
        logo: "https://s3.ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/blockchain/Bitcoin.svg",
      },
    ],
  },
  {
    currencyGroup: "BCH",
    color: "#0AC18E",
    currencySymbol: "BCH",
    name: "Bitcoin Cash",
    logo: "https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_BCH.svg",
    decimal_point: 8,
    listingDate: "2022-07-28T07:00:08Z",
    wallets: [
      {
        currencyGroup: "BCH",
        tokenSymbol: "BCH",
        decimal_point: 8,
        tokenType: "Bitcoin Cash",
        blockchain: "Bitcoin Cash",
        explorer: "https://blockchair.com/bitcoin-cash/transaction/",
        listingDate: "2022-07-28T07:00:08Z",
        blockchainName: "Bitcoin Cash",
        logo: "https://s3.ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/blockchain/Bitcoincash.svg",
      },
    ],
  },
  {
    currencyGroup: "ETH",
    color: "#9011FE",
    currencySymbol: "ETH",
    name: "Ethereum",
    logo: "https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_ETH.svg",
    decimal_point: 18,
    listingDate: "2020-09-15T09:43:46Z",
    wallets: [
      {
        currencyGroup: "ETH",
        tokenSymbol: "ETH",
        decimal_point: 18,
        tokenType: "ERC-20",
        blockchain: "Ethereum",
        explorer: "https://etherscan.io/tx/",
        listingDate: "2020-09-15T09:43:46Z",
        blockchainName: "Ethereum",
        logo: "https://s3.ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/blockchain/ERC-20.svg",
      },
    ],
  },
  {
    currencyGroup: "COMP",
    color: "#00D395",
    currencySymbol: "COMP",
    name: "Compound",
    logo: "https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_COMP.svg",
    decimal_point: 18,
    listingDate: "2020-09-24T15:17:38Z",
    wallets: [
      {
        currencyGroup: "COMP",
        tokenSymbol: "COMP",
        decimal_point: 18,
        tokenType: "ERC-20",
        blockchain: "Ethereum",
        explorer: "https://etherscan.io/tx/",
        listingDate: "2020-09-24T15:17:38Z",
        blockchainName: "Ethereum",
        logo: "https://s3.ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/blockchain/ERC-20.svg",
      },
    ],
  },
];

export { SupportedCurrenciesTestData };
