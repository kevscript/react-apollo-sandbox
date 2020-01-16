import React from 'react'
import styled from 'styled-components'

const Item = styled.li`
  list-style: none;
  width: 100%;
  padding: 10px 25px;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  display: flex;
  justify-content: space-between;
`

const Title = styled.span`
  font-weight: 600;
  margin-right: 10px;
`

const Author = styled.span`
  font-style: italic;
`

const DeleteButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  font-weight: 800;
  cursor: pointer;
  padding: 0 5px;
  transition: all 0.25s ease-in-out;

  :hover {
    color: red;
    transition: all 0.25s ease-in-out;
  }
`

const BookItem = ({ book, handleRemoveBook }) => {
  return (
    <Item>
      <div>
        <Title>{book.title}</Title>
        <Author> by {book.author}</Author>
      </div>
      <DeleteButton id={book.id} onClick={handleRemoveBook}>X</DeleteButton>
    </Item>
  )
}

export default BookItem