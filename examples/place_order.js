import {Signature} from './utils'
import axios from 'axios'
import config from 'config';

let nonce = Date.now();
let signature = Signature(nonce)

let api = axios.create({
   baseURL: config.get('api.base'),
   timeout: 1000,
   headers: {'assetClass':'Crypto', 'X-API-KEY': config.get('api.key'), 'X-FF-NONCE':nonce, 'X-FF-SIGNATURE': signature}
});

let limitOrder = {
   "account": config.get('user.account'),
   "size": 0.004,
   "actionType": "LIMIT",
   "kind": "order",
   "ticker": "BTCUSD",
   "mic": "BTRX",
   "action": "SELL",
   "actionPrice": 5000,
   "currency": "USD"
}

api.post('/order', limitOrder)
   .then((response) => {
      console.log('<===', JSON.stringify(response.data));
   })
   .catch((error) => {
      console.log(error);
   });
