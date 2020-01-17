import React from 'react';
import styled from 'styled-components'
import GlobalStyle from './styles/global'
import { useQuery } from '@apollo/react-hooks'
import { GET_BOOKS } from './graphql/api'
import BookForm from './components/BookForm'
import BookList from './components/BookList'

const AppContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`

const App = () => {

  const { loading, error, data } = useQuery(GET_BOOKS)

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error! {error.message}</h1>

  return (
    <AppContainer>
      <GlobalStyle />
      <BookForm />
      <BookList books={data.books} />
    </AppContainer>
  )
}

export default App;
