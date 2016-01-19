var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
var express = require('express');
var GraphQLSchema = graphql.GraphQLSchema;
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  })
});

var app = express();

app.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }));
app.listen(3000);

