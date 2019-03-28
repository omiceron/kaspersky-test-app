import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addBook} from '../../actionCreators'
import './style.css'

// todo add babel
// @connect(null, {addBook, deleteBook})
class ControlRow extends Component {

  state = {
    loading: false,
    data: null
  }

  handleFileChange = (event) => {
    const {target} = event
    const {files} = target

    if (files && files[0]) {
      const reader = new FileReader()

      reader.onloadstart = () => this.setState({loading: true})

      reader.onload = event => {
        this.setState({
          data: event.target.result,
          loading: false
        })
      }

      reader.readAsDataURL(files[0])
    }
  }

  handleClearClick = (e) => {
    this.ref.value = null

    this.setState({
      data: null,
      loading: false
    })
  }

  handlePreviewClick = () => {
    const {data, fullScreen} = this.state

    if (!data) {
      return
    }

    this.setState({fullScreen: !fullScreen})
  }

  setRef = (ref) => {
    this.ref = ref
  }

  render() {
    const {data, loading} = this.state
    const backgroundImage = data ? {backgroundImage: `url(${data})`} : null

    return (
      <div>
        <input type = 'button' value = 'New book' onClick = {this.props.addBook}/>
        {/*
                <input
                  ref = {this.setRef}
                  id = "image"
                  type = "file"
                  accept = "image/*"
                  // capture = "camera"
                  onChange = {this.handleFileChange}
                />

                <div
                  // className = {previewClasses}
                  className = {'preview'}
                  style = {backgroundImage}
                  onClick = {this.handlePreviewClick}
                >
                  {!data && !loading &&
                  <label htmlFor = "image">
                    Click to capture
                  </label>
                  }

                  {loading &&
                  <span>Loading...</span>
                  }
                </div>

                <button type = 'button' onClick = {this.handleClearClick}>
                  Clear Image
                </button>
        */}
      </div>
    )
  }

}

export default connect(null, {addBook})(ControlRow)