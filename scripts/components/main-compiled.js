'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formJs = require('./form.js');

var _formJs2 = _interopRequireDefault(_formJs);

var _friendsListJs = require('./friendsList.js');

var _friendsListJs2 = _interopRequireDefault(_friendsListJs);

var _materialUi = require('material-ui');

var _materialUi2 = _interopRequireDefault(_materialUi);

var ThemeManager = new _materialUi2['default'].Styles.ThemeManager();
var AppBar = _materialUi2['default'].AppBar;
var RaisedButton = _materialUi2['default'].RaisedButton;
var List = _materialUi2['default'].List;
var ListItem = _materialUi2['default'].ListItem;
var ListDivider = _materialUi2['default'].ListDivider;
var Avatar = _materialUi2['default'].Avatar;
var ActionInfo = _materialUi2['default'].ActionInfo;
exports['default'] = _react2['default'].createClass({
  displayName: 'main',

  childContextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getInitialState: function getInitialState() {
    return {
      friends: []
    };
  },

  addNewFriend: function addNewFriend(friend) {
    var friends = this.state.friends;

    friends.push(friend);

    this.setState({
      friends: friends
    });
  },

  _sort: function _sort(field) {
    this.state.friends.sort(function (a, b) {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
  },

  _deleteFriend: function _deleteFriend(e) {
    var index = this.state.friends.indexOf(e.target.value),
        friends = this.state.friends;
    friends.splice(index, 1);

    console.log(index, friends, e.target);

    this.setState({
      friends: friends
    });
  },

  render: function render() {
    var _this = this;

    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(AppBar, { title: 'My Imagine Friends' }),
      _react2['default'].createElement(
        'div',
        { className: 'container' },
        _react2['default'].createElement(_formJs2['default'], { addNewFriend: this.addNewFriend })
      ),
      _react2['default'].createElement('div', { className: 'friend-sort' }),
      _react2['default'].createElement(
        'div',
        { className: 'friends-list' },
        _react2['default'].createElement(
          List,
          null,
          this.state.friends.map(function (friend, index) {
            return _react2['default'].createElement(
              'div',
              null,
              _react2['default'].createElement(ListItem, {
                leftAvatar: _react2['default'].createElement(Avatar, { src: 'images/friend.png' }),
                primaryText: friend.first_name + ' ' + friend.last_name + ', ' + friend.age,
                key: index,
                secondaryText: [_react2['default'].createElement(
                  'b',
                  null,
                  'Gender: '
                ), friend.gender, _react2['default'].createElement('br', null), _react2['default'].createElement(
                  'b',
                  null,
                  'Phone: '
                ), friend.phone, _react2['default'].createElement('br', null)],
                rightIconButton: _react2['default'].createElement(RaisedButton, { label: 'Close', onClick: _this._deleteFriend }),
                secondaryTextLines: 2 }),
              _react2['default'].createElement(ListDivider, { inset: true })
            );
          })
        )
      )
    );
  }
});
module.exports = exports['default'];

//# sourceMappingURL=main-compiled.js.map