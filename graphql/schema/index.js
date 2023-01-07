const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
      _id: ID!
      email: String!
      password: String!
      notes: [Note!]
    }
  
    type Note {
      _id: ID!
      title: String!
      content: String!
      user: User!
      createdAt: String!
      updatedAt: String!
    }

    input NoteInput{
      title: String!
      content: String!
    }

    input UserInput{
      email: String!
      password: String!
    }

    type RootQuery{
      note(id: ID!): Note!
      notes: [Note!]
    }

    type RootMutation{
      createUser(userInput: UserInput): User!
      createNote(noteInput: NoteInput!): Note!
      deleteNote(id: ID!): Note!
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `)