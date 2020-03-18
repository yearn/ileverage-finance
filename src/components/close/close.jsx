import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  Typography,
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withNamespaces } from 'react-i18next';

import UnlockModal from '../unlock/unlockModal.jsx'
import Snackbar from '../snackbar'
import Loader from '../loader'
import PositionAsset from './positionAsset'

import {
  ERROR,
  GET_POSITIONS,
  POSITIONS_RETURNED,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  CLOSE_POSITION_RETURNED,
  SETTLE_POSITION_RETURNED
} from '../../constants'

import Store from "../../stores";
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1200px',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  insuranceContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    minWidth: '100%',
    [theme.breakpoints.up('md')]: {
      minWidth: '900px',
    }
  },
  intro: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  introCenter: {
    maxWidth: '500px',
    textAlign: 'center',
    display: 'flex',
    padding: '48px 0px'
  },
  introText: {
  },
  placeholder: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      width: '130px',
      display: 'block'
    }
  },
  addressContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '100px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: '0.83rem',
    textOverflow:'ellipsis',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '0.75rem',
    height: 'max-content',
    [theme.breakpoints.up('md')]: {
      maxWidth: '130px',
      width: '100%'
    }
  },
  connectContainer: {
    padding: '12px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '450px',
    [theme.breakpoints.up('md')]: {
      width: '450',
    }
  },
  actionButton: {
    '&:hover': {
      backgroundColor: "#2F80ED",
    },
    padding: '12px',
    backgroundColor: "#2F80ED",
    borderRadius: '1rem',
    border: '1px solid #E1E1E1',
    fontWeight: 500,
    [theme.breakpoints.up('md')]: {
      padding: '15px',
    }
  },
  buttonText: {
    fontWeight: '700',
    color: 'white',
  },
  expansionPanel: {
    maxWidth: 'calc(100vw - 24px)',
    width: '100%'
  },
  heading: {
    display: 'none',
    paddingTop: '12px',
    flex: 1,
    [theme.breakpoints.up('sm')]: {
      paddingTop: '5px',
      display: 'block',
      padding: '0px 12px'
    }
  },
  headingName: {
    paddingTop: '5px',
    flex: 1,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    minWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      minWidth: 'auto',
    }
  },
  assetSummary: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap'
    }
  },
  assetIcon: {
    display: 'flex',
    alignItems: 'center',
    verticalAlign: 'middle',
    borderRadius: '20px',
    height: '30px',
    width: '80px',
    textAlign: 'center',
    cursor: 'pointer',
    marginRight: '20px',
    [theme.breakpoints.up('sm')]: {
      height: '40px',
      width: '100px',
      marginRight: '24px',
    }
  },
  disaclaimer: {
    padding: '12px',
    border: '1px solid rgb(174, 174, 174)',
    borderRadius: '0.75rem',
    marginBottom: '24px',
  }
});

class Close extends Component {

  constructor(props) {
    super()

    const account = store.getStore('account')

    this.state = {
      positions: store.getStore('positions'),
      account: account,
      modalOpen: false,
      modalInvestAllOpen: false,
      snackbarType: null,
      snackbarMessage: null,
      expanded: 'oCurve.fi'
    }

    if(account && account.address) {
      dispatcher.dispatch({ type: GET_POSITIONS, content: {} });
    }
  }
  componentWillMount() {
    emitter.on(ERROR, this.errorReturned);
    emitter.on(POSITIONS_RETURNED, this.positionsReturned);
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.on(CLOSE_POSITION_RETURNED, this.closePositionReturned);
    emitter.on(SETTLE_POSITION_RETURNED, this.settlePositionReturned);
  }

  componentWillUnmount() {
    emitter.removeListener(ERROR, this.errorReturned);
    emitter.removeListener(POSITIONS_RETURNED, this.positionsReturned);
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.removeListener(CLOSE_POSITION_RETURNED, this.closePositionReturned);
    emitter.removeListener(SETTLE_POSITION_RETURNED, this.settlePositionReturned);
  };

  refresh() {
    dispatcher.dispatch({ type: GET_POSITIONS, content: {} });
  }

  closePositionReturned = () => {
    this.setState({ loading: false })
  };

  settlePositionReturned = () => {
    this.setState({ loading: false })
  };

  positionsReturned = (balances) => {
    this.setState({ positions: store.getStore('positions') })
    setTimeout(this.refresh,15000);
  };

