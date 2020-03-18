import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  MenuItem,
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
  assetSelectPlus: {
    paddingLeft: '10px',
    paddingRight: '10px',
    display: 'inline-block',
    verticalAlign: 'middle'
  }

});

class Want extends Component {
  constructor(props) {
    super()

    this.state = {
      asset: 'dai',
      assetOptions: props.receiveOptions.filter((option) => { return option.id === 'dai' }),
      assetError: false
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ assetOptions: props.receiveOptions.filter((option) => { return option.id === 'dai' }), asset: props.receiveAsset ? props.receiveAsset.id : 'dai' })
  }

  render() {
    const { classes, receiveAsset, t, receiveAmount } = this.props;
    const {
      assetOptions,
      asset
    } = this.state;

    return (
      <div className={ classes.root }>
        <div className={ classes.inputCard }>
          <Typography variant='h3' className={ classes.inputCardHeading }>{ t("Open.IWillReceive") }</Typography>
          { this.renderAssetSelect('asset', asset, assetOptions, null) }
        </div>
      </div>
    )
  };

  onChange = (event, value) => {
    let val = []
    val[event.target.name] = event.target.value
    this.setState(val)

    let asset = this.state.assetOptions.filter((asset) => { return asset.id === event.target.value})

    if(asset.length > 0) {
      asset = asset[0]
    } else {
      asset = null
    }

    var that = this;
    setTimeout(() => {
      that.props.setReceiveAsset(asset)
    })
  };

  renderAssetSelect = (id, value, options, error, sendAsset) => {

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
        disabled={ loading }
      >
        { options && options.length > 0 ? options.map(this.renderAssetOption) : null }
      </TextField>
    )
  };

  renderAssetOption = (option) => {

    const { classes } = this.props
    return (
      <MenuItem key={ option.id } value={ option.id } className={ classes.assetSelectMenu }>
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
}

export default withNamespaces()(withRouter(withStyles(styles)(Want)));
