var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
var express = require('express');
var GraphQLSchema = graphql.GraphQLSchema;
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;
var GraphQLInt = graphql.GraphQLInt;

// fake data
humans = {
  1: {
    name: "billy",
    age: 23,
    id: 1
  },
  2: {
    name: "bob",
    age: 44,
    id: 2
  }
}

ferrets = {
  1: {
    name: "jnr ferret",
    habbitat: "inside"
  },
  2: {
    name: "snr ferret",
    habbitat: "outside"
  }
}

// fetch data
function getHuman(id) {
  return humans[id]
}

function getFerret(id) {
  return ferrets[id]
}

// three main types

// 1. types for building models
var ferretType = new GraphQLObjectType({
  name: "ferret",
  description: "an actual ferret",
  fields: {
    name: {
      type: GraphQLString,
      description: "The name"
    },
    habbitat: {
      type: GraphQLString,
      description: "the habbitat"
    }
  }
});

var humanType = new GraphQLObjectType({
    name: 'Human',
    description: "this is a human",
    fields: {
      name: {
        type: GraphQLString,
        description: "this is a name",
      },
      age: {
        type: GraphQLInt,
        description: "this is an age",
      },
      id: {
        type: GraphQLInt,
        description: "this is an id",
      }
    }
  });

// 2. types for building the query
var queryType = new GraphQLObjectType({
  name: 'test',
  description: "this is a query",
  fields: {
    human: {
      type: humanType,
      args: {
        id: {
          description: "get the human",
          type: GraphQLInt
        }
      },
      resolve: function(_, args){ return getHuman(args.id) }
    },
    ferret: {
      type: ferretType,
      args: {
        id: {
          description: "get the ferret",
          type: GraphQLInt
        }
      },
      resolve: function(_, args){ return getFerret(args.id) }
    }
  }
});

// 3. types for building the schema
var schema = new GraphQLSchema({
  query: queryType
});

var app = express();

app.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }));
app.listen(3000);

