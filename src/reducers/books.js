import {Record, OrderedMap} from 'immutable'
import {ADD, BOOKS, DELETE, EDIT, SAVE, SORT} from '../constants'

function arrToMap(arr, ModelRecord) {
  return arr.reduce(
    (acc, item) => acc.set(item.id, ModelRecord ? new ModelRecord(item) : item),
    new OrderedMap({})
  )
}

const AuthorRecord = Record({
  firstName: null,
  lastName: null
})

const BookRecord = Record({
  id: null,
  editing: false,
  title: null,
  pages: null,
  publisher: null,
  year: null,
  release: null,
  isbn: null,
  authors: arrToMap([], AuthorRecord)
})

const ReducerRecord = Record({
  entities: arrToMap([], BookRecord),
  loading: false,
  loaded: false,
  error: null
})

export default (books = new ReducerRecord(), action) => {
  const {type, payload, randomId} = action

  switch (type) {
    case BOOKS + DELETE:
      return books.deleteIn(['entities', payload.id])

    case BOOKS + ADD:
      return books.setIn(['entities', randomId], new BookRecord({editing: true, id: randomId}))

    case BOOKS + EDIT:
      return books.setIn(['entities', payload.id, 'editing'], true)

    case BOOKS + SORT:
      const sorted = books.get('entities').sortBy(book => book[payload.sortBy])
      return books.setIn(['entities'], sorted)

    case BOOKS + SAVE:
      return books.mergeIn(['entities', payload.id], new BookRecord({...payload, editing: false}))

    default:
      return books
  }
}