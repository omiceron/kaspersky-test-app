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

const ReducerRecord = Record({
  entities: arrToMap([], AuthorRecord),
  loading: false,
  loaded: false,
  error: null
})

export default (authors = new ReducerRecord(), action) => {
  const {type, payload} = action

  switch (type) {
    case 'delete':
      return authors.deleteIn(['entities', payload.id])

    case 'add':
      return authors.setIn(['entities', payload.id], payload)

    default:
      return authors
  }
}