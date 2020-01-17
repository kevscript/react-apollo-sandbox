import React, { useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import { GET_BOOKS, ADD_BOOK } from '../graphql/api'

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 25px;
  border: 1px solid rgba(0,0,0,0.3);
  margin: 25px 0;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 15px 0;

  label {
    margin: 0 0 3px 5px;
    font-size: 12px;
  }

  input {
    padding: 5px;
    font-size: 15px;
  }
`

const Button = styled.button`
  width: 100px;
  padding: 5px 0;
  margin-top: 15px;
`

const ErrorMessage = styled.span`
  color: red;
`

const ErrorContainer = styled.div`
  margin: 20px 0 0 0;
`

const BookForm = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    error: ''
  })

  const [addBook] = useMutation(ADD_BOOK, {
    onError: (err) => setForm({ ...form, error: err.message }),
    onCompleted: () => setForm({ title: '', author: '', error: null }),
    update: (cache, { data: { addBook } }) => {
      const { books } = cache.readQuery({ query: GET_BOOKS })
      cache.writeQuery({
        query: GET_BOOKS,
        data: { books: [...books, addBook] }
      })
    },
  })

  const handleForm = (e) => {
    const newForm = { ...form, [`${e.target.name}`]: e.target.value }
    setForm(newForm)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addBook({ variables: { title: form.title, author: form.author } })
  }

  return (
    <InputForm onSubmit={handleSubmit}>
      <InputContainer>
        <label htmlFor="title">Title : </label>
        <input type="text" name="title" onChange={handleForm} value={form.title} />
      </InputContainer>
      <InputContainer>
        <label htmlFor="author">Author : </label>
        <input type="text" name="author" onChange={handleForm} value={form.author} />
      </InputContainer>
      <div>
        <Button>Add Book</Button>
      </div>
      <ErrorContainer>
        {form.error ? <ErrorMessage>{form.error}</ErrorMessage> : null}
      </ErrorContainer>
    </InputForm>
  )
}

export default BookForm