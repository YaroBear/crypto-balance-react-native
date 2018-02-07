import { PublicAddress } from './PublicAddress';

export class GarlicoinAddress extends PublicAddress {
    constructor(){
        super('https://garli.co.in/ext/getaddress/');
    }

    getAddressBalance(publicKey){
        return fetch(this.api + publicKey)
          .then((response) => {
              if (response.status == 404){
                  throw {message: "No public key provided"};
              }
              else return response.json();
          })
          .then((json) => {
              if (json.error == "address not found."){
                  throw {message: "Garlicoin address not found"};
              }
            return parseFloat(json.balance);
          })
          .catch((error) => {
            throw error;
          });
        }
}