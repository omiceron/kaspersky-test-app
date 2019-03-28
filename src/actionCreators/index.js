import {ADD, BOOKS, DELETE, EDIT, SAVE, SORT} from '../constants'

export function addBook() {
  return {
    type: BOOKS + ADD,
    generateId: true
  }
}

export function deleteBook(id) {
  return {
    type: BOOKS + DELETE,
    payload: {id}
  }
}

export function editBook(id) {
  return {
    type: BOOKS + EDIT,
    payload: {id}
  }
}

export function sortBooks(sortBy) {
  return {
    type: BOOKS + SORT,
    payload: {sortBy}
  }
}

export function saveBook(payload) {
  return {
    type: BOOKS + SAVE,
    payload
  }
}