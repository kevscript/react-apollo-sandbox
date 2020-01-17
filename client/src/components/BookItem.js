import React from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import { GET_BOOKS, REMOVE_BOOK, TOGGLE_COMPLETION } from '../graphql/api'

const Item = styled.li`
  list-style: none;
  width: 100%;
  padding: 10px 25px;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.span`
  font-weight: ${ props => props.completed ? 400 : 600 };
  font-style: ${ props => props.completed ? 'italic' : 'normal' };
  text-decoration: ${ props => props.completed ? 'line-through' : 'none' };
  text-decoration-color: inherit;
  margin-right: 10px;
  cursor: pointer;
  color: ${ props => props.completed ? '#aaa' : 'inherit' };
`

const Author = styled.span`
  font-style: italic;
`

const Status = styled.span`
  background: greenyellow;
  padding: 3px 8px;
  font-size: 12px;
`

const DeleteButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 50%;
  font-weight: 800;
  font-size: 12px;
  cursor: pointer;
  width: 25px;
  height: 25px;
  color: rgba(0,0,0,0.2);
  transition: all 0.2s ease-in-out;
  margin-left: 10px;

  :hover {
    border: 1px solid red;
    background: red;
    color: white;
    transition: all 0.2s ease-in-out;
  }
`

const BookItem = ({ book }) => {

  const [removeBook] = useMutation(REMOVE_BOOK, {
    update: (cache, { data: { removeBook } }) => {
      const { books } = cache.readQuery({ query: GET_BOOKS })
      cache.writeQuery({
        query: GET_BOOKS,
        data: { books: books.filter(b => b.id !== removeBook.id) }
      })
    }
  })

  const [toggleCompletion] = useMutation(TOGGLE_COMPLETION)

  const handleRemoveBook = (e) => removeBook({ variables: { id: e.currentTarget.getAttribute("id") }})
  const handleCompletion = (e) => toggleCompletion({ variables: { id: e.currentTarget.getAttribute("id") }})

  return (
    <Item>
      <div>
        <Title id={book.id} onClick={handleCompletion} completed={book.completed}>{book.title}</Title>
        <Author> by {book.author}</Author>
      </div>
      <div>
        {book.completed ? <Status>DONE</Status> : null}
        <DeleteButton id={book.id} onClick={handleRemoveBook}>X</DeleteButton>
      </div>
    </Item>
  )
}

export default BookItem