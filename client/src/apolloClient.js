import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/graphql"
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

export const client = new ApolloClient({
  cache: cache,
  link: authLink.concat(link)
});

const isLoggedIn = localStorage.getItem("token") != null ? true : false;

client.writeData({ data: { isLoggedIn: isLoggedIn } });