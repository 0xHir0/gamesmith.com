/*
 * Date input component
 */
import React from 'react'
import ReactDOM from 'react-dom'
import DocReady from 'es6-docready'
import Dom from 'es6-dom'
import Picker from 'react-month-picker';
import 'react-month-picker/css/month-picker.css';

var MonthBox = React.createClass({
  propTypes: {
    value: React.PropTypes.string
    , onClick: React.PropTypes.func
  }
  , getInitialState() {
    return {
      value: this.props.value || 'N/A'
    }
  }
  , componentWillReceiveProps(nextProps){
    this.setState({
      value: nextProps.value || 'N/A'
    })
  }

  , render() {

    return (
      <div className="box" onClick={this._handleClick}>
        <label>{this.state.value}</label>
      </div>
    )
  }

  , _handleClick(e) {
    this.props.onClick && this.props.onClick(e)
  }
})



var MonthPicker = React.createClass({
  render: function () {
    let pickerLang = {
      months: ['Jan', 'Feb', 'Mar', 'Spr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      , from: 'From', to: 'To'
    }


      , mvalue = {year: 2015, month: 10}
      , mrange = {from: {year: 2014, month: 8}, to: {year: 2015, month: 5}}

    let makeText = m => {
      if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
      return '?'
    }
    return (
      <ul>
        <li>
          <label>From</label>
          <div className="edit">
            <Picker
              ref="pickAMonth"
              years={[2008, 2010, 2011, 2012, 2014, 2015, 2016, 2017]}
              value={mvalue}
              lang={pickerLang.months}
              onChange={this.handleAMonthChange}
              onDismiss={this.handleAMonthDissmis}
            >
              <MonthBox value={makeText(mvalue)} onClick={this.handleClickMonthBox}/>
            </Picker>
          </div>
        </li>
      </ul>
    )
  }
  , handleClickMonthBox(e) {
    this.refs.pickAMonth.show()
  }
});

export default MonthPicker;