  connectionConnected = () => {
    this.setState({ account: store.getStore('account') })

    const { t } = this.props

    dispatcher.dispatch({ type: GET_POSITIONS, content: {} });

    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: t("Unlock.WalletConnected"), snackbarType: 'Info' }
      that.setState(snackbarObj)
    })
  };

  connectionDisconnected = () => {
    this.setState({ account: store.getStore('account') })
  }

  errorReturned = (error) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null }
    this.setState(snackbarObj)
    this.setState({ loading: false })
    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: error.toString(), snackbarType: 'Error' }
      that.setState(snackbarObj)
    })
  };

  render() {
    const { classes, t } = this.props;
    const {
      loading,
      account,
      modalOpen,
      snackbarMessage,
    } = this.state

    var address = null;
    if (account.address) {
      address = account.address.substring(0,6)+'...'+account.address.substring(account.address.length-4,account.address.length)
    }

    return (
      <div className={ classes.root }>
        <div className={ classes.insuranceContainer }>
        <Typography variant={'h5'} className={ classes.disaclaimer }>This project is in beta. Use at your own risk.</Typography>
        { account.address &&
            <div className={ classes.intro }>
              <div className={ classes.placeholder }>
              </div>
              <Typography variant='h2' className={ classes.introText }>{ t('Close.Intro') }</Typography>
              <Card className={ classes.addressContainer } onClick={this.overlayClicked}>
                <Typography variant={ 'h5'} noWrap>{ address }</Typography>
                <div style={{ background: '#DC6BE5', opacity: '1', borderRadius: '10px', width: '10px', height: '10px', marginRight: '3px', marginTop:'3px', marginLeft:'6px' }}></div>
              </Card>
            </div>
          }
          { !account.address &&
            <div className={ classes.introCenter }>
              <Typography variant='h2'>{ t('Close.Intro') }</Typography>
            </div>
          }

          {!account.address &&
            <div className={ classes.connectContainer }>
              <Button
                className={ classes.actionButton }
                variant="outlined"
                color="primary"
                disabled={ loading }
                onClick={ this.overlayClicked }
                >
                <Typography className={ classes.buttonText } variant={ 'h5'}>{ t('Close.Connect') }</Typography>
              </Button>
            </div>
          }
          { account.address && this.renderAssetBlocks() }
        </div>
        { loading && <Loader /> }
        { modalOpen && this.renderModal() }
        { snackbarMessage && this.renderSnackbar() }
      </div>
    )
  };

  onChange = (event) => {
    let val = []
    val[event.target.id] = event.target.checked
    this.setState(val)
  };

  renderAssetBlocks = () => {
    const { positions, expanded } = this.state
    const { classes, t } = this.props
    const width = window.innerWidth

    return positions.map((position) => {
      return (
        <ExpansionPanel className={ classes.expansionPanel } square key={ position.id+"_expand" } expanded={ expanded === position.id} onChange={ () => { this.handleChange(position.id) } }>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className={ classes.assetSummary }>
              <div className={classes.heading}>
                <Typography variant={ 'h3' }>{ position.id }</Typography>
                <Typography variant={ 'h5' }>{ t('Close.AssetId') }</Typography>
              </div>
              <div className={classes.heading}>
                <Typography variant={ 'h3' }>{ (position.collateral ? parseFloat(position.collateral).toFixed(4) : '0.0000')+' ' }</Typography>
                <Typography variant={ 'h5' }>{ t('Close.Collateral') }</Typography>
              </div>
              <div className={classes.heading}>
                <Typography variant={ 'h3' }>{ (position.debt > 0 ? parseFloat(position.debt).toFixed(4) : '0.0000')+' '}</Typography>
                <Typography variant={ 'h5' }>{ t('Close.Debt') }</Typography>
              </div>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <PositionAsset position={ position } startLoading={ this.startLoading } />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    })
  }

  handleChange = (id) => {
    this.setState({ expanded: this.state.expanded === id ? null : id })
  }

  startLoading = () => {
    this.setState({ loading: true })
  }

  renderSnackbar = () => {
    var {
      snackbarType,
      snackbarMessage
    } = this.state
    return <Snackbar type={ snackbarType } message={ snackbarMessage } open={true}/>
  };

  renderModal = () => {
    return (
      <UnlockModal closeModal={ this.closeModal } modalOpen={ this.state.modalOpen } />
    )
  }

  overlayClicked = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(Close)));
