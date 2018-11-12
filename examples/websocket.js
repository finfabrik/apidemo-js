import WebSocket from 'ws'
import readline from "readline";
import {Signature} from './utils'
import config from 'config'

const ws = new WebSocket(config.get('api.ws'))

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

rl.on('line', (line) => {
   switch (line.trim()) {
      case 'q':
         rl.close()
         break
      default:
         try {
            let sub = JSON.parse(line)
            console.log('===>', sub)
            ws.send(JSON.stringify(sub))
         } catch(e) {}
   }
});

rl.on('close', () => {
   ws.close(1001, 'bye')
});

ws.on('open', () => {
   console.log('connected');
   let nonce = Date.now();
   let data = {};
   data['type'] = 'auth'
   data['X-API-KEY'] = config.get('api.key')
   data['X-FF-NONCE'] = nonce
   data['X-FF-SIGNATURE'] = Signature(nonce)
   let sub = JSON.stringify(data);
   console.log('===>', sub)
   ws.send(sub)
})

ws.on('close',(code, reason) => {
   console.log('disconnected', code, reason);
   process.exit(0);
})

ws.on('message', (message) => {
   console.log('<===', message);
})

ws.on('error', (error) => {
   console.error("ws received error", error)
})
