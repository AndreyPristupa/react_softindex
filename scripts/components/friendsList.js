/**
 * Created by andreypristupa on 8/28/15.
 */

import React from 'react'
import mui from 'material-ui'

let ThemeManager = new mui.Styles.ThemeManager()
let { RaiseButton, List, ListItem, ListDivider, Avatar} = mui

export default React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  getInitialState: function() {
    return {
      friends: []
    };
  },

  componentWillReceiveProps(friends) {
    let { friend } = friends
    this.setState({
      friends: friends
    })
  },

  render() {
    console.log(this.state.friends)
    return (
      <div></div>
    )
  }
})
