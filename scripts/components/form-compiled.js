/**
 * Created by andreypristupa on 8/28/15.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _materialUi2 = _interopRequireDefault(_materialUi);

var ThemeManager = new _materialUi2['default'].Styles.ThemeManager();
var TextField = _materialUi2['default'].TextField;
var Paper = _materialUi2['default'].Paper;
var Card = _materialUi2['default'].Card;
var CardHeader = _materialUi2['default'].CardHeader;
var CardText = _materialUi2['default'].CardText;
var CardActions = _materialUi2['default'].CardActions;
var Avatar = _materialUi2['default'].Avatar;
var RaisedButton = _materialUi2['default'].RaisedButton;
var FlatButton = _materialUi2['default'].FlatButton;

var minStrLength = 3,
    maxStrLength = 100;

var restrictedFields = ['errors', 'is_valid'];

var state = {
  first_name: 'asd',
  last_name: 'asd',
  phone: 12345678888,
  gender: 'man',
  age: 22,
  is_valid: false,
  errors: []
};

var validationRules = {
  phone: function phone(_phone) {
    return (/^[\s()+-]*([0-9][\s()+-]*){10,20}$/.test(_phone)
    );
  },
  age: function age(_age) {
    return _age >= 3 && _age <= 100;
  },
  string: function string(length) {
    return length >= minStrLength && length <= maxStrLength;
  }
};

exports['default'] = _react2['default'].createClass({
  displayName: 'form',

  childContextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getInitialState: function getInitialState() {
    return state;
  },

  _handleChangeInput: function _handleChangeInput(e) {
    var _this = this;

    var input = e.target,
        errors = this.state.errors;

    errors[input.id] = "";

    if (validationRules[input.id]) {
      !validationRules[input.id](input.value) ? errors[input.id] = "Your friend give's you wrong info, please check it. " : '';
    } else {
      !validationRules.string(input.value.length) ? errors[input.id] = "Incorrect length of field, min: " + minStrLength + ", max: " + maxStrLength : '';
    }

    this.setState(_defineProperty({
      errors: errors
    }, input.id, input.value), function () {
      return _this._validateForm();
    });
  },

  _validateForm: function _validateForm() {
    var formData = this._getFormData(),
        is_valid = true;

    for (var key in formData) {
      if (!formData[key] && formData[key].length == 0 || this.state.errors[key] && this.state.errors[key].length) {
        is_valid = false;
      }
    }

    this.setState({
      is_valid: is_valid
    });
  },

  _getFormData: function _getFormData() {
    var _this2 = this;

    var data = [];

    Object.keys(this.state).map(function (name) {
      restrictedFields.indexOf(name) == -1 ? data[name] = _this2.refs[name].getValue() : '';
    });

    return data;
  },

  _capitalizeFieldName: function _capitalizeFieldName(name) {
    return (name.charAt(0).toUpperCase() + name.slice(1)).replace("_", " ");
  },

  _handleSubmit: function _handleSubmit() {
    this.props.addNewFriend(this._getFormData());
    this.setState(this.getInitialState());
  },

  render: function render() {
    var _this3 = this;

    return _react2['default'].createElement(
      Card,
      { initiallyExpanded: false },
      _react2['default'].createElement(CardHeader, {
        title: 'Add new friend',
        subtitle: '...Image Friend',
        avatar: _react2['default'].createElement(
          Avatar,
          { style: { color: 'red' } },
          'A'
        ),
        showExpandableButton: true }),
      _react2['default'].createElement(
        CardText,
        { expandable: true },
        _react2['default'].createElement(
          'form',
          { name: 'form', id: 'form' },
          Object.keys(this.state).map(function (name) {
            if (restrictedFields.indexOf(name) == -1) {
              return _react2['default'].createElement(
                'div',
                { className: 'input-control' },
                _react2['default'].createElement(TextField, { hintText: _this3._capitalizeFieldName(name),
                  errorText: _this3.state.errors[name],
                  id: name,
                  key: name,
                  ref: name,
                  value: _this3.state[name],
                  onChange: _this3._handleChangeInput })
              );
            }
          }),
          _react2['default'].createElement(
            CardActions,
            { expandable: true },
            _react2['default'].createElement(RaisedButton, { disabled: !this.state.is_valid, onClick: this._handleSubmit, primary: true, label: 'Add new Friend' })
          )
        )
      )
    );
  }
});
module.exports = exports['default'];

//# sourceMappingURL=form-compiled.js.map