const { ApolloServer, gql } = require('apollo-server');
let { books } = require('./data')

const PORT = process.env.PORT || 4001

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Book {
    id: ID,
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
    removeBook(id: String!): Book
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
      const newBook = { id: String(Date.now()), title, author }
      books = [...books, newBook]
      return newBook
    },
    removeBook: (_, { id }) => {
      const removedBook = books.find(b => b.id === id)
      books = books.filter(book => book.id !== id)
      return removedBook
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(PORT, () => {
  console.log(`Server ready at port ${PORT}`);
})