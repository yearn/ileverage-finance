const config = {
  dssLeverageContractAddress: '0x4c14ed0b3cac97939053be31150bdbb6f1ddbca2',
  dssLeverageContractABI: [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"number","type":"uint256"}],"internalType":"struct Structs.Info","name":"accountInfo","type":"tuple"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"callFunction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_cdp","type":"uint256"}],"name":"close","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"dai","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"apt","type":"address"},{"internalType":"address","name":"urn","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"daiJoin_join","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"daijoin","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dydx","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"flux","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"int256","name":"dink","type":"int256"},{"internalType":"int256","name":"dart","type":"int256"}],"name":"frob","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"apt","type":"address"},{"internalType":"address","name":"urn","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"gemJoin_join","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"usr","type":"address"}],"name":"give","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"proxyRegistry","type":"address"},{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"}],"name":"giveToProxy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_leverage","type":"uint256"}],"name":"isLeverage","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"jug","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_leverage","type":"uint256"}],"name":"leverage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wadC","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"}],"name":"lockGemAndDraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"one","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"address","name":"usr","type":"address"}],"name":"open","outputs":[{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"uint256","name":"wadC","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"}],"name":"openLockGemAndDraw","outputs":[{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"proxy","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"registry","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"save","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_dai","type":"uint256"},{"internalType":"uint256","name":"_cdp","type":"uint256"}],"name":"settle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"usdc","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"usdcilk","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"usdcjoin","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wadC","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"}],"name":"wipeAndFreeGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],

  proxyRegistryAddress: '0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4',
  proxyRegistryABI: [{"constant":false,"inputs":[],"name":"build","outputs":[{"name":"proxy","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"proxies","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"}],"name":"build","outputs":[{"name":"proxy","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"factory_","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}],

  getCDPsAddress: '0x36a724bd100c39f0ea4d3a20f7097ee01a8ff573',
  getCDPsABI: [{"constant":true,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"guy","type":"address"}],"name":"getCdpsAsc","outputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"address[]","name":"urns","type":"address[]"},{"internalType":"bytes32[]","name":"ilks","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"guy","type":"address"}],"name":"getCdpsDesc","outputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"address[]","name":"urns","type":"address[]"},{"internalType":"bytes32[]","name":"ilks","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"}],

  cdpInfoAdress: '0x1637d405f61a6c6aa54d0a28fab85b7ea9e81932',
  cdpInfoABI: [{"constant":true,"inputs":[],"name":"CDAI_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"COMPOUND_DAI_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DAI_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DAI_JOIN_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DISCOUNT_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ETH2DAI_WRAPPER","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ETH_ILK","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ETH_JOIN_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FACTORY_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GAS_TOKEN_INTERFACE_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"IDAI_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"JUG_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"KYBER_ETH_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"KYBER_INTERFACE","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"KYBER_WRAPPER","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"LOGGER_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAKER_DAI_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MANAGER_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MIGRATION_ACTIONS_PROXY","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MKR_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MONITOR_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NEW_CDAI_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NEW_IDAI_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"OASIS_WRAPPER","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"OTC_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PETH_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PIP_INTERFACE_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PROXY_ACTIONS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PROXY_REGISTRY_INTERFACE_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SAI_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SAVER_EXCHANGE_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SAVINGS_LOGGER_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SCD_MCD_MIGRATION","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SERVICE_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SOLO_MARGIN_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SPOTTER_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"STUPID_EXCHANGE","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SUBSCRIPTION_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"TUB_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"UNISWAP_FACTORY","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"UNISWAP_WRAPPER","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VAT_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VOX_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"WALLET_ID","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"WETH_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_cdpId","type":"uint256"},{"internalType":"address","name":"_joinAddr","type":"address"},{"internalType":"uint256","name":"_daiAmount","type":"uint256"},{"internalType":"uint256","name":"_minPrice","type":"uint256"},{"internalType":"uint256","name":"_exchangeType","type":"uint256"},{"internalType":"uint256","name":"_gasCost","type":"uint256"}],"name":"boost","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"daiJoin","outputs":[{"internalType":"contract DaiJoin","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_cdpId","type":"uint256"}],"name":"getCdpDetailedInfo","outputs":[{"internalType":"uint256","name":"collateral","type":"uint256"},{"internalType":"uint256","name":"debt","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"bytes32","name":"ilk","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"contract Manager","name":"_manager","type":"address"},{"internalType":"uint256","name":"_cdpId","type":"uint256"},{"internalType":"bytes32","name":"_ilk","type":"bytes32"}],"name":"getCdpInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_cdpId","type":"uint256"},{"internalType":"bytes32","name":"_ilk","type":"bytes32"}],"name":"getMaxCollateral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_cdpId","type":"uint256"},{"internalType":"bytes32","name":"_ilk","type":"bytes32"}],"name":"getMaxDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"contract Manager","name":"_manager","type":"address"},{"internalType":"uint256","name":"_cdpId","type":"uint256"}],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_ilk","type":"bytes32"}],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_cdpId","type":"uint256"},{"internalType":"bytes32","name":"_ilk","type":"bytes32"}],"name":"getRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"internalType":"contract Manager","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_cdpId","type":"uint256"},{"internalType":"address","name":"_joinAddr","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_minPrice","type":"uint256"},{"internalType":"uint256","name":"_exchangeType","type":"uint256"},{"internalType":"uint256","name":"_gasCost","type":"uint256"}],"name":"repay","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"spotter","outputs":[{"internalType":"contract Spotter","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"vat","outputs":[{"internalType":"contract Vat","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}],

  managerDSSAddress: '0x5ef30b9986345249bc32d8928B7ee64DE9435E39',

  managerDSSABI: [{"inputs":[{"internalType":"address","name":"vat_","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":true,"inputs":[{"indexed":true,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":true,"internalType":"address","name":"usr","type":"address"},{"indexed":true,"internalType":"bytes32","name":"arg1","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"arg2","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"usr","type":"address"},{"indexed":true,"internalType":"address","name":"own","type":"address"},{"indexed":true,"internalType":"uint256","name":"cdp","type":"uint256"}],"name":"NewCdp","type":"event"},{"constant":false,"inputs":[{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"ok","type":"uint256"}],"name":"cdpAllow","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"cdpCan","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cdpi","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"}],"name":"enter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"first","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"flux","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"flux","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"int256","name":"dink","type":"int256"},{"internalType":"int256","name":"dart","type":"int256"}],"name":"frob","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"}],"name":"give","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ilks","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"last","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"list","outputs":[{"internalType":"uint256","name":"prev","type":"uint256"},{"internalType":"uint256","name":"next","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"address","name":"usr","type":"address"}],"name":"open","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"owns","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"}],"name":"quit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"cdpSrc","type":"uint256"},{"internalType":"uint256","name":"cdpDst","type":"uint256"}],"name":"shift","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"ok","type":"uint256"}],"name":"urnAllow","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"urnCan","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"urns","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"vat","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}],

  dssProxyActionsAddress: '0x82ecD135Dce65Fbc6DbdD0e4237E0AF93FFD5038',

  dssProxyActionsAbi: [{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"ok","type":"uint256"}],"name":"cdpAllow","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"apt","type":"address"},{"internalType":"address","name":"urn","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"daiJoin_join","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"draw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"src","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"}],"name":"enter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"apt","type":"address"},{"internalType":"address","name":"urn","type":"address"}],"name":"ethJoin_join","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"exitETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"exitGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"flux","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"freeETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"freeGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"int256","name":"dink","type":"int256"},{"internalType":"int256","name":"dart","type":"int256"}],"name":"frob","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"apt","type":"address"},{"internalType":"address","name":"urn","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"},{"internalType":"bool","name":"transferFrom","type":"bool"}],"name":"gemJoin_join","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"usr","type":"address"}],"name":"give","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"proxyRegistry","type":"address"},{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"}],"name":"giveToProxy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"obj","type":"address"},{"internalType":"address","name":"usr","type":"address"}],"name":"hope","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"}],"name":"lockETH","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"}],"name":"lockETHAndDraw","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"},{"internalType":"bool","name":"transferFrom","type":"bool"}],"name":"lockGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wadC","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"},{"internalType":"bool","name":"transferFrom","type":"bool"}],"name":"lockGemAndDraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"gemJoin","type":"address"}],"name":"makeGemBag","outputs":[{"internalType":"address","name":"bag","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"obj","type":"address"},{"internalType":"address","name":"usr","type":"address"}],"name":"nope","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"address","name":"usr","type":"address"}],"name":"open","outputs":[{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"uint256","name":"wadD","type":"uint256"}],"name":"openLockETHAndDraw","outputs":[{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"gntJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"uint256","name":"wadC","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"}],"name":"openLockGNTAndDraw","outputs":[{"internalType":"address","name":"bag","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"uint256","name":"wadC","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"},{"internalType":"bool","name":"transferFrom","type":"bool"}],"name":"openLockGemAndDraw","outputs":[{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"}],"name":"quit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"safeLockETH","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"},{"internalType":"bool","name":"transferFrom","type":"bool"},{"internalType":"address","name":"owner","type":"address"}],"name":"safeLockGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"safeWipe","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"safeWipeAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdpSrc","type":"uint256"},{"internalType":"uint256","name":"cdpOrg","type":"uint256"}],"name":"shift","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"gem","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"ok","type":"uint256"}],"name":"urnAllow","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"wipe","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"}],"name":"wipeAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wadC","type":"uint256"}],"name":"wipeAllAndFreeETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wadC","type":"uint256"}],"name":"wipeAllAndFreeGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wadC","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"}],"name":"wipeAndFreeETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wadC","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"}],"name":"wipeAndFreeGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],

  dsProxyAbi: [
      {
          "constant": false,
          "inputs": [
              {
                  "name": "owner_",
                  "type": "address"
              }
          ],
          "name": "setOwner",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [
              {
                  "name": "_target",
                  "type": "address"
              },
              {
                  "name": "_data",
                  "type": "bytes"
              }
          ],
          "name": "execute",
          "outputs": [
              {
                  "name": "response",
                  "type": "bytes32"
              }
          ],
          "payable": true,
          "stateMutability": "payable",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [
              {
                  "name": "_code",
                  "type": "bytes"
              },
              {
                  "name": "_data",
                  "type": "bytes"
              }
          ],
          "name": "execute",
          "outputs": [
              {
                  "name": "target",
                  "type": "address"
              },
              {
                  "name": "response",
                  "type": "bytes32"
              }
          ],
          "payable": true,
          "stateMutability": "payable",
          "type": "function"
      },
      {
          "constant": true,
          "inputs": [],
          "name": "cache",
          "outputs": [
              {
                  "name": "",
                  "type": "address"
              }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [
              {
                  "name": "authority_",
                  "type": "address"
              }
          ],
          "name": "setAuthority",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": true,
          "inputs": [],
          "name": "owner",
          "outputs": [
              {
                  "name": "",
                  "type": "address"
              }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [
              {
                  "name": "_cacheAddr",
                  "type": "address"
              }
          ],
          "name": "setCache",
          "outputs": [
              {
                  "name": "",
                  "type": "bool"
              }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": true,
          "inputs": [],
          "name": "authority",
          "outputs": [
              {
                  "name": "",
                  "type": "address"
              }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "name": "_cacheAddr",
                  "type": "address"
              }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "constructor"
      },
      {
          "payable": true,
          "stateMutability": "payable",
          "type": "fallback"
      },
      {
          "anonymous": true,
          "inputs": [
              {
                  "indexed": true,
                  "name": "sig",
                  "type": "bytes4"
              },
              {
                  "indexed": true,
                  "name": "guy",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "name": "foo",
                  "type": "bytes32"
              },
              {
                  "indexed": true,
                  "name": "bar",
                  "type": "bytes32"
              },
              {
                  "indexed": false,
                  "name": "wad",
                  "type": "uint256"
              },
              {
                  "indexed": false,
                  "name": "fax",
                  "type": "bytes"
              }
          ],
          "name": "LogNote",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "name": "authority",
                  "type": "address"
              }
          ],
          "name": "LogSetAuthority",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "name": "owner",
                  "type": "address"
              }
          ],
          "name": "LogSetOwner",
          "type": "event"
      }
  ],

  erc20ABI: [
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "_spender",
  				"type": "address"
  			},
  			{
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "approve",
  		"outputs": [
  			{
  				"name": "success",
  				"type": "bool"
  			}
  		],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "_to",
  				"type": "address"
  			},
  			{
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "showMeTheMoney",
  		"outputs": [],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "_to",
  				"type": "address"
  			},
  			{
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "transfer",
  		"outputs": [
  			{
  				"name": "success",
  				"type": "bool"
  			}
  		],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "_from",
  				"type": "address"
  			},
  			{
  				"name": "_to",
  				"type": "address"
  			},
  			{
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "transferFrom",
  		"outputs": [
  			{
  				"name": "success",
  				"type": "bool"
  			}
  		],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"anonymous": false,
  		"inputs": [
  			{
  				"indexed": true,
  				"name": "_from",
  				"type": "address"
  			},
  			{
  				"indexed": true,
  				"name": "_to",
  				"type": "address"
  			},
  			{
  				"indexed": false,
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "Transfer",
  		"type": "event"
  	},
  	{
  		"anonymous": false,
  		"inputs": [
  			{
  				"indexed": true,
  				"name": "_owner",
  				"type": "address"
  			},
  			{
  				"indexed": true,
  				"name": "_spender",
  				"type": "address"
  			},
  			{
  				"indexed": false,
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "Approval",
  		"type": "event"
  	},
  	{
  		"constant": true,
  		"inputs": [
  			{
  				"name": "_owner",
  				"type": "address"
  			},
  			{
  				"name": "_spender",
  				"type": "address"
  			}
  		],
  		"name": "allowance",
  		"outputs": [
  			{
  				"name": "remaining",
  				"type": "uint256"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [
  			{
  				"name": "_owner",
  				"type": "address"
  			}
  		],
  		"name": "balanceOf",
  		"outputs": [
  			{
  				"name": "balance",
  				"type": "uint256"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [],
  		"name": "decimals",
  		"outputs": [
  			{
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [],
  		"name": "name",
  		"outputs": [
  			{
  				"name": "",
  				"type": "string"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [],
  		"name": "symbol",
  		"outputs": [
  			{
  				"name": "",
  				"type": "string"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [],
  		"name": "totalSupply",
  		"outputs": [
  			{
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	}
  ],
};

export default config;
