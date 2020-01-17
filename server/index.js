const { ApolloServer, gql, UserInputError } = require('apollo-server');
let { books } = require('./data')

const PORT = process.env.PORT || 4001

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Book {
    id: ID,
    title: String
    author: String,
    completed: Boolean,
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
    removeBook(id: String!): Book
    toggleCompletion(id: String!): Book
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      const exists = books.find(b => b.title === title && b.author === author)

      if (exists) {
        throw new UserInputError(`${title} by ${author} already exists.`)
      } else {
        const newBook = { id: String(Date.now()), title, author, completed: false }
        books = [...books, newBook]
        return newBook
      }
    },
    removeBook: (_, { id }) => {
      const removedBook = books.find(b => b.id === id)
      books = books.filter(book => book.id !== id)
      return removedBook
    },
    toggleCompletion: (_, { id }) => {
      const index = books.findIndex(b => b.id === id)
      books[index] = {...books[index], completed: !books[index].completed}
      return books[index]
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(PORT, () => {
  console.log(`Server ready at port ${PORT}`);
})