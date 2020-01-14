import React, { useState } from 'react';
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/react-hooks'
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  border: 1px solid black;
  padding: 25px;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 10px 0;

  input {
    padding: 5px 0;
  }
`

const Button = styled.button`
  width: 100px;
  padding: 5px 0;
`

const App = () => {
  const [form, setForm] = useState({
    title: '',
    author: ''
  })

  const { loading, error, data } = useQuery(GET_BOOKS, {
    onCompleted: (data) => console.log('GET_BOOKS query result', data)
  })

  const [addBook] = useMutation(ADD_BOOK, {
    variables: { title: form.title, author: form.author },
    update(cache, { data: { addBook } }) {
      console.log('ADD_BOOK update cache data:', addBook)
      const { books } = cache.readQuery({ query: GET_BOOKS })
      cache.writeQuery({
        query: GET_BOOKS,
        data: { books: [...books, addBook] }
      })
    }
  })

  const [removeBook] = useMutation(REMOVE_BOOK, {
    update(cache, { data: { removeBook } }) {
      console.log('REMOVE_BOOK update cache data:', removeBook)
      const { books } = cache.readQuery({ query: GET_BOOKS })
      cache.writeQuery({
        query: GET_BOOKS,
        data: { books: books.filter(b => b.id !== removeBook.id) }
      })
    }
  })

  const handleForm = (e) => {
    const newForm = { ...form, [`${e.target.name}`]: e.target.value }
    setForm(newForm)
  }

  const handleAddBook = (e) => {
    e.preventDefault()
    addBook()
    setForm({ title: '', author: ''})
  }

  const handleRemoveBook = (e) => {
    removeBook({ variables: { id: e.target.getAttribute("id") }})
  }

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error! {error.message}</h1>

  return (
    <div>
      <Form onSubmit={handleAddBook}>
        <InputContainer>
          <label htmlFor="title">Title : </label>
          <input type="text" name="title" onChange={handleForm} value={form.title} />
        </InputContainer>
        <InputContainer>
          <label htmlFor="author">Author : </label>
          <input type="text" name="author" onChange={handleForm} value={form.author} />
        </InputContainer>
        <Button>Add Book</Button>
      </Form>

      <ul>
        {data.books.map(b => 
          <li key={b.id}>
            {b.title} by {b.author}
            <button id={b.id} onClick={handleRemoveBook}>X</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App;
