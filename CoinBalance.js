export class CoinBalance {

    constructor(ledgerAPI, marketAPI){
        this.ledgerAPI = ledgerAPI;
        this.marketAPI = marketAPI;
    }

    getBalance(publicKey){
        return this.ledgerAPI.getAddressBalance(publicKey)
            .then((balance) => {
                return balance;
            })
            .catch((error) =>{
                throw error;
            });
    }

    getPrice(ticker){
        return this.marketAPI.getMarketPrice(ticker)
          .then((price) => {
            return price;
          })
          .catch((error) => {
            throw error;
        });
    }
}