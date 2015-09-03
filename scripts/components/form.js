/**
 * Created by andreypristupa on 8/28/15.
 */

import React, { PropTypes } from 'react'
import mui from 'material-ui'

let ThemeManager = new mui.Styles.ThemeManager()
let { TextField, Paper, Card, CardHeader, CardText, CardActions, Avatar, RaisedButton, FlatButton } = mui


const minStrLength = 3,
      maxStrLength = 100

const restrictedFields = ['errors', 'is_valid']

const state = {
  first_name: 'asd',
  last_name:  'asd',
  phone:      12345678888,
  gender:     'man',
  age:        22,
  is_valid:   false,
  errors:     []
}

const validationRules = {
  phone: (phone)  => /^[\s()+-]*([0-9][\s()+-]*){10,20}$/.test(phone),
  age: (age)      => age >= 3 && age <= 100,
  string: (length)=> length >= minStrLength && length <= maxStrLength
}

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
    return state
  },

  _handleChangeInput(e) {
    let input = e.target,
        errors = this.state.errors

    errors[input.id] = ""

    if (validationRules[input.id]) {
      !validationRules[input.id](input.value) ?
        errors[input.id] = "Your friend give's you wrong info, please check it. " : ''
    } else {
      !validationRules.string(input.value.length) ?
        errors[input.id] = "Incorrect length of field, min: " + minStrLength + ", max: " + maxStrLength : ''
    }

    this.setState({
      errors: errors,
      [input.id]: input.value
    }, () => this._validateForm())
  },

  _validateForm() {
    let formData = this._getFormData(),
        is_valid = true

    for (var key in formData) {
      if((!formData[key] && formData[key].length == 0) || (this.state.errors[key] && this.state.errors[key].length)) {
        is_valid = false
      }
    }

    this.setState({
      is_valid: is_valid
    })
  },

  _getFormData() {
    let data = []

    Object.keys(this.state).map(name => {
      restrictedFields.indexOf(name) == -1 ?
        data[name] = this.refs[name].getValue() : ''
    })

    return data
  },

  _capitalizeFieldName(name) {
    return (name.charAt(0).toUpperCase() + name.slice(1)).replace("_", " ")
  },

  _handleSubmit() {
    this.props.addNewFriend(this._getFormData())
    this.setState(this.getInitialState())
  },

  render() {
    return (
      <Card initiallyExpanded={false}>
        <CardHeader
          title="Add new friend"
          subtitle="...Image Friend"
          avatar={<Avatar style={{color:'red'}}>A</Avatar>}
          showExpandableButton={true}>
        </CardHeader>
        <CardText expandable={true}>
          <form name="form" id="form">
            {Object.keys(this.state).map(name => {
                if(restrictedFields.indexOf(name) == -1) {
                  return <div className="input-control">
                    <TextField hintText={this._capitalizeFieldName(name)}
                               errorText={this.state.errors[name]}
                               id={name}
                               key={name}
                               ref={name}
                               value={this.state[name]}
                               onChange={this._handleChangeInput}  />
                  </div>
                }
            }
            )}
            <CardActions expandable={true}>
              <RaisedButton disabled={!this.state.is_valid} onClick={this._handleSubmit} primary={true} label="Add new Friend"/>
            </CardActions>
          </form>
        </CardText>
      </Card>
    )
  }
})
