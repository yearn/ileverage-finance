import config from "../config";
import async from 'async';
// import * as moment from 'moment';
import {
  ERROR,
  GET_BALANCES,
  BALANCES_RETURNED,
  OPEN_POSITION,
  OPEN_POSITION_RETURNED,
  GET_DEBT_BALANCES,
  DEBT_BALANCES_RETURNED,
  TRADE_POSITION,
  TRADE_POSITION_RETURNED,
  EXIT_POSITION,
  EXIT_POSITION_RETURNED,
  CLOSE_POSITION,
  CLOSE_POSITION_RETURNED,
  WITHDRAW_PRINCIPAL,
  WITHDRAW_PRINCIPAL_RETURNED,
  REPAY_DEBT,
  REPAY_DEBT_RETURNED,
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
          case GET_DEBT_BALANCES:
            this.getDebtBalances(payload)
            break;
          case TRADE_POSITION:
            this.tradePosition(payload)
            break;
          case EXIT_POSITION:
            this.exitPosition(payload)
            break;
          case CLOSE_POSITION:
            this.closePosition(payload)
            break;
          case WITHDRAW_PRINCIPAL:
            this.withdrawPrincipal(payload)
            break;
          case REPAY_DEBT:
            this.repayDebt(payload)
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

  getDebtBalances = (payload) => {
    const account = store.getStore('account')
    const assets = store.getStore('collateralOptions')

    const web3 = new Web3(store.getStore('web3context').library.provider);

    async.map(assets, (asset, callback) => {
      async.parallel([
        (callbackInner) => { this._getDebt(web3, asset, account, callbackInner) },
        (callbackInner) => { this._getPrincipal(web3, asset, account, callbackInner) },
        (callbackInner) => { this._getUserInterest(web3, asset, account, callbackInner) },
        (callbackInner) => { this._getPosition(web3, asset, account, callbackInner) },
        (callbackInner) => { this._getERC20Balance(web3, asset, account, callbackInner) },
      ], (err, data) => {
        asset.debt = data[0]
        asset.principal = data[1]
        asset.interest = data[2]
        asset.position = data[3]
        asset.balance = data[4]

        callback(null, asset)
      })
    }, (err, assets) => {
      if(err) {
        return emitter.emit(ERROR, err)
      }

      store.setStore({ collateralOptions: assets })
      return emitter.emit(DEBT_BALANCES_RETURNED, assets)
    })
  }

  _getDebt = async (web3, asset, account, callback) => {
    let traderContract = new web3.eth.Contract(config.traderContractABI, config.traderContractAddress)

    try {
      let debt = await traderContract.methods.getUserDebt(asset.erc20address, account.address).call({ from: account.address });
      if(debt > (10**30)) {
        debt = 0
      }
      debt = parseFloat(debt)/10**asset.decimals
      callback(null, parseFloat(debt))
    } catch(ex) {
      console.log(ex)
      return callback(ex)
    }
  }

  _getPrincipal = async (web3, asset, account, callback) => {
    let traderContract = new web3.eth.Contract(config.traderContractABI, config.traderContractAddress)

    try {
      let principal = await traderContract.methods.principals(asset.erc20address, account.address).call({ from: account.address });
      principal = parseFloat(principal)/10**asset.decimals
      callback(null, parseFloat(principal))
    } catch(ex) {
      console.log(ex)
      return callback(ex)
    }
  }

  _getUserInterest = async (web3, asset, account, callback) => {
    let traderContract = new web3.eth.Contract(config.traderContractABI, config.traderContractAddress)

    try {
      let interest = await traderContract.methods.getUserInterest(asset.erc20address, account.address).call({ from: account.address });
      if(interest > (10**30)) {
        interest = 0
      }
      interest = parseFloat(interest)/10**asset.decimals
      callback(null, parseFloat(interest))
    } catch(ex) {
      console.log(ex)
      return callback(ex)
    }
  }

  _getPosition = async (web3, asset, account, callback) => {
    let traderContract = new web3.eth.Contract(config.traderContractABI, config.traderContractAddress)

    try {
      let position = await traderContract.methods.positions(asset.erc20address, account.address).call({ from: account.address });
      position = parseFloat(position)/10**asset.decimals
      callback(null, parseFloat(position))
    } catch(ex) {
      console.log(ex)
      return callback(ex)
    }
  }

  tradePosition = (payload) => {
    const account = store.getStore('account')
    const { collateralAsset, receiveAsset, collateralAmount } = payload.content

    this._callITradePosition(collateralAsset, receiveAsset, account, collateralAmount, (err, tradeResult) => {
      if(err) {
        return emitter.emit(ERROR, err);
      }

      return emitter.emit(TRADE_POSITION_RETURNED, tradeResult)
    })
  }

  _callITradePosition = async (collateralAsset, receiveAsset, account, amount, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const collateralContract = new web3.eth.Contract(config.traderContractABI, config.traderContractAddress)

    var amountToSend = (amount*10**collateralAsset.decimals) + ''
    var amountToReceive = (amount*0.97*10**receiveAsset.decimals).toFixed(0) + ''

    collateralContract.methods.tradePosition(collateralAsset.erc20address, receiveAsset.erc20address, amountToSend, amountToReceive).send({ from: account.address, gasPrice: web3.utils.toWei('6', 'gwei') })
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

  repayDebt = (payload) => {
    const account = store.getStore('account')
    const { asset, amount } = payload.content

    this._checkApproval(asset, account, amount, config.traderContractAddress, (err) => {
      if(err) {
        return emitter.emit(ERROR, err);
      }
      this._callRepayDebt(asset, account, amount, (err, res) => {
        if(err) {
          return emitter.emit(ERROR, err);
        }

        return emitter.emit(REPAY_DEBT_RETURNED, res)
      })
    })
  }

  _callRepayDebt = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const collateralContract = new web3.eth.Contract(config.traderContractABI, config.traderContractAddress)

    var amountToSend = (amount*10**asset.decimals) + ''

    collateralContract.methods.repayDebt(asset.erc20address, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei('6', 'gwei') })
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

  withdrawPrincipal = (payload) => {
    const account = store.getStore('account')
    const { asset, amount } = payload.content

    this._callWithdrawCollateral(asset, account, amount, (err, res) => {
      if(err) {
        return emitter.emit(ERROR, err);
      }

      return emitter.emit(WITHDRAW_PRINCIPAL_RETURNED, res)
    })
  }

  _callWithdrawCollateral = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const collateralContract = new web3.eth.Contract(config.traderContractABI, config.traderContractAddress)

    var amountToSend = (amount*10**asset.decimals) + ''

    collateralContract.methods.withdrawCollateral(asset.erc20address, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei('6', 'gwei') })
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
    const { asset, amount } = payload.content

    this._callClosePosition(asset, account, amount, (err, res) => {
      if(err) {
        return emitter.emit(ERROR, err);
      }

      return emitter.emit(CLOSE_POSITION_RETURNED, res)
    })
  }

  _callClosePosition = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const collateralContract = new web3.eth.Contract(config.traderContractABI, config.traderContractAddress)

    var amountToSend = (amount*10**asset.decimals) + ''

    console.log(asset.erc20address)
    console.log(amountToSend)

    collateralContract.methods.closePosition(asset.erc20address, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei('6', 'gwei') })
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

  exitPosition = (payload) => {
    const account = store.getStore('account')
    const { asset } = payload.content

    this._callExit(asset, account, (err, res) => {
      if(err) {
        return emitter.emit(ERROR, err);
      }

      return emitter.emit(EXIT_POSITION_RETURNED, res)
    })
  }

  _callExit = async (asset, account, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const collateralContract = new web3.eth.Contract(config.traderContractABI, config.traderContractAddress)

    collateralContract.methods.exitReserve(asset.erc20address).send({ from: account.address, gasPrice: web3.utils.toWei('6', 'gwei') })
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
}

var store = new Store();

export default {
  store: store,
  dispatcher: dispatcher,
  emitter: emitter
};
