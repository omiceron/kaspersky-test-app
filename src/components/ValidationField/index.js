import React, {Component} from 'react'
import './style.css'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

class ValidationField extends Component {

  render() {
    const {
      dayPicker,
      input,
      type,
      meta: {error, touched},
      ...rest
    } = this.props

    const errorMessage = touched &&
      error && <p className = {'validation-field-message'}>{error}</p>

    if (dayPicker) return <div className = {'validation-field-container'}>
      <DayPickerInput
        inputProps = {{...input}}
      />
     </div>

    return <div className = {'validation-field-container'}>
      <input {...rest} {...input} type = {type}/>
      {errorMessage}
    </div>
  }
}

export default ValidationField
