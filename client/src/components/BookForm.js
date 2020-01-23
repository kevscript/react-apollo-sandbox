import React from 'react'
import styled from 'styled-components'
import useBookForm from '../hooks/useBookForm'

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
  const { form, handleForm, handleSubmit } = useBookForm()

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