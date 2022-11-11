import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import AccountsPage from "./pages/AccountsPage";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import AccountPage from "./pages/AccountPage";
import ProspectPage from "./pages/ProspectPage";
import ProspectsPage from "./pages/ProspectsPage";
import InteractionsPage from "./pages/InteractionsPage";
import Navigation from "./components/Navigation";

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
        <div className="w-full h-screen flex">
          <Navigation />
          <div className="w-5/6 h-screen flex flex-col justify-center items-center">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/accounts" element={<AccountsPage />} />
              <Route path="/accounts/:id" element={<AccountPage />} />
              <Route path="/prospects" element={<ProspectsPage />} />
              <Route path='/prospects/:id' element={<ProspectPage />} />
              <Route path="/interactions" element={<InteractionsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
