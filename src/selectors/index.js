import {createSelector} from 'reselect'

export const booksMapSelector = state => state.books.get('entities')
export const booksLoadingSelector = state => state.books.loading
export const filtersSelector = state => state.filters
export const idSelector = (_, props) => props.id

export const booksSelector = createSelector(booksMapSelector, books => books.valueSeq().toArray())
export const createBooksSelector = () => createSelector(booksMapSelector, books => books.valueSeq().toArray())

export const filtratedBooksSelector = createSelector(booksSelector, filtersSelector, (books, filters) => {
  const {selected, dateRange: {from, to}} = filters

  return books.filter(book => {
    const published = Date.parse(book.date)
    return (!selected.length || selected.includes(book.id)) &&
      (!from || !to || (published > from && published < to))
  })
})