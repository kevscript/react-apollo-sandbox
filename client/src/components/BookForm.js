import React, { useState } from 'react'
import styled from 'styled-components'

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

const BookForm = ({ addBook }) => {
  const [form, setForm] = useState({
    title: '',
    author: ''
  })

  const handleForm = (e) => {
    const newForm = { ...form, [`${e.target.name}`]: e.target.value }
    setForm(newForm)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addBook({ variables: { title: form.title, author: form.author }})
    setForm({ title: '', author: ''})
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
      <Button>Add Book</Button>
    </InputForm>
  )
}

export default BookForm