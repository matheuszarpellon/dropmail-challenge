import { ApolloProvider } from "@apollo/client/react";
import { Home } from "./pages/Home";
import { client } from "./services/apollo";

export function App() {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  )
}
