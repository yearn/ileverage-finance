import config from "../config";
import async from 'async';

import {
  ERROR,
  GET_BALANCES,
  BALANCES_RETURNED,
  OPEN_POSITION,
  OPEN_POSITION_RETURNED,
  CLOSE_POSITION,
  CLOSE_POSITION_RETURNED,
  SETTLE_POSITION,
  SETTLE_POSITION_RETURNED,
  GET_POSITIONS,
  POSITIONS_RETURNED,
  REFRESH_POSITIONS,
  REFRESH_POSITIONS_RETURNED
} from '../constants';
import Web3 from 'web3';

import {
  injected,
  walletconnect,
  walletlink,
  ledger,
  trezor,
  frame,
  fortmatic,
  portis,
  squarelink,
  torus,
  authereum
} from "./connectors";

const Dispatcher = require('flux').Dispatcher;
const Emitter = require('events').EventEmitter;

const dispatcher = new Dispatcher();
const emitter = new Emitter();

const ethers = require('ethers');

class Store {
  constructor() {

    this.store = {
      collateralOptions: [
        {
          id: 'dai',
          symbol: 'DAI',
          name: 'DAI',
          description: 'DAI Stablecoin',
          erc20address: '0x6b175474e89094c44da98b954eedeac495271d0f',
          decimals: 18,
          balance: 0,
          debt: 0,
          principal: 0,
          interest: 0,
          position: 0
        },
        {
          id: 'usdc',
          symbol: 'USDC',
          name: 'USD Coin',
          description: 'USD//C',
          erc20address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          decimals: 6,
          balance: 0,
          debt: 0,
          principal: 0,
          interest: 0,
          position: 0
        },
      ],
      account: {},
      web3: null,
      connectorsByName: {
        MetaMask: injected,
        TrustWallet: injected,
        WalletConnect: walletconnect,
        WalletLink: walletlink,
        Ledger: ledger,
        Trezor: trezor,
        Frame: frame,
        Fortmatic: fortmatic,
        Portis: portis,
        Squarelink: squarelink,
        Torus: torus,
        Authereum: authereum
      },
      web3context: null,
      languages: [
        {
          language: 'English',
          code: 'en'
        },
        {
          language: 'Japanese',
          code: 'ja'
        },
        {
          language: 'Chinese',
          code: 'zh'
        }
      ],
      positions: []
    }

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case GET_BALANCES:
            this.getBalances(payload)
            break;
          case OPEN_POSITION:
            this.openPosition(payload)
            break;
          case CLOSE_POSITION:
            this.closePosition(payload)
            break;
          case GET_POSITIONS:
            this.getPositions(payload)
            break;
          case REFRESH_POSITIONS:
            this.refreshPositions(payload)
            break;
          default: {
          }
        }
      }.bind(this)
    );
  }

  getStore(index) {
    return(this.store[index]);
  };

  setStore(obj) {
    this.store = {...this.store, ...obj}
    // console.log(this.store)
    return emitter.emit('StoreUpdated');
  };

  _checkApproval = async (asset, account, amount, contract, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.erc20address)
    try {
      console.log(account.address)
      console.log(contract)
      const allowance = await erc20Contract.methods.allowance(account.address, contract).call({ from: account.address })

      const ethAllowance = web3.utils.fromWei(allowance, "ether")

      console.log(allowance)
      console.log(ethAllowance)

      if(parseFloat(ethAllowance) < parseFloat(amount)) {
        await erc20Contract.methods.approve(contract, web3.utils.toWei(amount, "ether")).send({ from: account.address, gasPrice: web3.utils.toWei('6', 'gwei') })
        callback()
      } else {
        callback()
      }
    } catch(error) {
      if(error.message) {
        return callback(error.message)
      }
      callback(error)
    }
  }

  getBalances = async () => {
    const account = store.getStore('account')
    const assets = store.getStore('collateralOptions')

    const web3 = new Web3(store.getStore('web3context').library.provider);

    async.map(assets, (asset, callback) => {
      async.parallel([
        (callbackInner) => { this._getERC20Balance(web3, asset, account, callbackInner) },
      ], (err, data) => {
        asset.balance = data[0]

        callback(null, asset)
      })
    }, (err, assets) => {
      if(err) {
        return emitter.emit(ERROR, err)
      }

      store.setStore({ collateralOptions: assets })
      return emitter.emit(BALANCES_RETURNED, assets)
    })
  }

  _getERC20Balance = async (web3, asset, account, callback) => {
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.erc20address)

    try {
      var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
      balance = parseFloat(balance)/10**asset.decimals
      callback(null, parseFloat(balance))
    } catch(ex) {
      console.log(ex)
      return callback(ex)
    }
  }

  openPosition = (payload) => {
    const account = store.getStore('account')
    const { collateralAsset, receiveAsset, collateralAmount, leverage } = payload.content

    console.log('checking approval')
    this._checkApproval(collateralAsset, account, collateralAmount, config.dssLeverageContractAddress, (err) => {
      if(err) {
        return emitter.emit(ERROR, err);
      }

      console.log('calling leverage')
      this._callLeverage(collateralAsset, receiveAsset, account, collateralAmount, leverage, (err, openResult) => {
        if(err) {
          return emitter.emit(ERROR, err);
        }

        return emitter.emit(OPEN_POSITION_RETURNED, openResult)
      })
    })
  }

  _callLeverage = async (collateralAsset, receiveAsset, account, amount, leverage, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const dssLeverageContract = new web3.eth.Contract(config.dssLeverageContractABI, config.dssLeverageContractAddress)

    let amountToSend = 0
    if(collateralAsset.decimals === 18) {
      amountToSend = web3.utils.toWei(amount, "ether")
    } else {
      amountToSend = (amount*10**collateralAsset.decimals) + ''
    }

    console.log(amountToSend)
    console.log(leverage)

    dssLeverageContract.methods.leverage(amountToSend, leverage).send({ from: account.address, gasPrice: web3.utils.toWei('6', 'gwei') })
      .on('transactionHash', function(hash){
        console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function(confirmationNumber, receipt){
        console.log(confirmationNumber, receipt);
      })
      .on('receipt', function(receipt){
        console.log(receipt);
      })
      .on('error', function(error) {
        if (!error.toString().includes("-32601")) {
          if(error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if(error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }

  closePosition = (payload) => {
    const account = store.getStore('account')
    const { cdp } = payload.content

    console.log('checking approval')
    this._checkApprovalSettle(account, cdp, config.dssLeverageContractAddress, (err) => {
      if(err) {
        return emitter.emit(ERROR, err);
      }

      console.log('Calling close')
      this._callClose(account, cdp, (err, closeResult) => {
        if(err) {
          return emitter.emit(ERROR, err);
        }

        return emitter.emit(CLOSE_POSITION_RETURNED, closeResult)
      })
    })
  }

  _callClose = async (account, cdp, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const dssLeverageContract = new web3.eth.Contract(config.dssLeverageContractABI, config.dssLeverageContractAddress)

    dssLeverageContract.methods.close(cdp).send({ from: account.address, gasPrice: web3.utils.toWei('6', 'gwei') })
      .on('transactionHash', function(hash){
        console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function(confirmationNumber, receipt){
        console.log(confirmationNumber, receipt);
      })
      .on('receipt', function(receipt){
        console.log(receipt);
      })
      .on('error', function(error) {
        if (!error.toString().includes("-32601")) {
          if(error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if(error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }

  settlePosition = (payload) => {
    const account = store.getStore('account')
    const { amount, cdp } = payload.content

    console.log('checking approval')
    this._checkApprovalSettle(account, cdp, config.dssLeverageContractAddress, (err) => {
      if(err) {
        return emitter.emit(ERROR, err);
      }

      console.log('Calling settle')
      this._callSettle(account, amount, cdp, (err, settleResult) => {
        if(err) {
          return emitter.emit(ERROR, err);
        }

        return emitter.emit(SETTLE_POSITION_RETURNED, settleResult)
      })
    })
  }

  _checkApprovalSettle = (account, cdp, contract, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    // I have no idea????

     this._getProxyRegistry(account, web3, async (err, proxy) => {
       console.log(proxy);
       console.log(cdp);
       let manager = new web3.eth.Contract(config.managerDSSABI, config.managerDSSAddress);
       const allowed = await manager.methods.cdpCan(proxy, cdp, config.dssLeverageContractAddress).call({ from: account.address })
       console.log(allowed);
       if (allowed == 0) {
         let dssProxyActions = new web3.eth.Contract(config.dssProxyActionsAbi, config.dssProxyActionsAddress);
         const data = dssProxyActions.methods.cdpAllow(config.managerDSSAddress, cdp, config.dssLeverageContractAddress, 1).encodeABI()
         console.log(data);
         let dssProxy = new web3.eth.Contract(config.dsProxyAbi, proxy);
         console.log(dssProxy);
         const approval = await dssProxy.methods["execute(address,bytes)"](config.dssProxyActionsAddress, data).send({ from: account.address, gasPrice: web3.utils.toWei('6', 'gwei') })
         callback()
       } else {
         callback()
       }
      /* const IDssProxyActions = new ethers.utils.Interface(config.dssProxyActionsAbi)

       const cdpAllowCallbackData = IDssProxyActions
         .functions
         .cdpAllow
         .encode([
             '0x5ef30b9986345249bc32d8928B7ee64DE9435E39',
             cdp,
             proxy,
             '1'
         ])


       const dsProxyContract = new ethers.Contract(
           proxyAddress,
           config.dsProxyAbi,
           wallet
       )

       const approvedDridgeProxyAddressTx = await dsProxyContract.execute(
         '0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038',
         cdpAllowCallbackData,
         {
           gasLimit: 4000000
         }
       )

       await approvedDridgeProxyAddressTx.wait()*/
     })
  }

  _callSettle = async (account, amount, cdp, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const dssLeverageContract = new web3.eth.Contract(config.dssLeverageContractABI, config.dssLeverageContractAddress)

    let amountToSend = web3.utils.toWei(amount, "ether")

    console.log(amountToSend)
    console.log(cdp)

    dssLeverageContract.methods.settle(amountToSend, cdp).send({ from: account.address, gasPrice: web3.utils.toWei('6', 'gwei') })
      .on('transactionHash', function(hash){
        console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function(confirmationNumber, receipt){
        console.log(confirmationNumber, receipt);
      })
      .on('receipt', function(receipt){
        console.log(receipt);
      })
      .on('error', function(error) {
        if (!error.toString().includes("-32601")) {
          if(error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if(error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }

  getPositions = async (payload) => {
    const account = store.getStore('account')
    const web3 = new Web3(store.getStore('web3context').library.provider);

    this._getProxyRegistry(account, web3, (err, proxy) => {
      this._getCDPSList(account, web3, proxy, (err, cdpsList) => {
        console.log(cdpsList[0])
        async.map(cdpsList[0], (cdpId, callback) => {
          console.log(cdpId)
          this._getCDPDataContract(cdpId, callback)
        }, (err, returnData) => {

          console.log(returnData)

          this.setStore({ positions: returnData })

          return emitter.emit(POSITIONS_RETURNED, returnData)
        })
      })
    })
  }

  _getCDPDataHttp = async (id, callback) => {
    const serverUrl = 'https://defiexplore.com/api/cdps/'+id

    const resp = await fetch(serverUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const data = await resp.json();

    console.log(data)

    callback(null, data)
  }

  _getCDPDataContract = async (id, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const cdpInfoContract = new web3.eth.Contract(config.cdpInfoABI, config.cdpInfoAdress)
    const info = await cdpInfoContract.methods.getCdpDetailedInfo(id).call()
    info.id = id
    info.collateral = web3.utils.fromWei(info.collateral, "ether")
    info.debt = web3.utils.fromWei(info.debt, "ether")
    info.price = web3.utils.fromWei(info.price, "ether")
    callback(null, info)
  }

  _getCDPData = async (id, callback) => {
    const serverUrl = 'https://sai-mainnet.makerfoundation.com/v1'
    const query = `{
      getCup(id: ${id}) {
        id
        act
        art
        block
        deleted
        idx
        guy
        ink
        ire
        lad
        pip
        per
        ratio
        tab
        time
      }
    }`

    const resp = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });

    const { data } = await resp.json();

    callback(null, data)
  }

  _getProxyRegistry = async (account, web3, callback) => {
    const proxyRegistryContract = new web3.eth.Contract(config.proxyRegistryABI, config.proxyRegistryAddress)
    const proxy = await proxyRegistryContract.methods.proxies(account.address).call()

    callback(null, proxy)
  }

  _getCDPSList = async (account, web3, proxy, callback) => {
    const getCDPsContract = new web3.eth.Contract(config.getCDPsABI, config.getCDPsAddress)
    const cdps = await getCDPsContract.methods.getCdpsAsc('0x5ef30b9986345249bc32d8928B7ee64DE9435E39', proxy).call()

    callback(null, cdps)
  }

  refreshPositions = (payload) => {
    const account = store.getStore('account')
    const web3 = new Web3(store.getStore('web3context').library.provider);

    this._getProxyRegistry(account, web3, (err, proxy) => {
      this._getCDPSList(account, web3, proxy, (err, cdpsList) => {
        console.log(cdpsList[0])
        async.map(cdpsList[0], (cdpId, callback) => {
          console.log(cdpId)
          this._getCDPDataContract(cdpId, callback)
        }, (err, returnData) => {

          console.log(returnData)

          this.setStore({ positions: returnData })

          return emitter.emit(REFRESH_POSITIONS_RETURNED, returnData)
        })
      })
    })
  }
}

var store = new Store();

export default {
  store: store,
  dispatcher: dispatcher,
  emitter: emitter
};
