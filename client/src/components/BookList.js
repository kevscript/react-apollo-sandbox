import React from 'react'
import styled from 'styled-components'
import BookItem from './BookItem'

const BookList = ({ books, removeBook }) => {

  const handleRemoveBook = (e) => removeBook({ variables: { id: e.target.getAttribute("id") }})

  if (!books || books.length === 0) {
    return <p>No books in the list.</p>
  }

  return (
    <ul>
      { books.map(book => <BookItem book={book} key={book.id} handleRemoveBook={handleRemoveBook} /> )}
    </ul>
  )
}

export default BookList