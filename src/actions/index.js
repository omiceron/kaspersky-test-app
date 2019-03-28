export function addBook(payload) {
  return {
    type: 'add',
    generateId: true
  }
}

export function deleteBook(id) {
  return {
    type: 'delete',
    payload: {id}
  }
}

export function editBook(id, editing) {
  return {
    type: 'edit',
    payload: {id, editing}
  }
}

export function sortBooks(sortBy) {
  return {
    type: 'sort',
    payload: {sortBy}
  }
}

export function saveBook(payload) {
  return {
    type: 'save',
    payload
  }
}