import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Select,
  MenuItem,
  FormControl
} from '@material-ui/core';
import {
  Link
} from "react-router-dom";
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n';
import { colors } from '../../theme'

import Store from "../../stores";
const store = Store.store

const styles = theme => ({
  footer: {
    padding: '24px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
    }
  },
  footerLinks: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '420px'
  },
  footerText: {
    cursor: 'pointer'
  },
  languageContainer: {
    paddingLeft: '12px',
    display: 'none'
  },
  selectInput: {
    fontSize: '14px',
    color: colors.pink
  },
  link: {
    textDecoration: 'none'
  }
});


class Footer extends Component {

  constructor(props) {
    super()

    this.state = {
      languages: store.getStore('languages'),
      language: 'en',
    }
  }

  render() {
    const { classes, t, location } = this.props;
    const {
      languages,
      language
    } = this.state

    if(!location.pathname.includes('/open') && !location.pathname.includes('/close')) {
      return null
    }

    return (
      <div className={classes.footer}>
        <div className={classes.footerLinks}>
          <Link to={"/"} className={ classes.link }>
            <Typography className={ classes.footerText } variant={ 'h6'}>{ t('Footer.Home') }</Typography>
          </Link>
        </div>
        <div className={ classes.languageContainer }>
          <FormControl variant="outlined">
            <Select
              id="language"
              value={ language }
              onChange={ this.handleLanguageChange }
              inputProps={{ className: classes.selectInput }}
              color="primary"
              fullWidth
            >
              { languages.map((language) => {
                return <MenuItem key={ language.code } value={ language.code }>{ language.language }</MenuItem>
              })}
            </Select>
          </FormControl>
        </div>
      </div>
    )
  }

  handleLanguageChange = (event) => {
    let val = []
    val.language = event.target.value
    this.setState(val)

    i18n.changeLanguage(event.target.value)
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(Footer)));
