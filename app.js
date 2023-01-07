const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());


app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.6iecysl.mongodb.net/notes-api-graphql?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(3000);
    console.log("Mongo DB Connected");
  })
  .catch(err => {
    console.log(err);
  });