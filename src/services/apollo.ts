import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://dropmail.me/api/graphql/desafiodrop23",
    fetchOptions: {
      mode: "no-cors"
    }
  }),
  headers: {
    Authorization: "Bearer desafiodrop23"
  },
  cache: new InMemoryCache(),
});
