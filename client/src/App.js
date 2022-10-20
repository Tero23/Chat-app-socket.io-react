import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import NotFound from "./NotFound";
import Header from "./Header";
import Register from "./Register";
import ChatPage from "./ChatPage";

const client = new ApolloClient({
  uri: "http://localhost:3002/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Register />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
