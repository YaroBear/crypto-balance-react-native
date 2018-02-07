import { CryptoMarket } from "./CryptoMarket";

export class CoinMarketCap extends CryptoMarket {
    constructor(){
        super('https://api.coinmarketcap.com/v1/ticker/');
    }

    getMarketPrice(ticker){
    return fetch(this.api + ticker)
      .then((response) => response.json())
      .then((json) => {
        return parseFloat(json[0].price_usd);
      })
      .catch((error) => {
          throw error;
      })
    }
}