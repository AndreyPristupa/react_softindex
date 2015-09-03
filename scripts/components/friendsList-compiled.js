/**
 * Created by andreypristupa on 8/28/15.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _materialUi2 = _interopRequireDefault(_materialUi);

var ThemeManager = new _materialUi2['default'].Styles.ThemeManager();
var RaiseButton = _materialUi2['default'].RaiseButton;
var List = _materialUi2['default'].List;
var ListItem = _materialUi2['default'].ListItem;
var ListDivider = _materialUi2['default'].ListDivider;
var Avatar = _materialUi2['default'].Avatar;
exports['default'] = _react2['default'].createClass({
  displayName: 'friendsList',

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

  componentWillReceiveProps: function componentWillReceiveProps(friends) {
    var friend = friends.friend;

    this.setState({
      friends: friends
    });
  },

  render: function render() {
    console.log(this.state.friends);
    return _react2['default'].createElement('div', null);
  }
});
module.exports = exports['default'];

//# sourceMappingURL=friendsList-compiled.js.map