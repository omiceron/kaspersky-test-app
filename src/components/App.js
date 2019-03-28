import React, {Component} from 'react'
import ControlRow from './ControlRow'
import AddBookForm from './AddBookForm'
import BooksList from './BooksList'
import './style.css'

class App extends Component {

  render() {
    return (
      <div className = {'app-container'}>
        <BooksList/>
        <ControlRow/>
      </div>
    )
  }
}

export default App
