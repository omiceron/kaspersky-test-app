import {Record, OrderedMap} from 'immutable'

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
    case 'delete':
      return books.deleteIn(['entities', payload.id])

    case 'add':
      return books.setIn(['entities', randomId], new BookRecord({editing: true, id: randomId}))

    case 'edit':
      return books.setIn(['entities', payload.id, 'editing'], payload.editing)

    case 'sort':
      const unsorted = books.get('entities')
      const sorted = unsorted.sortBy(book => book[payload.sortBy])
      return books.setIn(['entities'], sorted)

    case 'save':
      return books.mergeIn(['entities', payload.id], new BookRecord({...payload, editing: false}))

    default:
      return books
  }
}