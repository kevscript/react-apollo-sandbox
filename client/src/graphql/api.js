import { gql } from 'apollo-boost'

const GET_BOOKS = gql`
  query Books {
    books { id author title }
  }
`

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) { id author title }
  }
`

const REMOVE_BOOK = gql`
  mutation RemoveBook($id: String!) {
    removeBook(id: $id) { id author title }
  }
`

export {
  GET_BOOKS,
  ADD_BOOK,
  REMOVE_BOOK
}