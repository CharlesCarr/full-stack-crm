import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "./components/Header";
import Clients from "./components/Clients";
import Projects from "./components/Projects";
import AddClientModal from "./components/AddClientModal";

// for getting rid of warning in console
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="w-full h-screen flex flex-col justify-start items-center">
          <Header />
          <div className="w-full flex-col justify-center items-center mt-10">
            <AddClientModal />
            <Projects />
            <Clients />
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
