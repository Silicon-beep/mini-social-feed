import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

/**
 * Apollo Client Configuration for Ad Personalization Engine
 * 
 * To use this with a real GraphQL backend:
 * 1. Replace GRAPHQL_ENDPOINT with your actual GraphQL API URL
 * 2. Add authentication headers if needed
 * 3. Configure error handling and caching policies
 */

// Replace with your GraphQL endpoint
const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql';

// Create HTTP link
const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

// Optional: Add authentication middleware
const authMiddleware = new ApolloLink((operation, forward) => {
  // Get auth token from localStorage or context
  const token = localStorage.getItem('authToken');
  
  // Add the authorization header to the request
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    }
  });

  return forward(operation);
});

// Configure cache
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        personalizedAds: {
          // Cache personalized ads per user
          keyArgs: ['userId'],
          merge(_existing, incoming) {
            return incoming;
          },
        },
        adsByCategory: {
          // Cache ads by category
          keyArgs: ['category'],
          merge(_existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

// Create Apollo Client
export const apolloClient = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;
