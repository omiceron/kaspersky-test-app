import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.css'
import {defaultTableRowRenderer} from 'react-virtualized'
import 'react-virtualized/styles.css'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {compose} from 'redux'

class Row extends Component {

  render() {
    const {style, handleSubmit, pristine, reset, submitting, ...props} = this.props
    return <form key = {props.key} style = {style} onSubmit = {handleSubmit}>
      {defaultTableRowRenderer(props)}
    </form>
  }

}

export default compose(
  connect((state, props) => ({form: props.rowData.id})),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))
(Row)