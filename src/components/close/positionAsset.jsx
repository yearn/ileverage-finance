import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  Button
} from '@material-ui/core';
import { withNamespaces } from 'react-i18next';
import * as moment from 'moment'
import { colors } from '../../theme'

import {
  ERROR,
  CLOSE_POSITION,
  CLOSE_POSITION_RETURNED,
  SETTLE_POSITION,
  SETTLE_POSITION_RETURNED
} from '../../constants'

import Store from "../../stores";
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store


const styles = theme => ({
  value: {
    cursor: 'pointer'
  },
  actionInput: {
    padding: '0px 0px 12px 0px',
    fontSize: '0.5rem'
  },
  balances: {
    marginBottom: '-25px',
    marginRight: '30px',
    zIndex: '900',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
  },
  actionsContainer: {
    paddingBottom: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '100%',
    flexWrap: 'wrap',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      width: '750px',
      padding: '12px',
      flexDirection: 'row',
      justifyContent: 'center'
    }
  },
  title: {
    paddingRight: '24px'
  },
  actionButton: {
    padding: '12px',
    backgroundColor: 'white',
    borderRadius: '1rem',
    border: '1px solid #E1E1E1',
    fontWeight: 500,
    [theme.breakpoints.up('sm')]: {
      padding: '15px',
    }
  },
  tradeContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 12px 24px 12px',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      padding: '0px 12px 24px 12px',
    }
  },
  separator: {
    marginTop: '12px',
    marginBottom: '12px',
    borderBottom: '1px solid #E1E1E1'
  },
  scaleContainer: {
    width: '250px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 0px 12px 0px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  scale: {
    minWidth: '10px'
  },
  buttonText: {
    fontWeight: '700',
  },
  headingContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  heading: {
    paddingBottom: '12px',
    flex: 1,
    flexShrink: 0,
    minWidth: '50%',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  right: {
    textAlign: 'right'
  },
  infoContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '12px'
  },
  tradeContainerInfo: {
    background: '#efefef',
    padding: '18px 18px 6px 18px',
    borderRadius: '1.25em',
    width: '100%',
    marginBottom: '12px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '24px',
    }
  },
  tradeContainerCapture: {
    padding: '12px 0px',
    maxWidth: '350px'
  },
  positive: {
    color: colors.green
  },
  warning: {
    color: colors.orange
  },
  error: {
    color: colors.red
  },
  sectionSeparator: {
    borderBottom: '1px solid #DEDEDE',
    width: '100%',
    marginBottom: '36px',
    marginTop: '24px'
  }
});


class Asset extends Component {

  constructor() {
    super()

    this.state = {
      amount: '',
      amountError: false,
      ethAmount: '',
      ethAmountError: false,
      account: store.getStore('account'),
      pricePerInsurance: null,
      ethPrice: 0,
      ethBalance: 0,
      maxTokens: 0
    }
  }

  componentWillMount() {
    emitter.on(CLOSE_POSITION_RETURNED, this.closePositionReturned);
    emitter.on(SETTLE_POSITION_RETURNED, this.settlePositionReturned);
    emitter.on(ERROR, this.errorReturned);
  }

  componentWillUnmount() {
    emitter.removeListener(CLOSE_POSITION_RETURNED, this.closePositionReturned);
    emitter.removeListener(SETTLE_POSITION_RETURNED, this.settlePositionReturned);
    emitter.removeListener(ERROR, this.errorReturned);
  };

  closePositionReturned = () => {
    this.setState({ loading: false, amount: '' })
  };

  settlePositionReturned = () => {
    this.setState({ loading: false })
  };

  errorReturned = (error) => {
    this.setState({ loading: false })
  };

