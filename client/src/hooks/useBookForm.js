import { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { GET_BOOKS, ADD_BOOK } from '../graphql/api'

const useBookForm = () => {

  const [form, setForm] = useState({
    title: '',
    author: '',
    error: null
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
    }
  })

  
  const handleForm = (e) => {
    const newForm = { ...form, [`${e.target.name}`]: e.target.value }
    setForm(newForm)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addBook({ variables: { title: form.title, author: form.author } })
  }

  return { form, handleForm, handleSubmit }
}


export default useBookForm