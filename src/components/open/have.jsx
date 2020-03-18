import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  MenuItem,
  TextField,
  Button,
  InputAdornment
} from '@material-ui/core';

import { withNamespaces } from 'react-i18next';

import Store from "../../stores";
const store = Store.store

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: '100%'
  },
  inputCard: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  inputCardHeading: {
    width: '100%',
    padding: '12px 0px 12px 20px'
  },
  assetSelectRoot: {
    borderRadius: '1.25rem'
  },
  assetSelectMenu: {
    padding: '15px 15px 15px 20px',
    minWidth: '200px',
  },
  assetSelectIcon: {
    display: 'inline-block',
    verticalAlign: 'middle',
    borderRadius: '25px',
    background: '#dedede',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    cursor: 'pointer'
  },
  assetSelectIconName: {
    paddingLeft: '10px',
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  tradeContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 0px 12px 0px',
    alignItems: 'center'
  },
  balances: {
    marginBottom: '-25px',
    marginRight: '30px',
    zIndex: '900',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: '10px',
    cursor: 'pointer'
  },
  title: {
    paddingRight: '24px'
  },
  scaleContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '0px 0px 12px 0px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  scale: {
    minWidth: '10px'
  },
  actionInput: {
    padding: '0px 0px 12px 0px',
    fontSize: '0.5rem'
  },
  inputAdornment: {
    fontWeight: '600',
    fontSize: '1.5rem'
  },

});

class Have extends Component {
  constructor(props) {
    super()

    this.state = {
      asset: 'usdc',
      assetOptions: props.collateralOptions.filter((option) => { return option.id === 'usdc' }),
      assetError: false,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ assetOptions: props.collateralOptions.filter((option) => { return option.id === 'usdc' }), asset: props.collateralAsset.id })
  }

  render() {
    const { classes, collateralAsset, collateralAmount, collateralAmountError, loading, t } = this.props;
    const {
      asset,
      assetOptions,
      assetError,
      amount,
      amountError
    } = this.state;

    return (
      <div className={ classes.root }>
        <div className={ classes.inputCard }>
          <Typography variant='h3' className={ classes.inputCardHeading }>{ t("Open.IHave") }</Typography>
          <div className={ classes.tradeContainer }>
            { collateralAsset && <div className={ classes.balances }>
                <Typography variant='h3' className={ classes.title }></Typography><Typography variant='h4' onClick={ () => { this.props.setCollateralAmountPercent(100) } } className={ classes.value } noWrap>{ 'Balance: '+ ( collateralAsset.balance ? (Math.floor(collateralAsset.balance*10000)/10000).toFixed(4) : '0.0000') } { collateralAsset.symbol }</Typography>
            </div> }
            { this.renderAssetSelect('asset', asset, assetOptions, assetError) }
          </div>
          <div className={ classes.tradeContainer }>
            { this.renderAmountInput('amount', collateralAmount, collateralAmountError, 'Amount', '0.00', (collateralAsset ? collateralAsset.symbol : '')) }
            <div className={ classes.scaleContainer }>
              <Button
                className={ classes.scale }
                variant='text'
                disabled={ loading }
                color="primary"
                onClick={ () => { this.props.setCollateralAmountPercent(25) } }>
                <Typography variant={'h5'}>25%</Typography>
              </Button>
              <Button
                className={ classes.scale }
                variant='text'
                disabled={ loading }
                color="primary"
                onClick={ () => { this.props.setCollateralAmountPercent(50) } }>
                <Typography variant={'h5'}>50%</Typography>
              </Button>
              <Button
                className={ classes.scale }
                variant='text'
                disabled={ loading }
                color="primary"
                onClick={ () => { this.props.setCollateralAmountPercent(75) } }>
                <Typography variant={'h5'}>75%</Typography>
              </Button>
              <Button
                className={ classes.scale }
                variant='text'
                disabled={ loading }
                color="primary"
                onClick={ () => { this.props.setCollateralAmountPercent(100) } }>
                <Typography variant={'h5'}>100%</Typography>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  };

  onChange = (event, value) => {
    let val = []
    val[event.target.name] = event.target.value
    this.setState(val)

    let asset = this.state.assetOptions.filter((asset) => { return asset.id === event.target.value })

    if(asset.length > 0) {
      asset = asset[0]
    } else {
      asset = null
    }
    var that = this;
    setTimeout(() => {
      that.props.setCollateralAsset(asset)
    })

  };

  renderAssetSelect = (id, value, options, error) => {

    const { loading } = this.props

    return (
      <TextField
        id={ id }
        name={ id }
        select
        value={ value }
        onChange={ this.onChange }
        SelectProps={{
          native: false,
        }}
        variant="outlined"
        fullWidth
        disabled={ loading }
      >
        { options && options.length > 0 ? options.map(this.renderAssetOption) : null }
      </TextField>
    )
  };

  renderAssetOption = (option) => {

    const { classes } = this.props

    return (
      <MenuItem key={option.id} value={option.id} className={ classes.assetSelectMenu }>
        <React.Fragment>
          <div className={ classes.assetSelectIcon }>
            <img
              alt=""
              src={ require('../../assets/'+option.symbol+'-logo.png') }
              height="30px"
            />
          </div>
          <div className={ classes.assetSelectIconName }>
            <Typography variant='h2'>{ option.symbol }</Typography>
          </div>
        </React.Fragment>
      </MenuItem>
    )
  }

  renderAmountInput = (id, value, error, label, placeholder, inputAdornment) => {

    const { classes, loading } = this.props

    return (
      <TextField
        fullWidth
        className={ classes.actionInput }
        id={ id }
        name={ id }
        value={ value }
        error={ error }
        onChange={ (e) => { this.props.setCollateralAmount(e.target.value) } }
        disabled={ loading }
        placeholder={ placeholder }
        variant="outlined"
        InputProps={{
          endAdornment: <InputAdornment position="end" className={ classes.inputAdornment }><Typography variant='h3'>{ inputAdornment }</Typography></InputAdornment>,
        }}
      />
    )
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(Have)));