  render() {
    const { classes, position, t } = this.props;
    const {
      account,
      amount,
      amountError,
      loading,
    } = this.state

    return (<div className={ classes.actionsContainer }>
      <div className={ classes.headingContainer }>
        <div className={classes.heading}>
          <Typography variant={ 'h3' }>{ ( position.collateral ? parseFloat(position.collateral).toFixed(4) : '0.0000')+' ' }</Typography>
          <Typography variant={ 'h5' }>{ t('Close.Collateral') }</Typography>
        </div>
        <div className={`${classes.heading} ${classes.right}`}>
          <Typography variant={ 'h3' }>{ ( position.debt ? parseFloat(position.debt).toFixed(4) : '0.0000')+' ' }</Typography>
          <Typography variant={ 'h5' }>{ t('Close.Debt') }</Typography>
        </div>
      </div>
      <div className={ `${classes.tradeContainer} ${classes.tradeContainerCapture}` }>
        <div className={ classes.balances }>
          <Typography variant='h3' className={ classes.title }></Typography><Typography variant='h4' onClick={ () => { this.setAmount(100) } } className={ classes.value } noWrap>{ 'Balance: '+ (position.debt ? parseFloat(position.debt).toFixed(4) : '0.0000') } { '' }</Typography>
        </div>
        <div className={ classes.amountContainer }>
          <TextField
            fullWidth
            className={ classes.actionInput }
            id='amount'
            value={ amount }
            error={ amountError }
            onChange={ this.onChange }
            disabled={ loading }
            size="small"
            placeholder="0.00"
            variant="outlined"
            onKeyDown={ this.inputKeyDown }
          />
        </div>
        <div className={ classes.scaleContainer }>
          <Button
            className={ classes.scale }
            variant='text'
            disabled={ loading }
            color="primary"
            onClick={ () => { this.setAmount(25) } }>
            <Typography variant={'h5'}>25%</Typography>
          </Button>
          <Button
            className={ classes.scale }
            variant='text'
            disabled={ loading }
            color="primary"
            onClick={ () => { this.setAmount(50) } }>
            <Typography variant={'h5'}>50%</Typography>
          </Button>
          <Button
            className={ classes.scale }
            variant='text'
            disabled={ loading }
            color="primary"
            onClick={ () => { this.setAmount(75) } }>
            <Typography variant={'h5'}>75%</Typography>
          </Button>
          <Button
            className={ classes.scale }
            variant='text'
            disabled={ loading }
            color="primary"
            onClick={ () => { this.setAmount(100) } }>
            <Typography variant={'h5'}>100%</Typography>
          </Button>
        </div>
        <Button
          className={ classes.actionButton }
          variant="outlined"
          color="primary"
          disabled={ loading || !account.address }
          onClick={ this.onSettlePosition }
          >
          <Typography className={ classes.buttonText } variant={ 'h5'} color={'secondary'}>{t('Close.SettlePosition')}</Typography>
        </Button>
        <div className={ classes.separator }></div>
        <Button
          className={ classes.actionButton }
          variant="outlined"
          color="primary"
          disabled={ loading || !account.address }
          onClick={ this.onClosePosition }
          >
          <Typography className={ classes.buttonText } variant={ 'h5'} color={'secondary'}>{t('Close.ClosePosition')}</Typography>
        </Button>
      </div>
    </div>)
  };

  onChange = (event) => {
    let val = []
    val[event.target.id] = event.target.value
    this.setState(val)
  }

  inputKeyDown = (event) => {
    if (event.which === 13) {
      this.onClosePosition();
    }
  }

  onSettlePosition = () => {
    this.setState({ amountError: false })

    const { amount } = this.state

    if(!amount || isNaN(amount) || amount <= 0) {
      this.setState({ amountError: true })
      return false
    }

    this.setState({ loading: true })
    this.props.startLoading()

    dispatcher.dispatch({ type: SETTLE_POSITION, content: { cdp: this.props.position.id, amount } })
  }

  onClosePosition = () => {

    this.setState({ loading: true })
    this.props.startLoading()

    dispatcher.dispatch({ type: CLOSE_POSITION, content: { cdp: this.props.position.id } })
  }

  setAmount = (percent) => {
    if(this.state.loading) {
      return
    }

    const { position } = this.props

    const debt = position.debt
    let amount = debt*percent/100

    amount = Math.floor(amount*10000/10000);
    this.setState({ amount: amount.toFixed(0) })
  }
}

export default withNamespaces()(withRouter(withStyles(styles, { withTheme: true })(Asset)));
