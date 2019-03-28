import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'
import './style.css'
import ValidationField from '../ValidationField'
import {isISBN, isInt} from 'validator'

const fields = ['id', 'title', 'pages', 'publisher', 'year', 'release', 'isbn', 'authorFirstName', 'authorLastName']

const validate = ({id, title, pages, publisher, year, release, isbn, date}) => {

  const errors = {}

  if (!id) errors.id = 'Id is required'

  if (!title) errors.title = 'Title is required'
  else if (title.length > 30) errors.title = 'Title must be less than 30 symbols'

  if (!pages) errors.pages = 'Pages number is required'
  else if (!isInt(pages)) errors.pages = 'Enter valid number'
  else if (!isInt(pages, {min: 0, max: 10000})) errors.pages = 'To many pages. Tear some pages from this book'

  if (publisher && publisher.length > 30) errors.publisher = 'Publisher must be less than 30 symbols'

  if (year && !isInt(year)) errors.year = 'Enter valid year'
  else if (year && !isInt(year, {min: 1800})) errors.year = 'This book is too old for that'

  if (isbn && !isISBN(isbn)) errors.isbn = 'isbn'

  return errors
}

// todo add babel
// @connect(null, {addBook, deleteBook})
class AddBookForm extends Component {

  renderField = (name) => {
    return <Field
      key = {name}
      name = {name}
      placeholder = {name}
      component = {ValidationField}
    />
  }

  render() {
    return (
      <div>
        <form className = 'add-book-form-container' onSubmit = {this.props.handleSubmit}>
          {fields.map(this.renderField)}

          <Field
            name = {'date'}
            label = {'date'}
            component = {props => <ValidationField dayPicker {...props}/>}
          />
          <button type = 'submit'>Add</button>
        </form>
      </div>
    )
  }

}

export default reduxForm({form: 'book', validate})(AddBookForm)