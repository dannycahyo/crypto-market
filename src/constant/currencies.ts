import { Currency } from "src/market/models";

const currencies: Currency[] = [
  {
    currencyGroup: "IDR",
    color: "#0A68F4",
    currencySymbol: "Rp",
    name: "Rupiah Token",
    logo: "https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_IDRT.svg",
    decimal_point: 0,
    listingDate: "2020-09-15T09:43:42Z",
    wallets: [
      {
        currencyGroup: "IDR",
        tokenSymbol: "IDRT",
        decimal_point: 2,
        tokenType: "ERC-20",
        blockchain: "Ethereum",
        explorer: "https://etherscan.io/tx/",
        listingDate: "2020-09-15T09:43:43Z",
        blockchainName: "Ethereum",
        logo: "https://s3.ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/blockchain/ERC-20.svg",
      },
      {
        currencyGroup: "IDR",
        tokenSymbol: "IDRTB",
        decimal_point: 8,
        tokenType: "BEP-2",
        blockchain: "Binance",
        explorer: "https://explorer.binance.org/tx/",
        listingDate: "2020-09-15T09:43:44Z",
        blockchainName: "BNB Beacon Chain",
        logo: "https://s3.ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/blockchain/BEP-2.svg",
      },
      {
        currencyGroup: "IDR",
        tokenSymbol: "IDRTBSC",
        decimal_point: 2,
        tokenType: "BEP-20",
        blockchain: "Binance Smartchain",
        explorer: "https://bscscan.com/tx/",
        listingDate: "2022-04-11T09:02:03Z",
        blockchainName: "BNB Smart Chain",
        logo: "https://s3.ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/blockchain/BEP-20+(BSC).svg",
      },
      {
        currencyGroup: "IDR",
        tokenSymbol: "IDRTPOLYGON",
        decimal_point: 6,
        tokenType: "Polygon",
        blockchain: "Polygon",
        explorer: "https://polygonscan.com/tx/",
        listingDate: "2023-01-24T00:00:00Z",
        blockchainName: "Polygon",
        logo: "https://s3.ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/blockchain/MATIC.svg",
      },
    ],
  },
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
];

export { currencies };