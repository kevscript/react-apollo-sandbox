import React from 'react'
import BookItem from './BookItem'

const BookList = ({ books }) => {

  if (!books || books.length === 0) {
    return <p>No books in the list.</p>
  }

  return (
    <ul>
      { books.map(book => <BookItem book={book} key={book.id} /> )}
    </ul>
  )
}

export default BookList