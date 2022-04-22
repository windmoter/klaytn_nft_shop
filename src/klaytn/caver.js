
import Caver from 'caver-js'
import fs from 'fs'  
const deployedABI = require('./deployedABI.json') 
const TEST_NET = 'https://api.baobab.klaytn.net:8651'
const DEPLOYED_ADDRESS = JSON.stringify( require('../../deployedAddress') );
const DEPLOYED_ADDRESS_TOKENSALES = JSON.stringify(require('../../deployedAddress_TokenSales') ) 
const DEPLOYED_ABI = require('../../deployedABI')   
const DEPLOYED_ABI_TOKENSALES = require('../../deployedABI_TokenSales')   

 
export const config = {
  rpcURL: TEST_NET,
  DEPLOYED_ADDRESS: DEPLOYED_ADDRESS,
  DEPLOYED_ADDRESS_TOKENSALES: DEPLOYED_ADDRESS_TOKENSALES,
  DEPLOYED_ABI: DEPLOYED_ABI,
  DEPLOYED_ABI_TOKENSALES: DEPLOYED_ABI_TOKENSALES
}


const cav = new Caver(config.rpcURL)

const getContractInstance = () => {  
  const contractInstance = DEPLOYED_ABI
  && DEPLOYED_ADDRESS
  && new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
  return contractInstance
}

export {cav, getContractInstance}
