import React from 'react';
import styled from 'styled-components'
import GlobalStyle from './styles/global'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_BOOKS, ADD_BOOK, REMOVE_BOOK } from './graphql/api'
import BookForm from './components/BookForm'
import BookList from './components/BookList'

const AppContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`

const App = () => {

  const { loading, error, data } = useQuery(GET_BOOKS)

  const [addBook] = useMutation(ADD_BOOK, {
    update(cache, { data: { addBook } }) {
      const { books } = cache.readQuery({ query: GET_BOOKS })
      cache.writeQuery({
        query: GET_BOOKS,
        data: { books: [...books, addBook] }
      })
    }
  })

  const [removeBook] = useMutation(REMOVE_BOOK, {
    update(cache, { data: { removeBook } }) {
      const { books } = cache.readQuery({ query: GET_BOOKS })
      cache.writeQuery({
        query: GET_BOOKS,
        data: { books: books.filter(b => b.id !== removeBook.id) }
      })
    }
  })

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error! {error.message}</h1>

  return (

    <AppContainer>
      <GlobalStyle />
      <BookForm addBook={addBook} />
      <BookList books={data.books} removeBook={removeBook} />
    </AppContainer>
  )
}

export default App;
