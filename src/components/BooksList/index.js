import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.css'
import {connect} from 'react-redux'
import {booksSelector, createBooksSelector} from '../../selectors'
import {deleteBook, sortBooks, editBook, saveBook} from '../../actions'
import {Table, Column, AutoSizer, defaultTableRowRenderer} from 'react-virtualized'
import 'react-virtualized/styles.css'
import {reduxForm, Field} from 'redux-form'

import Row from './row'
import ValidationField from '../ValidationField'

class BooksList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  static defaultProps = {
    books: []
  }

  rowGetter = ({index}) => {
    return this.props.books[index]
  }

  handleRowClick = ({rowData}) => {
    // const { toggleSelection } = this.props
    // toggleSelection && toggleSelection(rowData.uid)
  }

  sort = ({sortBy, sortDirection}) => {
    this.props.sortBooks(sortBy)
  }

  cellRenderer = ({cellData, rowData, dataKey}) => {
    if (!rowData.editing) {
      return cellData == null ? '' : String(cellData)
    }

    return <Field
      name = {dataKey}
      placeholder = {dataKey}
      component = {'input'}
    />
    // return <input value = {cellData} type = 'text' onChange = {() => ({})}/>
  }

  editRenderer = ({cellData, rowData}) => {
    return <div>
      {/*<input value = {rowData.editing ? 'save' : 'edit'} type = 'button' onClick = {this.startEdit(rowData)}/>*/}
      <input value = {rowData.editing ? 'save' : 'edit'} type = 'submit'/>
      <input value = 'delete' type = 'button' onClick = {() => this.props.deleteBook(rowData.id)}/>
    </div>
  }

  rowRenderer = (props) => {
    console.log('new row')
    const NewRow = Row(props.rowData.id)
    return <NewRow {...props} onSubmit = {this.startEdit(props.rowData)}/>
  }

  startEdit = ({id, editing}) => (data) => {
    if (editing) {
      this.props.saveBook({...data, id})
    }
    else this.props.editBook(id, true)
  }

  render() {
    const {books} = this.props

    return <AutoSizer disableHeight className = {'auto-sizer-wrapper'}>
      {({width, height}) => <Table
        rowCount = {books.length}
        rowGetter = {this.rowGetter}
        rowHeight = {30}
        headerHeight = {40}
        overscanRowCount = {1}
        width = {width}
        height = {300}
        sort = {this.sort}
        onRowClick = {this.handleRowClick}
        rowRenderer = {this.rowRenderer}
      >
        <Column
          label = "id"
          dataKey = "id"
          width = {200}
          // flexGrow = {1}
          cellRenderer = {this.cellRenderer}

          // headerRenderer = {this.headerRenderer}
        />


        <Column
          label = "title"
          dataKey = "title"
          width = {200}
          // flexGrow = {1}
          cellRenderer = {this.cellRenderer}

          // headerRenderer = {this.headerRenderer}
        />

        <Column
          label = "pages"
          dataKey = "pages"
          width = {50}
          disableSort
          cellRenderer = {this.cellRenderer}

        />
        <Column
          label = "publisher"
          dataKey = "publisher"
          width = {100}
          disableSort
          cellRenderer = {this.cellRenderer}

        />
        <Column
          label = "year"
          dataKey = "year"
          width = {50}
          cellRenderer = {this.cellRenderer}

          // headerRenderer = {this.headerRenderer}
        />
        <Column
          label = "Release date"
          dataKey = "release"
          width = {100}
          disableSort
          cellRenderer = {this.cellRenderer}

        />
        <Column
          label = "ISBN"
          dataKey = "isbn"
          width = {150}
          disableSort
          cellRenderer = {this.cellRenderer}

        />

        <Column
          dataKey = "edit"
          width = {100}
          disableSort
          cellRenderer = {this.editRenderer}

        />
      </Table>}
    </AutoSizer>

  }
}

// const createMapStateToProps = () => {
//   const booksSelector = createBooksSelector()
//   return (state, ownProps) => {
//     return {
//       books: booksSelector(state, ownProps)
//     }
//   }
// }

export default connect((state, ownProps) => ({
  books: booksSelector(state, ownProps)
}), {deleteBook, sortBooks, editBook, saveBook})(BooksList)