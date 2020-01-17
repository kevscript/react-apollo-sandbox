import { gql } from 'apollo-boost'

const GET_BOOKS = gql`
  query Books {
    books { id author title completed }
  }
`

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) { id author title completed }
  }
`

const REMOVE_BOOK = gql`
  mutation RemoveBook($id: String!) {
    removeBook(id: $id) { id author title completed }
  }
`

const TOGGLE_COMPLETION = gql`
  mutation ToggleCompletion($id: String!) {
    toggleCompletion(id: $id) { id author title completed }
  }
`

export {
  GET_BOOKS,
  ADD_BOOK,
  REMOVE_BOOK,
  TOGGLE_COMPLETION
}