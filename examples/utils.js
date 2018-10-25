import crypto from 'crypto'
import {Buffer} from 'buffer'
import config from "config";

export const HmacSha512Hex = (secret, message) => {
   let base64encode = Buffer.from(message).toString('base64')
   return crypto.createHmac('sha512', new Buffer(secret, 'hex')).update(base64encode).digest('hex')
}

export const Signature = (nonce) => {
   let apiKey = config.get('api.key')
   let apiSecret = config.get('api.secret')
   let request = {};
   request.apiKey = apiKey
   request.version = config.get('api.version')
   request.nonce = nonce

   return HmacSha512Hex(apiSecret, JSON.stringify(request))
}
