 

const state = {
  klaytn: null,  
  isConnectWallet: false,
  myaddress: '',
  balance: 0,

  accessType: "keystore",
  keystore: "",
  password: ""
}

const getters = {
  klaytn: (state) => state.klaytn,  
  isConnectWallet: (state) => state.isConnectWallet,
  myaddress: (state) => state.myaddress,
  balance: (state) => state.balance,
  
  accessType: (state) => state.accessType,  
  keystore: (state) => state.keystore,
  password: (state) => state.password 
}

const mutations = {
  setKlaytn(state, klaytn) {
    state.klaytn = klaytn
  },  
  setIsConnectWallet(state, isConnected) {    
    state.isConnectWallet = isConnected
  },
  setMyAddress(state, address) {
    state.myaddress = address
  },
  setBalance(state, balance) {
    state.balance = balance
  },
  setAccessType(state, accessType) {
    state.accessType = accessType
  },  
  setKeystore(state, keystore) {    
    state.keystore = keystore
  },
  setPassword(state, password) {
    state.password = password
  } 
}

const actions = {
  
}

export default {
  namespaced: true, 
  state,
  getters,
  actions,
  mutations
}