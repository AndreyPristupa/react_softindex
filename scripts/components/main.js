import React, { Component, PropTypes } from 'react'
import Form from './form.js'
import FriendsList from './friendsList.js'
import mui from 'material-ui'

let ThemeManager = new mui.Styles.ThemeManager()
let { AppBar, RaisedButton, List, ListItem, ListDivider, Avatar, ActionInfo } = mui

export default React.createClass ({
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

  addNewFriend(friend) {
    let friends = this.state.friends

    friends.push(friend)

    this.setState({
      friends: friends
    })
  },

  _sort(field) {
    this.state.friends.sort((a,b) => {
      if(a[field] < b[field]) return -1;
      if(a[field] > b[field]) return 1;
      return 0;
    })
  },

  _deleteFriend(e) {
    let index = this.state.friends.indexOf(e.target.value),
        friends = this.state.friends
        friends.splice(index, 1)

    console.log(index, friends, e.target)

    this.setState({
      friends: friends
    })
  },

  render() {
    return (
      <div>
        <AppBar title="My Imagine Friends"/>
        <div className='container'>
          <Form addNewFriend={this.addNewFriend} />
        </div>
        <div className="friend-sort">

        </div>
        <div className="friends-list">
          <List>
            {this.state.friends.map((friend, index) =>
              <div>
                <ListItem
                  leftAvatar={<Avatar src="images/friend.png" />}
                  primaryText={friend.first_name + ' ' + friend.last_name + ', ' + friend.age}
                  key={index}
                  secondaryText={[
                    <b>Gender: </b>, friend.gender, <br/>,
                    <b>Phone: </b>, friend.phone, <br/>
                  ]}
                  rightIconButton={<RaisedButton label="Close" onClick={this._deleteFriend} />}
                  secondaryTextLines={2} />
                <ListDivider inset={true} />
              </div>
            )}
          </List>
        </div>
      </div>
    );
  }
})
